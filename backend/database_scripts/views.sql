
create view vw_aulas_demonstrativas_marcadas as
	select 
	id_aula_demostrativa,
	date_format( data_aula,'%d-%m-%Y') as data_aula,
	email_aluno, matriculado,
	nome_aluno,
	status,
	horario 
from tb_aula_demostrativa
where status = 'Em andamento' ;

-- view para visualização de emprestimos  de ativos   

create view vw_emprestimos_ativos as
select a.nome_aluno,
	   a.email_aluno,
	   date_format(data_emp, '%d-%m-%Y') as data_emp,
	   data_dev,
       l.nome_livro,
       l.autor,
       l.numero_livro,
       l.nicho
 from tb_emprestimos e
 inner join tb_acervo_livros l on l.id_livro = e.id_livro
 inner join tb_aluno a on a.id_aluno = e.id_aluno
 where status_devolucao = 'Em andamento';

select * from vw_emprestimos_ativos;

-- view para visualização de historicos de devoluções   
create view vw_emprestimos_finalizados as
select a.nome_aluno,
	   a.email_aluno,
	   date_format(e.data_emp, '%d-%m-%Y') as data_emp,
	   date_format(e.data_dev, '%d-%m-%Y') as data_dev,
       l.nome_livro,
       l.autor,
       l.numero_livro,
       l.nicho
 from tb_emprestimos e
 inner join tb_acervo_livros l on l.id_livro = e.id_livro
 inner join tb_aluno a on a.id_aluno = e.id_aluno
 where status_devolucao ='Devolvido';
 
-- parte de analises de alunos e turmas

-- 1. Ranking de Turmas por Frequência Média
create view vw_ranking_maior_frec_turma as
SELECT 
    t.nome_turma,
    t.dia_aula,
    COUNT(DISTINCT p.id_aluno) as total_alunos,
    ROUND(AVG(p.presente) * 100, 2) as frequencia_media_percent,
    COUNT(p.id_presenca) as total_registros
FROM tb_turmas t
JOIN tb_aula a ON t.id_turma = a.id_turma
JOIN tb_presenca p ON a.id_aula = p.id_aula
WHERE a.aula_concluida = 1
GROUP BY t.id_turma
ORDER BY frequencia_media_percent DESC;


--  2 Progresso Temporal por Turma
create view vw_prog_temporal_turma as
SELECT 
    t.nome_turma,
    YEAR(a.data_aula) as ano,
    MONTH(a.data_aula) as mes,
    COUNT(DISTINCT a.id_aula) as aulas_realizadas,
    ROUND(AVG(p.presente) * 100, 2) as frequencia_mensal,
    COUNT(DISTINCT p.id_aluno) as alunos_ativos
FROM tb_turmas t
JOIN tb_aula a ON t.id_turma = a.id_turma
JOIN tb_presenca p ON a.id_aula = p.id_aula
WHERE a.aula_concluida = 1
GROUP BY t.id_turma, YEAR(a.data_aula), MONTH(a.data_aula)
ORDER BY t.nome_turma, ano, mes;

-- 3. Taxa de Retenção por Período
create view vw_taxa_retencao_periodo as
SELECT 
    YEAR(data_matricula) as ano_entrada,
    MONTH(data_matricula) as mes_entrada,
    COUNT(*) as alunos_matriculados,
    SUM(CASE WHEN ativo = 1 THEN 1 ELSE 0 END) as alunos_ativos,
    ROUND((SUM(CASE WHEN ativo = 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as taxa_retencao
FROM tb_aluno
GROUP BY YEAR(data_matricula), MONTH(data_matricula)
ORDER BY ano_entrada DESC, mes_entrada DESC;


-- 4  TURMAS QUE PRECISAM DE ATENÇÃO
create view vw_turmas_precisam_atencao as
SELECT 
    t.nome_turma,
    t.dia_aula,
    t.horario_aula,
    COUNT(DISTINCT h.id_aluno) as alunos_na_turma,
    ROUND(AVG(p.presente) * 100, 1) as frequencia,
    SUM(CASE WHEN p.presente = 0 THEN 1 ELSE 0 END) as total_faltas,
    ROUND((SUM(CASE WHEN p.presente = 0 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1) as percentual_faltas
FROM tb_turmas t
JOIN tb_historico_aluno h ON t.id_turma = h.id_turma
JOIN tb_presenca p ON h.id_aluno = p.id_aluno
WHERE h.data_saida = '9999-01-01'
GROUP BY t.id_turma
HAVING frequencia < 75  -- Turmas com menos de 75% de frequência
ORDER BY frequencia ASC;

-- select * from vw_turmas_precisam_atencao

-- 5. previsão de evasão baseada em comportamento de presença.
create view vw_prev_evacao as
 SELECT 
    al.nome_aluno,
    t.nome_turma,
    t.dia_aula,
    al.nivel,
    COUNT(p.id_presenca) as total_aulas,
    SUM(p.presente) as presencas,
    ROUND((SUM(p.presente) / COUNT(p.id_presenca)) * 100, 1) as frequencia_geral,
    
    -- Frequência recente (últimos 3 meses)
    ROUND((SUM(CASE WHEN a.data_aula >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) 
               THEN p.presente ELSE 0 END) / 
           GREATEST(COUNT(CASE WHEN a.data_aula >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) 
                      THEN 1 END), 1)) * 100, 1) as frequencia_recente,
    
    -- Status
    CASE 
        WHEN ROUND((SUM(p.presente) / COUNT(p.id_presenca)) * 100, 1) < 50 THEN 'CRÍTICO'
        WHEN ROUND((SUM(p.presente) / COUNT(p.id_presenca)) * 100, 1) < 65 THEN 'BAIXA '
        WHEN ROUND((SUM(p.presente) / COUNT(p.id_presenca)) * 100, 1) < 75 THEN 'REGULAR '
        ELSE 'BOA '
    END as status_frequencia
    
FROM tb_aluno al
JOIN tb_historico_aluno h ON al.id_aluno = h.id_aluno
JOIN tb_turmas t ON h.id_turma = t.id_turma
JOIN tb_presenca p ON al.id_aluno = p.id_aluno
JOIN tb_aula a ON p.id_aula = a.id_aula
WHERE al.ativo = 1
AND h.data_saida = '9999-01-01'
GROUP BY al.id_aluno, al.nome_aluno, t.nome_turma, t.dia_aula, al.nivel
HAVING total_aulas >= 5  -- Pelo menos 5 aulas para ter uma amostra válida
ORDER BY frequencia_geral ASC;
 

-- 6 LINHA DO TEMPO COMPLETA DE SAÍDAS  
CREATE VIEW vw_linha_tem_saidas as
SELECT 
    YEAR(h.data_saida) as ano_saida,
    MONTH(h.data_saida) as mes_saida,
    DATE_FORMAT(h.data_saida, '%Y-%m') as periodo,
    COUNT(DISTINCT h.id_aluno) as total_saidas,
    
    -- Por turma
    GROUP_CONCAT(DISTINCT t.nome_turma SEPARATOR ', ') as turmas,
    
    -- Por motivo (simulado por tempo de permanência)
    SUM(CASE WHEN TIMESTAMPDIFF(MONTH, a.data_matricula, h.data_saida) <= 3 THEN 1 ELSE 0 END) as saidas_ate_3_meses,
    SUM(CASE WHEN TIMESTAMPDIFF(MONTH, a.data_matricula, h.data_saida) BETWEEN 4 AND 6 THEN 1 ELSE 0 END) as saidas_4_a_6_meses,
    SUM(CASE WHEN TIMESTAMPDIFF(MONTH, a.data_matricula, h.data_saida) > 6 THEN 1 ELSE 0 END) as saidas_acima_6_meses,
    
    -- Últimos alunos que saíram
    GROUP_CONCAT(DISTINCT a.nome_aluno SEPARATOR '; ') as alunos_saida

FROM tb_historico_aluno h
JOIN tb_aluno a ON h.id_aluno = a.id_aluno
JOIN tb_turmas t ON h.id_turma = t.id_turma
WHERE h.data_saida != '9999-01-01'  -- Apenas alunos que já saíram
GROUP BY YEAR(h.data_saida), MONTH(h.data_saida), DATE_FORMAT(h.data_saida, '%Y-%m')
ORDER BY ano_saida DESC, mes_saida DESC;

-- view para visualizar a amedia global de presenca
create view vw_media_global_presenca as
 SELECT 
    ROUND(
        AVG(p.presente) * 100, 
        2
    ) as frequencia_media_percentual
FROM tb_presenca p;

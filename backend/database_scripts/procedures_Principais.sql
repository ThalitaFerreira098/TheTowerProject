DELIMITER //
create PROCEDURE sp_criar_turma(
	in p_nome_turma varchar(45),
    in p_dia_aula ENUM('Segunda-Feira', 'Terça-feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'),
    in p_horario_aula time,
    in p_hora_fim time)
BEGIN
	 declare exit handler for sqlexception
		begin
			rollback;
			select 0 as resultado;
		end; 
    
      if exists (
					select 1 from tb_turmas
					where dia_aula = p_dia_aula AND 
					horario_aula = p_horario_aula AND
					hora_fim = p_hora_fim AND 
					ativa = true
                ) 
                OR
                (
				   select 1 from tb_turmas
				   where ativa = true AND 
				   dia_aula = p_dia_aula AND 
				   (
                   p_horario_aula between horario_aula and hora_fim
                   or p_hora_fim between horario_aula And hora_fim
                   or horario_aula between p_horario_aula and p_hora_fim
                   )
				) 
                THEN
                select 2 as resultado; -- no front explicar ao usuario que há existencia de conflito de horarios
 		ELSE
			start transaction;
			
			insert into tb_turmas(
					nome_turma,
					dia_aula,
					horario_aula,
					hora_fim,
                    ativa
				)
                values
                (
					p_nome_turma ,
					p_dia_aula,
					p_horario_aula  ,
					p_hora_fim,
                    true
                );
                commit;
                select 1 as resultado;
         end if;       
END//
DELIMITER ;
-- procedure para calcualr frequencia de aluno

DELIMITER //
create PROCEDURE sp_obter_frequencia_aluno(in p_id_aluno int)
BEGIN
	select 
		a.nome_aluno,
        t.nome_turma,
        count(au.id_aula) as total_aulas,
        count(case when p.presente = 1 then p.id_aula end) aulas_presentes,
        count(au.id_aula) - count(case when p.presente= 1 then p.id_aula END) as aulas_faltadas,
        round(
        (count( case when p.presente = 1 then p.id_aula END) /
        NULLIF(count(distinct au.id_aula ), 0)) * 100, 2) 
        as frequencia_percentual
	from tb_aluno a
    inner join tb_historico_aluno ha on a.id_aluno = ha.id_aluno
    inner join tb_turmas t on t.id_turma = ha.id_turma
    left join tb_aula au on au.id_turma = t.id_turma   and au.aula_concluida = TRUE
    left join tb_presenca p on p.id_aula = au.id_aula and p.id_aluno = a.id_aluno
     where a.id_aluno = p_id_aluno
    and ha.data_saida = '9999-01-01'
    group by a.id_aluno, t.id_turma;
END //
DELIMITER ;

call sp_obter_frequencia_aluno(1)
 
-- procedure para listar turmas
DELIMITER //
CREATE PROCEDURE sp_lista_turmas()
BEGIN
	SELECT * FROM tb_turmas;
END //
DELIMITER ;

-- call sp_lista_turmas()

-- //
DELIMITER //
create PROCEDURE sp_lista_info_turma(in p_id_turma int)
BEGIN

	declare p_qtd_aulas_programadas int;
	declare p_qtd_aulas_concluidas int;

    -- coletando qtd total de aulas programadas 
	SELECT count(*) into p_qtd_aulas_programadas from tb_aula
    where tb_aula.id_turma = p_id_turma;
    
    -- coletando qtd total de aulas concluidas 
	SELECT count(*) into p_qtd_aulas_concluidas  from tb_aula
	where tb_aula.id_turma = p_id_turma and aula_concluida = true;
    
    
	SELECT  t.id_turma,
			nome_turma,
            dia_aula,
            horario_aula,
            hora_fim,
            ativa, 
            count(ha.id_aluno) as qtd_alunos,
            p_qtd_aulas_programadas as 'qtd_aulas_programadas',
            p_qtd_aulas_concluidas  as 'qtd_aulas_realizadas',
            round((( p_qtd_aulas_concluidas / NULLIF(p_qtd_aulas_programadas, 0) ) * 100), 2) as 'progresso_turma' 
			from tb_turmas t 
            inner join tb_historico_aluno ha on ha.id_turma = t.id_turma
			where ha.data_saida = '9999-01-01'
		    and t.id_turma = p_id_turma
            group by t.id_turma;
END //
DELIMITER ;

-- call sp_lista_info_turma(1);

-- procedure para realizar chamada de presenca para aluno
delimiter //
create procedure sp_realizar_chamada(in p_presente boolean, in p_id_aluno int, in p_id_aula int )
begin 
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 0 AS resultado;
	END;
    
    START TRANSACTION;
    IF EXISTS (SELECT 1 FROM tb_aula where id_aula = p_id_aula) AND  (SELECT 1 FROM tb_aluno where id_aluno = p_id_aluno) 
		then
			INSERT INTO tb_presenca 
						(presente,
						data_registro,
						id_aluno,
						id_aula
						) 
					VALUES
						(p_presente,
						current_date(),
						p_id_aluno,
						p_id_aula);
		commit;
        select 1 as resultado;
	ELSE
		ROLLBACK;
        select 0 as resultado;
	end if;				
end //
delimiter ;

 -- ---------------------------------------------------------------------------------------------
-- procedure para listar alunos atuais de uma turma
DELIMITER //
create PROCEDURE sp_lista_turma_alunos(in p_id_turma int)
begin
    if exists (select 1 from tb_turmas where id_turma = p_id_turma) then
		select nome_aluno, a.id_aluno from tb_aluno a
		inner join tb_historico_aluno ha on ha.id_aluno = a.id_aluno
		where ha.id_turma = p_id_turma AND data_saida = '9999-01-01';
    end if;
end//
DELIMITER ;


-- ---------------------------------------------------------------------------------------------
 
delimiter //
create procedure sp_listar_presencas_por_aula(in p_id_aula int)
begin
	
if  exists ( select 1 from tb_aula where id_aula = p_id_aula ) then
	SELECT a.id_aluno, a.nome_aluno
			FROM tb_aluno a
			INNER JOIN tb_historico_aluno h ON a.id_aluno = h.id_aluno
			INNER JOIN tb_aula au ON au.id_turma = h.id_turma
			WHERE au.id_aula = p_id_aula AND  h.data_saida = '9999-01-01';
	else 
		select 0 as resultado;
end if;
end//
delimiter ;

-- call sp_listar_presencas_por_aula(1)

DELIMITER //
create PROCEDURE sp_conclui_aula(in p_id_aula int)
begin 
	if exists (select 1 from tb_aula where id_aula = p_id_aula and aula_concluida = false) then
		 update tb_aula
			set aula_concluida = true,
                data_aula = current_date()
            where id_aula = p_id_aula;
		select 1 as resultado;
	else
		select 0 as resultado;
	end if;
end //
DELiMITER ;



delimiter //
create procedure sp_verifica_admin(in p_usuario varchar(45), in p_senha varchar(200))
begin
	if exists (select 1 from tb_administrador
				WHERE usuario = p_usuario AND
                senha = p_senha
			  )
              then select 1 as resultado;
    else select 0 as resultado;
	end if;	
end //
delimiter ; 

 -- ////
-- procedure para informar qual foi a ultima aula 
DELIMITER //
create PROCEDURE sp_ultima_aula(in p_id_turma int)
begin
	select tipo_aula, date_format((data_aula), '%d/%m/%Y') as data_aula
    from tb_aula where data_aula <> '9999-01-01'
    and id_turma = p_id_turma
    group by id_aula
    order by data_aula
    desc limit 1;
end //
DELIMITER ;
   
-- call sp_ultima_aula(1);

 DELIMITER //
create PROCEDURE sp_lista_aulas(in p_id_turma int, in p_tipo_aula enum('Lesson','FaryTale','Debate'))
begin 
	if exists (select 1 from tb_turmas where id_turma = p_id_turma) and p_tipo_aula = 'FaryTale' then
		SELECT a.id_aula, 
			a.data_aula, 
			a.tipo_aula, 
			a.id_farytale, 
			a.id_turma, 
			a.aula_concluida,
            nome_pasta,
            nome_arquivo,
            f.titulo
		FROM tb_aula a
			inner join tb_farytale f on f.id_farytale = a.id_farytale
		where a.id_turma = p_id_turma AND a.tipo_aula = 'Farytale' order by a.id_farytale;
	-- --
	elseif exists (select 1 from tb_turmas where id_turma = p_id_turma) and p_tipo_aula = 'Debate' then
		SELECT a.id_aula, 
			a.data_aula, 
			a.tipo_aula, 
			a.id_debate, 
			a.id_turma, 
			a.aula_concluida,
            nome_pasta,
            nome_arquivo,
            d.titulo
		FROM tb_aula a
			inner join tb_debate d on d.id_debate = a.id_debate
		where a.id_turma = p_id_turma AND a.tipo_aula = 'Debate' order by a.id_debate;
	-- --
	elseif exists (select 1 from tb_turmas where id_turma = p_id_turma) and p_tipo_aula = 'Lesson' then
		SELECT a.id_aula, 
			a.data_aula, 
			a.tipo_aula, 
			a.id_lesson,
			a.id_turma,
			a.aula_concluida,
            b.nome_pasta as nome_pasta ,
            nome_arquivo,
            concat('Lesson ',numero_lesson) as titulo
		FROM tb_aula a
			inner join tb_lesson l on l.id_lesson = a.id_lesson
            inner join tb_books b on b.id_book = l.id_book
		where a.id_turma = p_id_turma AND a.tipo_aula = 'Lesson' order by a.id_lesson;
    end if;
end //
DELIMITER ;

call sp_lista_aulas(1,'FaryTale');


delimiter //
create procedure sp_historico_aluno(in p_id_aluno int)
begin
	if exists (select 1 from tb_historico_aluno where id_aluno = p_id_aluno ) then
		select t.nome_turma,date_format(ha.data_entrada, '%d-%m-%Y') as data_entrada , date_format(ha.data_saida, '%d-%m-%Y') as data_saida , ha.id_aluno from tb_historico_aluno ha
		inner join tb_turmas t on t.id_turma = ha.id_turma
		where id_aluno = p_id_aluno;
	end if;
end //
delimiter ;

call sp_historico_aluno(16);


DELIMITER //
create procedure sp_pesquisa_aluno(in p_nome varchar(250))
begin
	select id_aluno,
    nome_aluno, 
    date_format(data_matricula, '%d-%m-%Y') AS data_matricula ,
    cidade,
    tipo_bancaria,
    numero_telefone,
    bolsista,
    ativo,
    email_aluno,
    nivel
    from tb_aluno 
    where nome_aluno like concat('%', p_nome, '%');
end//
DELIMITER ;

delimiter //
create procedure sp_matricula_aluno(
	 in p_nome_aluno varchar(100),
 	 in p_cidade varchar(100),
	 in p_tipo_bancaria varchar(45),
	 in p_numero_telefone varchar(45),
	 in p_bolsista boolean,
	 in p_email_aluno varchar(100),
	 in p_nivel varchar(45),
     in p_id_turma int
 )
begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 0 AS resultado;
	END;

    if exists (select 1 from tb_aluno where email_aluno = p_email_aluno ) or not exists
			  ( select 1 from tb_turmas where id_turma = p_id_turma and ativa = true) then
		select 2 as resultado; -- para o front end saber o possivel erro, turma não ativa ou não existe || email de aluno ja existente no sistema
	else 
		start transaction;
		insert into tb_aluno(
            nome_aluno,
            data_matricula,
			cidade,
            tipo_bancaria,
            numero_telefone,
            bolsista,
            ativo,
            email_aluno,
            nivel) 
            values 
            (p_nome_aluno,
            current_date(),
            p_cidade,
            p_tipo_bancaria,
            p_numero_telefone,
            p_bolsista  ,
            true,
	        p_email_aluno ,
			p_nivel);
            insert into tb_historico_aluno(
				data_entrada,
				id_aluno,
				id_turma) 
                values
                (
                current_date(),
                last_insert_id(),
                p_id_turma
                );
				
            commit;
            select 1 as resultado;
	end if;
end //
delimiter ;

call sp_matricula_aluno('clay', 'campinas', 'itau', '(19) 99999999', true,'clay@gamil.com', 'Avançado', 1);



delimiter //
create procedure sp_edita_aluno(
	 in p_id_aluno int,
	 in p_nome_aluno varchar(100),
 	 in p_cidade varchar(100),
	 in p_tipo_bancaria varchar(45),
	 in p_numero_telefone varchar(45),
	 in p_bolsista boolean,
	 in p_email_aluno varchar(100),
     in p_ativo tinyint,
	 in p_nivel varchar(45),
     in p_id_turma int
 )
begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 0 AS resultado;
	END;

    if exists  (select 1 from tb_aluno where email_aluno = p_email_aluno and id_aluno <> p_id_aluno) or not exists
			  ( select 1 from tb_turmas where id_turma = p_id_turma and ativa is true) then
		select 2 as resultado; 
	else 
		start transaction;
        
        -- caso  aluno esteja sendo desativado do curso
          if p_ativo = false then 
            update tb_historico_aluno
				set data_saida = current_date()
			where id_aluno = p_id_aluno and data_saida = '9999-01-01';
            end if;
         
		update tb_aluno 
            set nome_aluno = p_nome_aluno,
            cidade = p_cidade,
            tipo_bancaria = p_tipo_bancaria,
            numero_telefone = p_numero_telefone,
            bolsista = p_bolsista,
            ativo = p_ativo,
            email_aluno = p_email_aluno,
            nivel = p_nivel
            where id_aluno = p_id_aluno;
		    
			-- caso o aluno esteja sendo trocado de turma
			if p_id_turma <> (select id_turma from tb_historico_aluno where id_aluno = p_id_aluno and data_saida = '9999-01-01' order by data_entrada desc limit 1) then
            update tb_historico_aluno
				set data_saida = current_date()
			where id_aluno = p_id_aluno and data_saida = '9999-01-01';
            
            insert into tb_historico_aluno(data_entrada, id_aluno, id_turma) values
                                          (current_date(), p_id_aluno, p_id_turma);
			end if;
            
            commit;
            select 1 as resultado;
	end if;
end //
delimiter ;

DELIMITER //
create PROCEDURE sp_conclui_conversacao(in p_id_turma int)
begin 
		if exists (select 1 from tb_turmas where id_turma = p_id_turma) then
		INSERT INTO tb_aula (data_aula,`tipo_aula`, `id_turma`, aula_concluida) VALUES (current_date(),'Conversacao', p_id_turma, true);
		select 1 as resultado, last_insert_id() as id_aula;
        else
			select 0 as resultado;
        end if;
 end //
DELiMITER ;
call sp_conclui_conversacao(1);

 
 

DELIMITER //
create PROCEDURE sp_cadastra_material(
	in p_tipo_aula enum('Lesson','FaryTale','Debate'),
    in p_nome_pasta varchar(45),
	in p_nome_arquivo varchar(100), 
	in p_titulo varchar(100),
    in p_id_book int,
    in p_numero_lesson int
)
begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 0 AS resultado;
	END;
    
	if p_tipo_aula  = 'Lesson' and 
		exists (select 1 from tb_books where id_book = p_id_book)
		and not exists (select 1 from tb_lesson l 
		inner join tb_books b on b.id_book = l.id_book 
        where nome_arquivo = p_nome_arquivo and b.id_book = p_id_book and  numero_lesson = p_numero_lesson)then
        
		insert into tb_lesson(
            numero_lesson,
            nome_arquivo,
            id_book
            )
            values
            (p_numero_lesson,
             p_nome_arquivo,
             p_id_book
            );
            
            INSERT INTO tb_aula ( tipo_aula, id_turma, id_lesson)
			SELECT 'Lesson', t.id_turma, last_insert_id()
			FROM tb_turmas t;
            
            commit;
			SELECT 1 AS resultado;
            
	 elseif p_tipo_aula  = 'FaryTale' and 
		not exists (select 1 from tb_farytale where nome_arquivo = p_nome_arquivo) then
		insert into tb_farytale(
            nome_pasta,
            nome_arquivo,
            titulo
            )
            values
            (p_nome_pasta,
             p_nome_arquivo,
             p_titulo
            );
            
            INSERT INTO tb_aula ( tipo_aula, id_turma, id_farytale)
			SELECT 'FaryTale', t.id_turma, last_insert_id()
			FROM tb_turmas t;
            
            commit;
			SELECT 1 AS resultado;
	 elseif p_tipo_aula  = 'Debate' and
     not exists (select 1 from tb_debate where nome_arquivo = p_nome_arquivo) then
		insert into tb_debate(
            nome_pasta,
            nome_arquivo,
            titulo
            )
            values
            (p_nome_pasta,
             p_nome_arquivo,
             p_titulo
            );
            
            INSERT INTO tb_aula ( tipo_aula, id_turma, id_debate)
			SELECT 'Debate', t.id_turma, last_insert_id()
			FROM tb_turmas t;
            
            commit;
			SELECT 1 AS resultado;
	 else
		Select 0 as resultado;
    end if;
    
     
end//
DELIMITER ;


DELIMITER //
create PROCEDURE sp_realiza_pagamento(in p_aluno_email varchar(100), in p_id_mensalidade int) 
begin
    DECLARE v_id_aluno int;
	DECLARE v_mes_ano_corrente VARCHAR(7);
    Declare v_resultado int;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
        set v_resultado =0; -- para erro
 	END;
    
	SET v_mes_ano_corrente = DATE_FORMAT(current_date(), '%Y-%m');
    
    if not exists (select 1 from tb_aluno where email_aluno = p_aluno_email) OR
      not exists(select 1 from tb_mensalidades where id_mensalidade = p_id_mensalidade) then 
		 set v_resultado =2; -- para email ou mensalidade não encontrado
	else
		select id_aluno into v_id_aluno from tb_aluno where email_aluno = p_aluno_email;
        
        if exists
		(SELECT 1 FROM tb_pagamentos WHERE id_aluno = v_id_aluno 
		AND DATE_FORMAT(data_pagamento, '%Y-%m') = v_mes_ano_corrente) 
		then
			 set v_resultado =3; -- para pagamento ja realiado no mes corrente
		else
			start transaction;
            
			INSERT INTO tb_pagamentos (data_pagamento, id_aluno, id_mensalidade)
			VALUES (current_date(), v_id_aluno, p_id_mensalidade);	
            
            commit;
            set v_resultado =1; -- para sucesso no pagamnto
		end if;
	end if;
    
    select v_resultado as resultado;
 end //
DELIMITER ;

select *from tb_mensalidades;

--  1. Análise: Projeção de Receita para o Mês Corrente (Dinâmica)
delimiter //
create procedure sp_projecao_receita()
	begin 
	SELECT 
		CONCAT('PROJEÇÃO ', UPPER(DATE_FORMAT(CURDATE(), '%M %Y'))) as tipo_analise,
		COUNT(DISTINCT a.id_aluno) as total_alunos_ativos,
		SUM(a.bolsista) as total_bolsistas,
		COUNT(DISTINCT a.id_aluno) - SUM(a.bolsista) as total_nao_bolsistas,
		
		SUM(CASE 
			WHEN p.id_pagamentos IS NOT NULL 
			AND MONTH(p.data_pagamento) = MONTH(CURDATE()) 
			AND YEAR(p.data_pagamento) = YEAR(CURDATE())
			AND a.bolsista = 0 THEN 1 ELSE 0 
		END) as alunos_nao_bolsistas_que_ja_pagaram,
		
		(COUNT(DISTINCT a.id_aluno) - SUM(a.bolsista)) - 
		SUM(CASE 
			WHEN p.id_pagamentos IS NOT NULL 
			AND MONTH(p.data_pagamento) = MONTH(CURDATE()) 
			AND YEAR(p.data_pagamento) = YEAR(CURDATE())
			AND a.bolsista = 0 THEN 1 ELSE 0 
		END) as alunos_nao_bolsistas_pendentes,
		
		COALESCE(SUM(CASE 
			WHEN p.id_pagamentos IS NOT NULL 
			AND MONTH(p.data_pagamento) = MONTH(CURDATE()) 
			AND YEAR(p.data_pagamento) = YEAR(CURDATE())
			AND a.bolsista = 0 THEN m.valor ELSE 0 
		END), 0) as receita_realizada,
		
		COALESCE(SUM(CASE WHEN a.bolsista = 0 THEN ultima_mensalidade.valor ELSE 0 END), 0) as receita_total_projetada,
		
		COALESCE(SUM(CASE WHEN a.bolsista = 0 THEN ultima_mensalidade.valor ELSE 0 END), 0) - 
		COALESCE(SUM(CASE 
			WHEN p.id_pagamentos IS NOT NULL 
			AND MONTH(p.data_pagamento) = MONTH(CURDATE()) 
			AND YEAR(p.data_pagamento) = YEAR(CURDATE())
			AND a.bolsista = 0 THEN m.valor ELSE 0 
		END), 0) as receita_pendente,
		
		ROUND(
			(SUM(CASE 
				WHEN p.id_pagamentos IS NOT NULL 
				AND MONTH(p.data_pagamento) = MONTH(CURDATE()) 
				AND YEAR(p.data_pagamento) = YEAR(CURDATE())
				AND a.bolsista = 0 THEN 1 ELSE 0 
			END) / NULLIF((COUNT(DISTINCT a.id_aluno) - SUM(a.bolsista)), 0)) * 100, 2
		) as percentual_nao_bolsistas_pagos,
		
		-- Dias restantes no mês
		DAY(LAST_DAY(CURDATE())) - DAY(CURDATE()) as dias_restantes_mes

	FROM tb_aluno a
	LEFT JOIN tb_pagamentos p ON a.id_aluno = p.id_aluno 
		AND MONTH(p.data_pagamento) = MONTH(CURDATE()) 
		AND YEAR(p.data_pagamento) = YEAR(CURDATE())
	LEFT JOIN tb_mensalidades m ON p.id_mensalidade = m.id_mensalidade
	LEFT JOIN (
		SELECT p1.id_aluno, m1.valor
		FROM tb_pagamentos p1
		JOIN tb_mensalidades m1 ON p1.id_mensalidade = m1.id_mensalidade
		WHERE p1.data_pagamento = (
			SELECT MAX(p2.data_pagamento)
			FROM tb_pagamentos p2
			WHERE p2.id_aluno = p1.id_aluno
		)
	) as ultima_mensalidade ON a.id_aluno = ultima_mensalidade.id_aluno
	WHERE a.ativo = 1;
end //
delimiter ;

-- 2. Análise: Tendência e Sazonalidade de Receita (Dinâmica)
delimiter //
create procedure sp_tendencia_sazonalidade_receita()
	begin 
	SELECT 
		ano,
		mes,
		nome_mes,
		receita_mensal,
		LAG(receita_mensal) OVER (ORDER BY ano, mes) as receita_mes_anterior,
		receita_mensal - LAG(receita_mensal) OVER (ORDER BY ano, mes) as variacao_absoluta,
		ROUND(
			((receita_mensal - LAG(receita_mensal) OVER (ORDER BY ano, mes)) / 
			NULLIF(LAG(receita_mensal) OVER (ORDER BY ano, mes), 0)) * 100, 2
		) as variacao_percentual,
		
		ROUND(AVG(receita_mensal) OVER (
			ORDER BY ano, mes 
			ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
		), 2) as media_movel_3meses,
		
		-- Comparação com mesmo mês do ano anterior
		LAG(receita_mensal, 12) OVER (ORDER BY ano, mes) as receita_mes_ano_anterior,
		receita_mensal - LAG(receita_mensal, 12) OVER (ORDER BY ano, mes) as crescimento_anual_absoluto,
		ROUND(
			((receita_mensal - LAG(receita_mensal, 12) OVER (ORDER BY ano, mes)) / 
			NULLIF(LAG(receita_mensal, 12) OVER (ORDER BY ano, mes), 0)) * 100, 2
		) as crescimento_anual_percentual

	FROM (
		SELECT 
			YEAR(data_pagamento) as ano,
			MONTH(data_pagamento) as mes,
			DATE_FORMAT(data_pagamento, '%M') as nome_mes,
			SUM(m.valor) as receita_mensal
		FROM tb_pagamentos p
		JOIN tb_mensalidades m ON p.id_mensalidade = m.id_mensalidade
		WHERE data_pagamento >= DATE_SUB(CURDATE(), INTERVAL 18 MONTH)
		GROUP BY YEAR(data_pagamento), MONTH(data_pagamento), DATE_FORMAT(data_pagamento, '%M')
	) as receita_mensal
	ORDER BY ano, mes;

end //
delimiter;

-- 3. Análise: LTV (Lifetime Value) dos Alunos (Dinâmica)
delimiter // 
 create procedure sp_ltv_alunos()
 begin
	SELECT 
		a.id_aluno,
		a.nome_aluno,
		a.data_matricula,
		a.cidade,
		a.bolsista,
		ultima_mensalidade.tipo as tipo_mensalidade_atual,
		
		COUNT(p.id_pagamentos) as total_pagamentos,
		SUM(m.valor) as receita_total_gerada,
		DATEDIFF(CURDATE(), a.data_matricula) as dias_como_aluno,
		ROUND(SUM(m.valor) / NULLIF(DATEDIFF(CURDATE(), a.data_matricula), 0) * 30, 2) as receita_media_mensal,
		
		-- Projeção de LTV (baseada em média mensal × 12 meses × 2 anos)
		ROUND((SUM(m.valor) / NULLIF(DATEDIFF(CURDATE(), a.data_matricula), 0) * 30 * 12 * 2), 2) as ltv_projetado_2anos,
		
		-- Frequência de pagamento
		ROUND(COUNT(p.id_pagamentos) / NULLIF(DATEDIFF(CURDATE(), a.data_matricula), 0) * 30, 2) as frequencia_pagamentos_mensal,
		
		-- Status atual (considerando pagamentos dos últimos 45 dias)
		CASE 
			WHEN a.bolsista = 1 THEN 'BOLSISTA'
			WHEN MAX(p.data_pagamento) IS NULL THEN 'NUNCA PAGOU'
			WHEN DATEDIFF(CURDATE(), MAX(p.data_pagamento)) <= 45 THEN 'EM DIA'
			ELSE 'EM ATRASO'
		END as status_pagamento,
		
		DATEDIFF(CURDATE(), MAX(p.data_pagamento)) as dias_ultimo_pagamento

	FROM tb_aluno a
	LEFT JOIN tb_pagamentos p ON a.id_aluno = p.id_aluno
	LEFT JOIN tb_mensalidades m ON p.id_mensalidade = m.id_mensalidade
	LEFT JOIN (
		SELECT 
			p1.id_aluno, 
			m1.tipo,
			m1.valor
		FROM tb_pagamentos p1
		JOIN tb_mensalidades m1 ON p1.id_mensalidade = m1.id_mensalidade
		WHERE p1.data_pagamento = (
			SELECT MAX(p2.data_pagamento)
			FROM tb_pagamentos p2
			WHERE p2.id_aluno = p1.id_aluno
		)
	) as ultima_mensalidade ON a.id_aluno = ultima_mensalidade.id_aluno
	WHERE a.ativo = 1
	GROUP BY a.id_aluno, a.nome_aluno, a.data_matricula, a.cidade, a.bolsista, 
			 ultima_mensalidade.tipo, ultima_mensalidade.valor
	ORDER BY receita_total_gerada DESC;

end //
delimiter ;


-- 4 Análise: Previsão de Receita para Próximos 3 Meses
delimiter //
create procedure sp_prev_receita_3_meses()
begin
	-- 4. Análise: Previsão de Receita para Próximos 3 Meses (Dinâmica)
	WITH ReceitaHistorica AS (
		SELECT 
			YEAR(data_pagamento) as ano,
			MONTH(data_pagamento) as mes,
			SUM(m.valor) as receita_mensal
		FROM tb_pagamentos p
		JOIN tb_mensalidades m ON p.id_mensalidade = m.id_mensalidade
		WHERE data_pagamento >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
		GROUP BY YEAR(data_pagamento), MONTH(data_pagamento)
	),
	MediaMovel AS (
		SELECT 
			AVG(receita_mensal) as media_6meses,
			STD(receita_mensal) as desvio_padrao
		FROM ReceitaHistorica
		ORDER BY ano DESC, mes DESC
		LIMIT 6
	)
	SELECT 
		DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m') as mes_ano,
		DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%M %Y') as mes_ano_nome,
		ROUND((SELECT media_6meses FROM MediaMovel) * 1.05, 2) as receita_projetada,
		ROUND((SELECT media_6meses FROM MediaMovel) * 0.90, 2) as limite_inferior,
		ROUND((SELECT media_6meses FROM MediaMovel) * 1.15, 2) as limite_superior,
		'ALTA' as confianca

	UNION ALL

	SELECT 
		DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 2 MONTH), '%Y-%m') as mes_ano,
		DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 2 MONTH), '%M %Y') as mes_ano_nome,
		ROUND((SELECT media_6meses FROM MediaMovel) * 1.03, 2) as receita_projetada,
		ROUND((SELECT media_6meses FROM MediaMovel) * 0.85, 2) as limite_inferior,
		ROUND((SELECT media_6meses FROM MediaMovel) * 1.12, 2) as limite_superior,
		'MÉDIA' as confianca

	UNION ALL

	SELECT 
		DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 3 MONTH), '%Y-%m') as mes_ano,
		DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 3 MONTH), '%M %Y') as mes_ano_nome,
		ROUND((SELECT media_6meses FROM MediaMovel) * 1.01, 2) as receita_projetada,
		ROUND((SELECT media_6meses FROM MediaMovel) * 0.80, 2) as limite_inferior,
		ROUND((SELECT media_6meses FROM MediaMovel) * 1.10, 2) as limite_superior,
		'BAIXA' as confianca

	ORDER BY mes_ano;
end //
delimiter;


-- 5. Análise: Impacto Financeiro dos Bolsistas (Dinâmica)

delimiter //
create procedure sp_impac_bolsistas()
begin
 WITH AlunosAtivos AS (
    SELECT 
        a.id_aluno,
        a.bolsista,
        ultima_mensalidade.valor as valor_mensalidade
    FROM tb_aluno a
    LEFT JOIN (
        SELECT 
            p1.id_aluno,
            m1.valor
        FROM tb_pagamentos p1
        JOIN tb_mensalidades m1 ON p1.id_mensalidade = m1.id_mensalidade
        WHERE p1.data_pagamento = (
            SELECT MAX(p2.data_pagamento)
            FROM tb_pagamentos p2
            WHERE p2.id_aluno = p1.id_aluno
        )
    ) as ultima_mensalidade ON a.id_aluno = ultima_mensalidade.id_aluno
    WHERE a.ativo = 1
)
SELECT 
    'IMPACTO BOLSISTAS - ' OR DATE_FORMAT(CURDATE(), '%M %Y') as analise,
    COUNT(*) as total_alunos_ativos,
    SUM(bolsista) as total_bolsistas,
    COUNT(*) - SUM(bolsista) as total_nao_bolsistas,
    ROUND((SUM(bolsista) / COUNT(*) * 100), 2) as percentual_bolsistas,
    
    -- Receita mensal atual (apenas não bolsistas)
    COALESCE(SUM(CASE WHEN bolsista = 0 THEN valor_mensalidade ELSE 0 END), 0) as receita_mensal_atual,
    
    -- Receita potencial mensal (se todos pagassem)
    COALESCE(SUM(valor_mensalidade), 0) as receita_mensal_potencial,
    
    -- Impacto mensal dos bolsistas
    COALESCE(SUM(valor_mensalidade), 0) - 
    COALESCE(SUM(CASE WHEN bolsista = 0 THEN valor_mensalidade ELSE 0 END), 0) as impacto_mensal_bolsistas,
    
    ROUND(
        ((COALESCE(SUM(valor_mensalidade), 0) - 
        COALESCE(SUM(CASE WHEN bolsista = 0 THEN valor_mensalidade ELSE 0 END), 0)) / 
        NULLIF(COALESCE(SUM(valor_mensalidade), 0), 0)) * 100, 2
    ) as percentual_impacto_mensal,
    
    -- Impacto anual projetado
    (COALESCE(SUM(valor_mensalidade), 0) - 
     COALESCE(SUM(CASE WHEN bolsista = 0 THEN valor_mensalidade ELSE 0 END), 0)) * 12 as impacto_anual_bolsistas,
    
    -- Custo de oportunidade (considerando valor médio das mensalidades)
    ROUND(AVG(CASE WHEN bolsista = 0 THEN valor_mensalidade ELSE NULL END), 2) as valor_medio_mensalidade_nao_bolsistas

FROM AlunosAtivos;
end //
delimiter;
  

-- 6. Análise: Alunos Inadimplentes
delimiter //
create procedure sp_alunos_inidimplentes()
begin
-- 6. Análise: Alunos Inadimplentes (Dinâmica)
SELECT 
    a.id_aluno,
    a.nome_aluno,
    a.cidade,
    a.email_aluno,
    ultima_mensalidade.tipo as ultimo_tipo_mensalidade,
    ultima_mensalidade.valor as valor_devido,
    MAX(p.data_pagamento) as ultimo_pagamento,
    DATEDIFF(CURDATE(), MAX(p.data_pagamento)) as dias_sem_pagar,
    
    CASE 
        WHEN a.bolsista = 1 THEN 'BOLSISTA'
        WHEN MAX(p.data_pagamento) IS NULL THEN 'NUNCA PAGOU'
        WHEN DATEDIFF(CURDATE(), MAX(p.data_pagamento)) > 60 THEN 'INADIMPLENTE GRAVE'
        WHEN DATEDIFF(CURDATE(), MAX(p.data_pagamento)) > 30 THEN 'INADIMPLENTE'
        ELSE 'EM DIA'
    END as status,
    
    -- Quantidade de meses em atraso (considerando pagamento mensal)
    FLOOR(DATEDIFF(CURDATE(), MAX(p.data_pagamento)) / 30) as meses_em_atraso,
    
    -- Valor total em débito
    FLOOR(DATEDIFF(CURDATE(), MAX(p.data_pagamento)) / 30) * ultima_mensalidade.valor as valor_total_debito

FROM tb_aluno a
LEFT JOIN tb_pagamentos p ON a.id_aluno = p.id_aluno
LEFT JOIN (
    SELECT 
        p1.id_aluno, 
        m1.tipo, 
        m1.valor
    FROM tb_pagamentos p1
    JOIN tb_mensalidades m1 ON p1.id_mensalidade = m1.id_mensalidade
    WHERE p1.data_pagamento = (
        SELECT MAX(p2.data_pagamento)
        FROM tb_pagamentos p2
        WHERE p2.id_aluno = p1.id_aluno
    )
) as ultima_mensalidade ON a.id_aluno = ultima_mensalidade.id_aluno
WHERE a.ativo = 1 
AND a.bolsista = 0  -- Apenas não bolsistas podem ser inadimplentes
GROUP BY a.id_aluno, a.nome_aluno, a.cidade, a.email_aluno, 
         ultima_mensalidade.tipo, ultima_mensalidade.valor
HAVING MAX(p.data_pagamento) IS NULL 
    OR DATEDIFF(CURDATE(), MAX(p.data_pagamento)) > 30
ORDER BY dias_sem_pagar DESC;

end//
delimiter;
  
 
 -- 7  Análise: Sazonalidade de Matrículas por Mês
delimiter //
create procedure sp_sazonalidade_matriculas_mes()
begin 
	SELECT 
		MONTH(data_matricula) as mes_numero,
		DATE_FORMAT(data_matricula, '%M') as mes_nome,
		COUNT(*) as total_matriculas,
		ROUND((COUNT(*) / (SELECT COUNT(*) FROM tb_aluno) * 100), 2) as percentual_total,
		-- Ranking dos meses (1 = melhor mês)
		RANK() OVER (ORDER BY COUNT(*) DESC) as ranking_mes
	FROM tb_aluno
	WHERE data_matricula >= DATE_SUB(CURDATE(), INTERVAL 2 YEAR)
	GROUP BY MONTH(data_matricula), DATE_FORMAT(data_matricula, '%M')
	ORDER BY total_matriculas DESC;
end //
delimiter ;

-- call sp_marca_aula_demostrativa('fff' , '2025-11-29','a5il.com', '19:00:00');

delimiter //
create procedure sp_marca_aula_demostrativa(
	in p_nome_aluno varchar(100),
    in p_data_aula date,
    in p_email_aluno varchar(100),
    in p_horario time
    )
begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 0 AS resultado;
	END;
    
    if exists (select 1 from tb_aula_demostrativa where email_aluno = p_email_aluno) OR
    exists (select 1 from tb_aula_demostrativa where data_aula = p_data_aula and horario = p_horario) then
		select 2 as resultado;
    elseif p_data_aula < current_date() then
		select 3 as resultado;
	elseif p_horario < '07:00:00' or p_horario > '20:00:00' then
		select 4 as resultado;
    else 
		start transaction;
			insert into tb_aula_demostrativa(data_aula, email_aluno ,nome_aluno,horario )
            values
            (p_data_aula, p_email_aluno ,p_nome_aluno,p_horario );
        commit;
        select 1 as resultado;
    end if;
end //
delimiter ;

call sp_cofirma_matricula(3)
delimiter //
create procedure sp_cofirma_matricula(in p_id_aula_demostrativa int)
begin
	  DECLARE EXIT HANDLER FOR SQLEXCEPTION
	  BEGIN
	   ROLLBACK;
	   SELECT 0 AS resultado;
	  END;
      
      if exists (select 1 from tb_aula_demostrativa where id_aula_demostrativa = p_id_aula_demostrativa) then
		start transaction;
			update tb_aula_demostrativa
             SET matriculado = 1,
             status = 'Finalizada'
             where id_aula_demostrativa = p_id_aula_demostrativa;
        commit;
        select 1 as resultado;
      end if;

end//
delimiter ;

select * from tb_aula_demostrativa where status = 'Em andamento';

 delimiter //
create procedure sp_cancela_aula_demostrativa(in p_id_aula_demostrativa int)
begin
	  DECLARE EXIT HANDLER FOR SQLEXCEPTION
	  BEGIN
	   ROLLBACK;
	   SELECT 0 AS resultado;
	  END;
      
      if exists (select 1 from tb_aula_demostrativa where id_aula_demostrativa = p_id_aula_demostrativa and status ='Em andamento' ) then
		start transaction;
			update tb_aula_demostrativa
             SET status = 'Desmarcada'
             where id_aula_demostrativa = p_id_aula_demostrativa;
        commit;
        select 1 as resultado;
	  else
		select 0 as resultado;
      end if;

end//
delimiter ;

-- porcedure para inserir livro
delimiter // 
create procedure sp_insere_livro(
	in p_nome_livro varchar(100) ,
	in p_genero varchar(100) ,
	in p_autor varchar(100) ,
	in p_nicho varchar(45),
    in p_numero_livro int
	)
begin 
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 0 AS resultado;
	END;
    
    if exists (select 1 from tb_acervo_livros where nicho =p_nicho and numero_livro = p_numero_livro) then
		select 2 as resultado; -- para que o frontend saiba qual o erro notificar ao usuario
	else
		start transaction;
			insert into tb_acervo_livros(nome_livro, genero, autor, nicho,numero_livro) value(p_nome_livro, p_genero,p_autor,p_nicho,p_numero_livro);
		commit;
        select 1 as resultado;
    end if;
end//
delimiter ;

 
-- porcedure para editar livro
delimiter //
create procedure sp_edita_livro(
	in p_nome_livro varchar(100) ,
	in p_genero varchar(100) ,
	in p_autor varchar(100) ,
	in p_nicho varchar(45),
    in p_numero_livro int -- esse numero identitifica um livro individualmente 
	)
begin 
	declare v_id_livro int;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 0 AS resultado;
	END;
    
    select id_livro into v_id_livro from tb_acervo_livros where numero_livro = p_numero_livro;
    
    if not exists (select 1 from tb_acervo_livros where nicho = p_nicho and numero_livro = p_numero_livro) then
		select 2 as resultado; -- para que o frontend saiba qual o erro notificar ao usuario
	else
		start transaction;
			update tb_acervo_livros
				set nome_livro = p_nome_livro,
                genero = p_genero , 
                autor = p_autor,
                nicho = p_nicho
			where id_livro = v_id_livro;
		commit;
        select 1 as resultado;
    end if;
end//
delimiter ;
-- procedure para registar emprestimo
delimiter //
create procedure sp_registar_emprestimo(in p_email_aluno varchar(100), in p_id_livro int )
begin
    declare v_id_aluno int;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 0 AS resultado;
	END;
    
    select id_aluno into v_id_aluno from tb_aluno where email_aluno = p_email_aluno;
    
    if not exists (select 1 from tb_aluno where id_aluno = v_id_aluno) OR
    not exists (select 1 from tb_acervo_livros where id_livro = p_id_livro) then
		select 2 as resultado;
	elseif exists (select 1 from tb_emprestimos where status_devolucao = 'Em andamento' and p_id_livro = id_livro ) and
				exists (select 1 from tb_acervo_livros where id_livro = p_id_livro and status = 'Emprestado' )then
		select 3 as resultado; -- notificando o frontend que já existe um  emprestimo  com o livro escolhido
	else
		start transaction;
			insert into tb_emprestimos 
			(
			data_emp ,
			data_dev ,
			status_devolucao ,
			id_aluno ,
			id_livro 
			)values 
			(
			current_date(),
			'9999-01-01',
			 'Em andamento',
			 v_id_aluno,
			 p_id_livro
			);
		commit;
        select 1 as resultado;
    end if;
end //
delimiter;
  
-- procedure para regiatrar devolução
delimiter //
create procedure sp_registra_devolução(in p_id_emprestimo int)
begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SELECT 0 AS resultado;
	END;
    
    if exists (select 1 from tb_emprestimos where id_emprestimo = p_id_emprestimo and status_devolucao = 'Em andamento') then
		start transaction;
			update tb_emprestimos 
				set status_devolucao = 'Devolvido',
				data_dev = current_date()
			where status_devolucao = 'Em andamento' and id_emprestimo = p_id_emprestimo;
		commit;
    select 1 as resultado;
    else
		select 2 as resultado;
    end if;

end//
delimiter ;

-- procedure para pesquisar livros disponiveis para emprestimos

delimiter //
create procedure sp_pesquisa_livro(in p_nome_livro varchar(100), in p_numero_livro int)
begin
	select * from tb_acervo_livros where
    nome_livro like concat('%', p_nome_livro, '%') or numero_livro = p_numero_livro;
end//
delimiter ;


-- procedure para decrementar quantidae de books 
delimiter //
create procedure sp_incrementa_estoque(in p_numero_book int)
begin
	declare v_id_estoque int;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		select 0 as resultado;
	END;
    
    select id_estoque into v_id_estoque from tb_estoque where numero_book = p_numero_book;
    
    if exists (select 1 from tb_estoque where numero_book = p_numero_book) then
		start transaction;
			update tb_estoque
				set quantidade = quantidade + 1
                where numero_book = p_numero_book and id_estoque = v_id_estoque;
        commit;
        select 1 as resultado;
    else
		select 0 as resultado;
     end if;
end//
delimiter ;

 
-- procedure para decremento da quantidade de books

delimiter //
create procedure sp_decrementa_estoque(in p_numero_book int)
begin
	declare v_id_estoque int;
    declare v_quantidade int;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		select 0 as resultado;
	END;
    
    select id_estoque ,quantidade into v_id_estoque, v_quantidade from tb_estoque where numero_book = p_numero_book;
    if v_id_estoque and  v_quantidade > 0 then
		start transaction;
			update tb_estoque
				set quantidade = quantidade - 1
                where numero_book = p_numero_book 
                and id_estoque = v_id_estoque;
        commit;
        select 1 as resultado;
    else
		select 2 as resultado; -- para o frontend saber notificar o problmea!
     end if;
end//
delimiter ;

  
 
 
 
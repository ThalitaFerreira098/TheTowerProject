
-- trigger para atualizar o campo status da tebela livro apos 

delimiter //
create trigger tg_atualiza_status_livro_pos_emprestimo
after insert 
on tb_emprestimos
for each row
begin
	update tb_acervo_livros
		set status = 'Emprestado'
	where new.id_livro = id_livro and status ='Disponivel';
end//
delimiter ;

-- trigger para atualizar estados do livro apos devolução na tb_emprestimos

delimiter //
create trigger tg_atualiza_status_livro_pos_devolutiva
after update 
on tb_emprestimos
for each row
begin
	update tb_acervo_livros
		set status = 'Disponivel'
	where old.id_livro = id_livro and status ='Emprestado';
end//
delimiter ;
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema thetower_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema thetower_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `thetower_db` DEFAULT CHARACTER SET utf8mb3 ;
USE `thetower_db` ;

-- -----------------------------------------------------
-- Table `thetower_db`.`tb_acervo_livros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_acervo_livros` (
  `id_livro` INT NOT NULL AUTO_INCREMENT,
  `nome_livro` VARCHAR(100) NOT NULL,
  `genero` VARCHAR(100) NOT NULL,
  `autor` VARCHAR(100) NOT NULL,
  `nicho` VARCHAR(45) NOT NULL,
  `status` ENUM('Disponivel', 'Emprestado') NOT NULL DEFAULT 'Disponivel',
  `numero_livro` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_livro`),
  UNIQUE INDEX `numero_livro_UNIQUE` (`numero_livro` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_administrador` (
  `id_administrador` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_administrador`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_aluno` (
  `id_aluno` INT NOT NULL AUTO_INCREMENT,
  `nome_aluno` VARCHAR(100) NOT NULL,
  `data_matricula` DATE NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  `tipo_bancaria` VARCHAR(45) NOT NULL,
  `numero_telefone` VARCHAR(45) NOT NULL,
  `bolsista` TINYINT NOT NULL DEFAULT '0',
  `ativo` TINYINT NOT NULL DEFAULT '0',
  `email_aluno` VARCHAR(100) NOT NULL,
  `nivel` ENUM('Iniciante', 'Intermediario', 'Avançado') NULL DEFAULT 'Iniciante',
  PRIMARY KEY (`id_aluno`),
  UNIQUE INDEX `email_aluno_UNIQUE` (`email_aluno` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_debate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_debate` (
  `id_debate` INT NOT NULL AUTO_INCREMENT,
  `nome_pasta` VARCHAR(45) NOT NULL,
  `nome_arquivo` VARCHAR(45) NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_debate`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_farytale`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_farytale` (
  `id_farytale` INT NOT NULL AUTO_INCREMENT,
  `nome_pasta` VARCHAR(45) NOT NULL,
  `nome_arquivo` VARCHAR(100) NOT NULL,
  `titulo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_farytale`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_books` (
  `id_book` INT NOT NULL AUTO_INCREMENT,
  `numero_book` INT NOT NULL,
  `nome_pasta` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_book`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_lesson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_lesson` (
  `id_lesson` INT NOT NULL AUTO_INCREMENT,
  `numero_lesson` INT NOT NULL,
  `nome_arquivo` VARCHAR(100) NOT NULL,
  `id_book` INT NOT NULL,
  PRIMARY KEY (`id_lesson`),
  INDEX `fk_tb_lesson_tb_Books1_idx` (`id_book` ASC) INVISIBLE,
  CONSTRAINT `fk_tb_lesson_tb_Books1`
    FOREIGN KEY (`id_book`)
    REFERENCES `thetower_db`.`tb_books` (`id_book`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_turmas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_turmas` (
  `id_turma` INT NOT NULL AUTO_INCREMENT,
  `nome_turma` VARCHAR(45) NOT NULL,
  `dia_aula` ENUM('Segunda-Feira', 'Terça-feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado') NOT NULL,
  `horario_aula` TIME NOT NULL,
  `hora_fim` TIME NOT NULL DEFAULT '00:00:00',
  `ativa` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id_turma`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_aula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_aula` (
  `id_aula` INT NOT NULL AUTO_INCREMENT,
  `data_aula` DATE NOT NULL DEFAULT '9999-01-01',
  `tipo_aula` ENUM('Lesson', 'FaryTale', 'Debate', 'Conversacao') NOT NULL,
  `id_lesson` INT NULL DEFAULT NULL,
  `id_farytale` INT NULL DEFAULT NULL,
  `id_debate` INT NULL DEFAULT NULL,
  `id_turma` INT NOT NULL,
  `aula_concluida` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_aula`),
  INDEX `fk_tb_aula_tb_lesson1_idx` (`id_lesson` ASC) VISIBLE,
  INDEX `fk_tb_aula_tb_farytale1_idx` (`id_farytale` ASC) VISIBLE,
  INDEX `fk_tb_aula_tb_debate1_idx` (`id_debate` ASC) VISIBLE,
  INDEX `fk_tb_aula_tb_turmas1_idx` (`id_turma` ASC) VISIBLE,
  CONSTRAINT `fk_tb_aula_tb_debate1`
    FOREIGN KEY (`id_debate`)
    REFERENCES `thetower_db`.`tb_debate` (`id_debate`),
  CONSTRAINT `fk_tb_aula_tb_farytale1`
    FOREIGN KEY (`id_farytale`)
    REFERENCES `thetower_db`.`tb_farytale` (`id_farytale`),
  CONSTRAINT `fk_tb_aula_tb_lesson1`
    FOREIGN KEY (`id_lesson`)
    REFERENCES `thetower_db`.`tb_lesson` (`id_lesson`),
  CONSTRAINT `fk_tb_aula_tb_turmas1`
    FOREIGN KEY (`id_turma`)
    REFERENCES `thetower_db`.`tb_turmas` (`id_turma`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_aula_demostrativa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_aula_demostrativa` (
  `id_aula_demostrativa` INT NOT NULL AUTO_INCREMENT,
  `data_aula` DATE NOT NULL,
  `email_aluno` VARCHAR(100) NOT NULL,
  `matriculado` TINYINT NOT NULL DEFAULT '0',
  `nome_aluno` VARCHAR(100) NOT NULL,
  `status` ENUM('Em andamento', 'Desmarcada', 'Finalizada') NOT NULL DEFAULT 'Em andamento',
  `horario` TIME NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`id_aula_demostrativa`),
  UNIQUE INDEX `email_aluno_UNIQUE` (`email_aluno` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_emprestimos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_emprestimos` (
  `id_emprestimo` INT NOT NULL AUTO_INCREMENT,
  `data_emp` DATE NOT NULL,
  `data_dev` DATE NOT NULL,
  `id_aluno` INT NOT NULL,
  `status_devolucao` ENUM('Devolvido', 'Em andamento') NOT NULL,
  `id_livro` INT NOT NULL,
  INDEX `fk_tb_emprestimos_tb_aluno1_idx` (`id_aluno` ASC) VISIBLE,
  INDEX `fk_tb_emprestimos_tb_acervo_livros1_idx` (`id_livro` ASC) VISIBLE,
  PRIMARY KEY (`id_emprestimo`),
  CONSTRAINT `fk_tb_emprestimos_tb_acervo_livros1`
    FOREIGN KEY (`id_livro`)
    REFERENCES `thetower_db`.`tb_acervo_livros` (`id_livro`),
  CONSTRAINT `fk_tb_emprestimos_tb_aluno1`
    FOREIGN KEY (`id_aluno`)
    REFERENCES `thetower_db`.`tb_aluno` (`id_aluno`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_estoque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_estoque` (
  `id_estoque` INT NOT NULL AUTO_INCREMENT,
  `quantidade` INT NOT NULL DEFAULT '0',
  `numero_book` INT NOT NULL,
  PRIMARY KEY (`id_estoque`),
  UNIQUE INDEX `numero_book_UNIQUE` (`numero_book` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_historico_aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_historico_aluno` (
  `id_historico_aluno` INT NOT NULL AUTO_INCREMENT,
  `data_entrada` DATE NOT NULL,
  `data_saida` DATE NOT NULL DEFAULT '9999-01-01',
  `id_aluno` INT NOT NULL,
  `id_turma` INT NOT NULL,
  PRIMARY KEY (`id_historico_aluno`),
  INDEX `fk_tb_historico_aluno_tb_aluno_idx` (`id_aluno` ASC) VISIBLE,
  INDEX `fk_tb_historico_aluno_tb_turmas1_idx` (`id_turma` ASC) VISIBLE,
  CONSTRAINT `fk_tb_historico_aluno_tb_aluno`
    FOREIGN KEY (`id_aluno`)
    REFERENCES `thetower_db`.`tb_aluno` (`id_aluno`),
  CONSTRAINT `fk_tb_historico_aluno_tb_turmas1`
    FOREIGN KEY (`id_turma`)
    REFERENCES `thetower_db`.`tb_turmas` (`id_turma`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_historico_book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_historico_book` (
  `id_historico_book` INT NOT NULL AUTO_INCREMENT,
  `data_inicio` DATE NOT NULL,
  `data_termino` DATE NOT NULL DEFAULT '9999-01-01',
  `id_turma` INT NOT NULL,
  `id_book` INT NOT NULL,
  PRIMARY KEY (`id_historico_book`),
  INDEX `fk_tb_historico_book_tb_turmas1_idx` (`id_turma` ASC) VISIBLE,
  INDEX `fk_tb_historico_book_tb_Books1_idx` (`id_book` ASC) VISIBLE,
  CONSTRAINT `fk_tb_historico_book_tb_Books1`
    FOREIGN KEY (`id_book`)
    REFERENCES `thetower_db`.`tb_books` (`id_book`),
  CONSTRAINT `fk_tb_historico_book_tb_turmas1`
    FOREIGN KEY (`id_turma`)
    REFERENCES `thetower_db`.`tb_turmas` (`id_turma`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_mensalidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_mensalidades` (
  `id_mensalidade` INT NOT NULL AUTO_INCREMENT,
  `tipo` ENUM('Particular', 'Comun') NOT NULL,
  `valor` DECIMAL(12,9) NOT NULL DEFAULT '0.000000000',
  PRIMARY KEY (`id_mensalidade`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_pagamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_pagamentos` (
  `id_pagamentos` INT NOT NULL AUTO_INCREMENT,
  `data_pagamento` DATE NOT NULL,
  `id_aluno` INT NOT NULL,
  `id_mensalidade` INT NOT NULL,
  PRIMARY KEY (`id_pagamentos`),
  INDEX `fk_tb_pagamentos_tb_aluno1_idx` (`id_aluno` ASC) VISIBLE,
  INDEX `fk_tb_pagamentos_tb_mensalidades1_idx` (`id_mensalidade` ASC) VISIBLE,
  CONSTRAINT `fk_tb_pagamentos_tb_aluno1`
    FOREIGN KEY (`id_aluno`)
    REFERENCES `thetower_db`.`tb_aluno` (`id_aluno`),
  CONSTRAINT `fk_tb_pagamentos_tb_mensalidades1`
    FOREIGN KEY (`id_mensalidade`)
    REFERENCES `thetower_db`.`tb_mensalidades` (`id_mensalidade`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `thetower_db`.`tb_presenca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thetower_db`.`tb_presenca` (
  `id_presenca` INT NOT NULL AUTO_INCREMENT,
  `presente` TINYINT NULL DEFAULT '0',
  `data_registro` DATE NOT NULL,
  `id_aluno` INT NOT NULL,
  `id_aula` INT NOT NULL,
  PRIMARY KEY (`id_presenca`),
  UNIQUE INDEX `index_aluno_aula` (`id_aluno` ASC, `id_aula` ASC) VISIBLE,
  INDEX `fk_tb_presenca_tb_aluno1_idx` (`id_aluno` ASC) INVISIBLE,
  INDEX `fk_tb_presenca_tb_aula1_idx` (`id_aula` ASC) VISIBLE,
  CONSTRAINT `fk_tb_presenca_tb_aluno1`
    FOREIGN KEY (`id_aluno`)
    REFERENCES `thetower_db`.`tb_aluno` (`id_aluno`),
  CONSTRAINT `fk_tb_presenca_tb_aula1`
    FOREIGN KEY (`id_aula`)
    REFERENCES `thetower_db`.`tb_aula` (`id_aula`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

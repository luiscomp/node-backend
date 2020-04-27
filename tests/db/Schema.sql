-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema amigo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema amigo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `amigo` DEFAULT CHARACTER SET utf8 ;
USE `amigo` ;

-- -----------------------------------------------------
-- Table `amigo`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amigo`.`Cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `foto` VARCHAR(250) NULL,
  `nome` VARCHAR(250) NOT NULL,
  `telefone` VARCHAR(11) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NULL,
  `dataCadastro` DATE NULL,
  `ultimoAcesso` TIMESTAMP NULL,
  `inativo` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amigo`.`Animal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amigo`.`Animal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `foto` VARCHAR(250) NULL,
  `nome` VARCHAR(150) NOT NULL,
  `especie` VARCHAR(100) NOT NULL,
  `raca` VARCHAR(100) NOT NULL,
  `sexo` ENUM('M', 'F') NOT NULL,
  `idade` INT NOT NULL,
  `dataNascimento` DATE NOT NULL,
  `observacoes` VARCHAR(500) NULL,
  `dataCadastro` DATE NULL,
  `inativo` TINYINT(1) NOT NULL DEFAULT 0,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Animal_Usuario_idx` (`idUsuario` ASC),
  CONSTRAINT `fk_Animal_Usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `amigo`.`Cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amigo`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amigo`.`Empresa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(45) NOT NULL,
  `proprietario` VARCHAR(150) NOT NULL,
  `cpfCnpj` VARCHAR(14) NOT NULL,
  `nomeEmpresarial` VARCHAR(150) NOT NULL,
  `nomeFantasia` VARCHAR(150) NOT NULL,
  `dataCadastro` DATE NULL,
  `inativo` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amigo`.`QrCode`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amigo`.`QrCode` (
  `chave` VARCHAR(10) NOT NULL,
  `status` ENUM('CRIADO', 'HABILITADO', 'ATIVADO', 'DESATIVADO') NOT NULL DEFAULT 'CRIADO',
  `dataGeracao` DATE NULL,
  `dataHabilitacao` DATE NULL,
  `dataAtivacao` DATE NULL,
  `dataDesativacao` DATE NULL,
  `idAnimal` INT NULL,
  `idEmpresa` INT NULL,
  PRIMARY KEY (`chave`),
  INDEX `fk_QrCode_Animal1_idx` (`idAnimal` ASC),
  INDEX `fk_QrCode_Empresa1_idx` (`idEmpresa` ASC),
  CONSTRAINT `fk_QrCode_Animal1`
    FOREIGN KEY (`idAnimal`)
    REFERENCES `amigo`.`Animal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_QrCode_Empresa1`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `amigo`.`Empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amigo`.`Endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amigo`.`Endereco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `endereco` VARCHAR(500) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(8) NULL,
  `complemento` VARCHAR(200) NULL,
  `pontoReferencia` VARCHAR(200) NULL,
  `bairro` VARCHAR(200) NOT NULL,
  `cidade` VARCHAR(200) NOT NULL,
  `estado` VARCHAR(2) NOT NULL,
  `latitude` VARCHAR(45) NULL,
  `longitude` VARCHAR(45) NULL,
  `principal` TINYINT(1) NOT NULL,
  `dataCadastro` DATE NULL,
  `inativo` TINYINT(1) NOT NULL DEFAULT 0,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Endereco_Usuario1_idx` (`idUsuario` ASC),
  CONSTRAINT `fk_Endereco_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `amigo`.`Cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amigo`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amigo`.`Usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `cpfCnpj` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `perfil` ENUM('GESTOR', 'OPERADOR') NOT NULL,
  `dataCadastro` DATE NULL,
  `ultimoAcesso` TIMESTAMP NULL,
  `inativo` TINYINT(1) NOT NULL DEFAULT 0,
  `idEmpresa` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Usuario_Empresa1_idx` (`idEmpresa` ASC),
  CONSTRAINT `fk_Usuario_Empresa1`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `amigo`.`Empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

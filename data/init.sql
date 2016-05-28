CREATE SCHEMA IF NOT EXISTS restful DEFAULT CHARACTER SET utf8 ;
USE restful ;

-- -----------------------------------------------------
-- Table restful.users
-- -----------------------------------------------------
DROP TABLE IF EXISTS restful.users;

CREATE TABLE IF NOT EXISTS restful.users (
  id INT(70) NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  pwd VARCHAR(45) NULL,
  date_created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX email_UNIQUE (email ASC))
ENGINE = InnoDB;
CREATE SCHEMA `exam10` DEFAULT CHARACTER SET utf8;
USE `exam10`;

CREATE TABLE `news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL,
  `image` VARCHAR(100) NULL,
  `datetime` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `news_id` INT NULL,
  `author` VARCHAR(45) NULL DEFAULT 'Anonymous',
  `message` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `news_id` INT NULL,
  `author` VARCHAR(45) NULL DEFAULT 'Anonymous',
  `message` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `news_id_fk_idx` (`news_id` ASC),
  CONSTRAINT `news_id_fk`
    FOREIGN KEY (`news_id`)
    REFERENCES `news` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);


INSERT INTO `news` (`id`, `title`, `description`, `datetime`)
VALUES
    (1, 'Bishkek news', 'This is first place', 20190330),
    (2, 'Naryn news', 'This is second place', 20190330),
    (3, 'Karakol news', 'This is third place', 20190330),
    (4, 'Osh news', 'This is fourth place', 20190330);

INSERT INTO `comments` (`id`, `news_id`, `author`, `message`)
VALUES
    (1, 4, 'Alena Biburashvili', 'This is my first comment'),
    (2, 3, 'Nikita Vasilievich', 'This is my second comment'),
    (3, 2, null, 'This is my fourth comment'),
    (4, 1, 'PAVEL ON SAMYI', 'This is my fives comment');
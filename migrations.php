<?php 

require_once(__DIR__ . "/config.php");
 


$pdo = new PDO(
    "mysql:host=" . DB_HOST .";port=3306;dbname=" . DB_NAME ?? "forum"
,DB_USERNAME,DB_PASSWORD);

$sql = "
CREATE DATABASE IF NOT EXISTS `isxk_rmbi`;

USE `isxk_rmbi`;

CREATE TABLE IF NOT EXISTS cesco_users(
  `ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `passwd` VARCHAR(255) NOT NULL,
  `grade` ENUM('admin', 'moderator', 'user') NOT NULL,
  `profile_picture` varchar(255) DEFAULT 'https://rmbi.ch/cesco/images/example.png',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `cesco_users` (`ID`, `username`, `passwd`, `grade`, `profile_picture`)
VALUES
  (0, 'Example username', 'Example password (hashed)', 'user', 'https://rmbi.ch/cesco/images/example.png');

CREATE TABLE IF NOT EXISTS `cesco_posts` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `content` LONGTEXT NOT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `USER_FK` INT(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `cesco_posts` (`ID`, `content`, `date`, `USER_FK`)
VALUES
  (0, 'Example post', CURRENT_TIMESTAMP, 0);

CREATE TABLE IF NOT EXISTS `cesco_votes` (
  `vote_type` INT(11) NOT NULL,
  `USER_FK` INT(11) NOT NULL,
  `POST_FK` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cesco_reports` (
  `POST_FK` INT(11) NOT NULL,
  `reason` VARCHAR(500) NOT NULL,
  `datetime` DATETIME NOT NULL,
  `count` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cesco_comments` (
  `COMMENT_ID` INT(11) NOT NULL,
  `USER_FK` INT(11) NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `POST_FK` INT(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

";

$statement = $pdo->exec($sql);

if($statement){
    echo "Done";
}else{
    echo "Error";
}

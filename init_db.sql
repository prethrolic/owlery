CREATE USER 'owlery'@'localhost' IDENTIFIED BY 'owlerypw23';
GRANT ALL PRIVILEGES ON *.* TO 'owlery'@'localhost';
CREATE DATABASE IF NOT EXISTS owlery_db;
USE owlery_db;
CREATE TABLE news(
  news_id INT NOT NULL AUTO_INCREMENT,
  content MEDIUMTEXT CHARACTER SET utf8,
  first_seen TIMESTAMP NOT NULL,
  PRIMARY KEY (news_id)
);
CREATE TABLE vote(
  vote_id INT NOT NULL AUTO_INCREMENT,
  vote_type ENUM('real','fake') NOT NULL,
  vote_timestamp TIMESTAMP NOT NULL,
  news_id INT,
  PRIMARY KEY (vote_id),
  FOREIGN KEY (news_id) REFERENCES news(news_id)
);

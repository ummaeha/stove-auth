CREATE SCHEMA authweb;
USE authweb;

CREATE TABLE users ( 
    id INT NOT NULL AUTO_INCREMENT, 
    -- name VARCHAR(32) NOT NULL, 
    email VARCHAR(32) NOT NULL UNIQUE, 
    password VARCHAR(65) NOT NULL, 
    role VARCHAR(32),
    PRIMARY KEY(id)
) DEFAULT CHARSET=utf8, ENGINE=InnoDB;

INSERT INTO authweb.users (email, password, role) VALUES ('raya000@naver.com', '1234', 'admin');
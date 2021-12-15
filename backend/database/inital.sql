CREATE SCHEMA authweb;
USE authweb;

CREATE TABLE users ( 
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(32) NOT NULL, 
    email VARCHAR(32) NOT NULL, 
    password VARCHAR(20) NOT NULL, 
    role VARCHAR(32),
    PRIMARY KEY(id)
) DEFAULT CHARSET=utf8, ENGINE=InnoDB;

INSERT INTO authweb.users (name, email, password, role) VALUES ('Yasmine','raya000@naver.com', '1234', 'admin');
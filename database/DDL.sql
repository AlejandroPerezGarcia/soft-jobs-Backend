-- DROP DATABASE softjobs;
-- DROP TABLE usuarios;

CREATE DATABASE softjobs;

\c softjobs;

CREATE TABLE usuarios (
  id SERIAL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL ,
  rol VARCHAR(25) NOT NULL,
  lenguage VARCHAR(20) NOT NULL, 
  PRIMARY KEY (id)
  );


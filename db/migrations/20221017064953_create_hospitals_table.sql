-- migrate:up

CREATE TABLE hospitals (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(50) NOT NULL
);

-- migrate:down

DROP TABLE hospitals;
-- migrate:up

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  birth DATE NOT NULL,
  contact VARCHAR(50) NOT NULL,
  gender VARCHAR(16) NOT NULL
);

-- migrate:down

DROP TABLE users;
-- migrate:up

CREATE TABLE types (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- migrate:down

DROP TABLE types;
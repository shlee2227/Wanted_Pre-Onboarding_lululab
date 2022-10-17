-- migrate:up

CREATE TABLE reservations (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reservation_number VARCHAR(255) UNIQUE,
  date DATE NOT NULL,
  user_id INT NOT NULL,
  hospital_id INT NOT NULL,
  time_id INT NOT NULL,
  type_id INT NOT NULL,
  has_shown TINYINT DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  FOREIGN KEY (type_id) REFERENCES types (id),
  FOREIGN KEY (time_id) REFERENCES times (id),
  FOREIGN KEY (hospital_id) REFERENCES hospitals (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT hospital_time UNIQUE (date, hospital_id, time_id),
  CONSTRAINT user_time UNIQUE (date, user_id, time_id)
);

-- migrate:down

 DROP TABLE reservations;
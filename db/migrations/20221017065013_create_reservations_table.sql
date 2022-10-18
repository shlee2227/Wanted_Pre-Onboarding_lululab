-- migrate:up

CREATE TABLE reservations (
  reservation_number INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
  date DATE NOT NULL,
  patient VARCHAR(30) NOT NULL,
  hospital_id INT NOT NULL,
  time_id INT NOT NULL,
  type_id INT NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  FOREIGN KEY (type_id) REFERENCES types (id),
  FOREIGN KEY (time_id) REFERENCES times (id),
  FOREIGN KEY (hospital_id) REFERENCES hospitals (id),
  CONSTRAINT hospital_time UNIQUE (date, hospital_id, time_id),
  CONSTRAINT user_time UNIQUE (date, patient, time_id)
);

-- migrate:down

 DROP TABLE reservations;
-- migrate:up

CREATE TABLE no_shows (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reservation_number BIGINT UNSIGNED NOT NULL UNIQUE,
  patient VARCHAR(30) NOT NULL,
  hospital_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  FOREIGN KEY (hospital_id) REFERENCES hospitals (id),
  FOREIGN KEY (reservation_number) REFERENCES reservations (reservation_number),
  CONSTRAINT hospital_user UNIQUE (hospital_id, patient)
);

-- migrate:down

DROP TABLE no_shows
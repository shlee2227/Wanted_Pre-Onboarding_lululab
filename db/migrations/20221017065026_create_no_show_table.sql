-- migrate:up

CREATE TABLE no_show (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT NOT NULL UNIQUE,
  user_id INT NOT NULL,
  hospital_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (hospital_id) REFERENCES hospitals (id),
  FOREIGN KEY (reservation_id) REFERENCES reservations (id),
  CONSTRAINT hospital_user UNIQUE (hospital_id, user_id)
);

-- migrate:down

DROP TABLE no_show
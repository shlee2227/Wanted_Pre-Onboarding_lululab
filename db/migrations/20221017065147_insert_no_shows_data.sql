-- migrate:up

INSERT INTO no_shows (reservation_number, patient, hospital_id)
VALUES (1, 1, 1)

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE no_shows;
SET FOREIGN_KEY_CHECKS = 1;
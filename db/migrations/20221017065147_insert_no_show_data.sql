-- migrate:up

INSERT INTO no_show (reservation_id, user_id, hospital_id)
VALUES (1, 1, 1)

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE no_show;
SET FOREIGN_KEY_CHECKS = 1;
-- migrate:up

INSERT INTO times (time)
VALUES 
("9:00"),
("10:00"),
("11:00"),
("12:00"),
("14:00"),
("15:00"),
("16:00"),
("17:00")

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE times;
SET FOREIGN_KEY_CHECKS = 1;
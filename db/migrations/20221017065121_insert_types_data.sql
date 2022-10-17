-- migrate:up

INSERT INTO types (name)
VALUES ("외래"), ("검진")

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE types;
SET FOREIGN_KEY_CHECKS = 1;
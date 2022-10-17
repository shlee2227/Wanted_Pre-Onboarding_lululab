-- migrate:up

INSERT INTO reservations (reservation_number, date, user_id, hospital_id, time_id, type_id)
VALUES 
(1,"2022-10-17",1,1,3,1),
(2,"2022-10-17",2,1,4,1),
(3,"2022-10-18",2,3,4,1),
(4,"2022-10-24",1,1,3,1),
(5,"2022-10-26",2,2,4,2)

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE reservations;
SET FOREIGN_KEY_CHECKS = 1;
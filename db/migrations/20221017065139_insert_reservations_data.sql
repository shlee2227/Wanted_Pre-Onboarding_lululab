-- migrate:up

INSERT INTO reservations (reservation_number, date, patient, hospital_id, time_id, type_id)
VALUES 
(1,"2022-10-17","이코더",1,3,1),
(2,"2022-10-17","김코드",1,4,1),
(3,"2022-10-18","김코드",3,4,1),
(4,"2022-10-24","이코더",1,3,1),
(5,"2022-10-26","김코드",2,4,2)

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE reservations;
SET FOREIGN_KEY_CHECKS = 1;
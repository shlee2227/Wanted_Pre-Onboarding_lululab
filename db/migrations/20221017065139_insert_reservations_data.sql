-- migrate:up

INSERT INTO reservations (reservation_number, date, patient, hospital_id, time_id, type_id)
VALUES 
(100006536511750145,"2022-10-17","이코더",1,3,1),
(100006536511750146,"2022-10-17","김코드",1,4,1),
(100006536511750147,"2022-10-18","김코드",3,4,1),
(100006536511750148,"2022-10-24","이코더",1,3,1),
(100006536511750149,"2022-10-26","김코드",2,4,2)

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE reservations;
SET FOREIGN_KEY_CHECKS = 1;



-- migrate:up

CREATE VIEW reservation_data AS 
SELECT 
r.reservation_number AS reservation_number,
r.date AS date,
r.patient AS patient,
h.name AS hospital,
h.contact hospital_contact,
time.time AS time, 
type.name AS type,
updated_at AS updated_at, 
created_at AS created_at
FROM reservations AS r
LEFT JOIN hospitals AS h ON r.hospital_id = h.id
LEFT JOIN times AS time ON r.time_id = time.id 
LEFT JOIN types AS type ON r.type_id = type.id

-- migrate:down

DROP VIEW reservation_data;
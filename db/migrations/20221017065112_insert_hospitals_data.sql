-- migrate:up

INSERT INTO hospitals (name, contact)
VALUES 
("김안과의원",	"010-0000-1111"),
("연세세브란스병원",	"010-1111-2222"),
("황금의원",	"010-2222-3333"),
("튼튼치과",	"010-3333-4444"),
("어린이소아과",	"010-4444-5555"),
("서울정형외과의원",	"010-5555-6666")

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE hospitals;
SET FOREIGN_KEY_CHECKS = 1;
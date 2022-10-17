-- migrate:up

INSERT INTO users (name, birth, contact, gender)
VALUES
("김코드",	"1997-08-19",	"010-0000-0000",	"male"),
("이코더",	"1989-10-15",	"010-1111-1111",	"female"),
("박버그",	"1992-04-26",	"010-2222-2222",	"male"),
("송코딩",	"2000-01-01",	"010-3333-3333",	"female"),
("한쿼리",	"2003-01-31",	"010-4444-4444",	"male"),
("강넘버",	"2007-05-30",	"010-5555-5555",	"female")

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE users;
SET FOREIGN_KEY_CHECKS = 1;
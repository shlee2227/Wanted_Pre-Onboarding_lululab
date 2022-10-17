const request = require("supertest");
const { myDataSource } = require("../models/typeorm-client");
const { createApp } = require("../app");

//TEST
describe("USER TEST", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
    await myDataSource.query(`INSERT INTO users (name, birth, contact, gender)
    VALUES
    ("김코드",	"1997-08-19",	"010-0000-0000",	"male"),
    ("이코더",	"1989-10-15",	"010-1111-1111",	"female"),
    ("박버그",	"1992-04-26",	"010-2222-2222",	"male"),
    ("송코딩",	"2000-01-01",	"010-3333-3333",	"female"),
    ("한쿼리",	"2003-01-31",	"010-4444-4444",	"male"),
    ("강넘버",	"2007-05-30",	"010-5555-5555",	"female")`);
    await myDataSource.query(`
    INSERT INTO hospitals (name, contact)
    VALUES 
    ("김안과의원",	"010-0000-1111"),
    ("연세세브란스병원",	"010-1111-2222"),
    ("황금의원",	"010-2222-3333"),
    ("튼튼치과",	"010-3333-4444"),
    ("어린이소아과",	"010-4444-5555"),
    ("서울정형외과의원",	"010-5555-6666")`);
    await myDataSource.query(`
    INSERT INTO types (name) VALUES ("외래"), ("검진")`);
    await myDataSource.query(`
    INSERT INTO times (time) VALUES ("9:00"),("10:00"),("11:00"),("12:00"),("14:00"),("15:00"),("16:00"),("17:00")`);
    await myDataSource.query(`INSERT INTO reservations (reservation_number, date, user_id, hospital_id, time_id, type_id)
    VALUES 
    (1,"2022-10-17",1,1,3,1),
    (2,"2022-10-17",2,1,4,1),
    (3,"2022-10-18",2,3,4,1),
    (4,"2022-10-24",1,1,3,1),
    (5,"2022-10-26",2,2,4,2)`);
    await myDataSource.query(`INSERT INTO no_show (reservation_id, user_id, hospital_id)
    VALUES (1, 1, 1)`);
  });

  afterAll(async () => {
    await myDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await myDataSource.query(`TRUNCATE users;`);
    await myDataSource.query(`TRUNCATE hospitals;`);
    await myDataSource.query(`TRUNCATE types;`);
    await myDataSource.query(`TRUNCATE times;`);
    await myDataSource.query(`TRUNCATE reservations;`);
    await myDataSource.query(`TRUNCATE no_show;`);
    await myDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    await myDataSource.destroy();
  });

  //BASIC TEST
  describe("BASIC TEST", () => {
    test("PINGPONG", async () => {
      await request(app).get("/ping").expect(200).expect({ message: "pong" });
    });
  });

  // CREATE RESERVATION
  // CREATE NOSHOW

  // GET ALL AVALIABLE RESERVATIONS BY DATE
  // GET AVAILABLE RESERVATIONS BY DATE BY HOSPITAL

  // GET RESERVATION BY RESERVATION ID
  // GET RESERVATION BY USER ID

  // UPDATE RESERVATION BY RESERVATION ID

  // CREATE TEST
  // describe("CREATE USER TEST", () => {
  //   beforeAll(async () => {});
  //   afterAll(async () => {});

  //   const makeReservation = async (obj) => {
  //     return await request(app).post("/book").send({ data: obj });
  //   };

  //   test("SUCCESS: SIGN UP", async () => {
  //     const obj = {
  //       name: "test",
  //       birth: "2022-09-21",
  //       height: 158.2,
  //       phone: "010-1234-5678",
  //     };
  //     const res = await signUp(obj);
  //     expect(res.status).toBe(200);
  //     expect(JSON.parse(res.text)).toEqual({ message: "회원 등록 성공" });
  //   });
  // });
});

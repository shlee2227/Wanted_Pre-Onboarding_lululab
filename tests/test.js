const request = require("supertest");
const { myDataSource } = require("../models/typeorm-client");
const { createApp } = require("../app");

//TEST
describe("RESERVATION TEST", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
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
    await myDataSource.query(`INSERT INTO reservations (reservation_number, date, patient, hospital_id, time_id, type_id)
    VALUES 
    (1,"2022-10-17","이코더",1,3,1),
    (2,"2022-10-17","김코드",1,4,1),
    (3,"2022-10-18","김코드",3,4,1),
    (4,"2022-10-24","이코더",1,3,1),
    (5,"2022-10-26","김코드",2,4,2)`);
    await myDataSource.query(`INSERT INTO no_shows (reservation_number, patient, hospital_id)
    VALUES (1, "이코더", 1)`);
  });

  // TRUNCATE
  const truncateAll = async () => {
    await myDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await myDataSource.query(`TRUNCATE hospitals;`);
    await myDataSource.query(`TRUNCATE types;`);
    await myDataSource.query(`TRUNCATE times;`);
    await myDataSource.query(`TRUNCATE reservations;`);
    await myDataSource.query(`TRUNCATE no_shows;`);
    await myDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);
  };

  afterAll(async () => {
    await truncateAll();
    await myDataSource.destroy();
  });

  //BASIC TEST
  describe("BASIC TEST", () => {
    test("PINGPONG", async () => {
      await request(app).get("/ping").expect(200).expect({ message: "pong" });
    });
  });

  // RESERVATION
  // GET RESERVATION BY RESERVATION ID/USER ID
  describe("GET RESERVATION TEST", () => {
    beforeAll(async () => {});
    afterAll(async () => {});

    const getReservationByReservationNumber = async (query) => {
      return await request(app).get(`/book?bookNo=${query}`);
    };

    const getResevationByPatient = async (patient) => {
      const endPoint = `/book?patient=${patient}`;
      const query = encodeURI(endPoint);
      return await request(app).get(query);
    };

    test("SUCCESS: get reservation (reservation number)", async () => {
      const res = await getReservationByReservationNumber(1);
      expect(res.status).toBe(200);
    });

    test("SUCCESS: get reservation (patient)", async () => {
      const res = await getResevationByPatient("김코드");
      expect(res.status).toBe(200);
    });

    test("SUCCESS: no reservation (reservation number)", async () => {
      const res = await getReservationByReservationNumber(99);
      expect(res.status).toBe(204);
    });

    test("SUCCESS: no reservation (patient)", async () => {
      const res = await getResevationByPatient("김코코");
      expect(res.status).toBe(204);
    });
  });

  // CREATE RESERVATION
  describe("CREATE RESERVATION TEST", () => {
    beforeAll(async () => {});
    afterAll(async () => {});

    const createReservation = async (obj) => {
      return await request(app).post("/book/create").send(obj);
    };

    test("SUCCESS: reservation", async () => {
      const obj = {
        date: "2022-10-19",
        patient: "김코드",
        hospital_id: 1,
        time_id: 4,
        type_id: 1,
      };
      const res = await createReservation(obj);
      expect(res.status).toBe(201);
      expect(JSON.parse(res.text)).toEqual({ message: "SUCCESS" });
    });

    test("FAIL: duplicated 1", async () => {
      const obj = {
        date: "2022-10-17",
        patient: "김코드",
        hospital_id: 5,
        time_id: 4,
        type_id: 2,
      };
      const res = await createReservation(obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "DUPLICATED_RESERVATION",
      });
    });

    test("FAIL: duplicated 2", async () => {
      const obj = {
        date: "2022-10-17",
        patient: "박버그",
        hospital_id: 1,
        time_id: 4,
        type_id: 1,
      };
      const res = await createReservation(obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "DUPLICATED_RESERVATION",
      });
    });

    test("FAIL: invalid value", async () => {
      const obj = {
        date: "2022-10-20",
        patient: "박버그",
        hospital_id: 5,
        time_id: 2,
        type_id: 99,
      };
      const res = await createReservation(obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "INVALID_DATA",
      });
    });

    test("FAIL: missing value 1", async () => {
      const obj = {
        date: "2022-10-20",
        hospital_id: "박버그",
        time_id: 2,
        type_id: 1,
      };
      const res = await createReservation(obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "MISSING_VALUE",
      });
    });

    test("FAIL: missing value 2", async () => {
      const obj = {
        patient: "박버그",
        hospital_id: 5,
        time_id: 2,
        type_id: 1,
      };
      const res = await createReservation(obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "MISSING_VALUE",
      });
    });

    test("FAIL: missing value 3", async () => {
      const res = await createReservation();
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "MISSING_VALUE",
      });
    });

    test("FAIL: invalid date 1", async () => {
      const obj = {
        date: "1700-10-17",
        patient: "김코드",
        hospital_id: 1,
        time_id: 4,
        type_id: 1,
      };
      const res = await createReservation(obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "INVALID_DATE",
      });
    });

    test("FAIL: invalid date 2", async () => {
      const obj = {
        date: "2022-10-51",
        patient: "김코드",
        hospital_id: 1,
        time_id: 4,
        type_id: 1,
      };
      const res = await createReservation(obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "INVALID_DATE",
      });
    });

    test("FAIL: no show", async () => {
      const obj = {
        date: "2022-10-22",
        patient: "이코더",
        hospital_id: 1,
        time_id: 4,
        type_id: 1,
      };
      const res = await createReservation(obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "INVAILD_ACCESS_NO_SHOW",
      });
    });
  });

  // CREATE NOSHOW
  describe("CREATE NOSHOW TEST", () => {
    beforeAll(async () => {});
    afterAll(async () => {});

    const createNoShow = async (reservation_number) => {
      return await request(app).post(`/book/noshow/${reservation_number}`);
    };

    test("SUCCESS: create no_shows data", async () => {
      const res = await createNoShow(2);
      expect(res.status).toBe(201);
      expect(JSON.parse(res.text)).toEqual({ message: "SUCCESS" });
    });

    test("FAIL: duplicated", async () => {
      const res = await createNoShow(1);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "DUPLICATED_DATA",
      });
    });

    test("FAIL: no reservation", async () => {
      const res = await createNoShow(99);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "INVALID_DATA",
      });
    });
  });

  // UPDATE RESERVATION BY RESERVATION ID
  describe("UPDATE RESERVATION TEST", () => {
    beforeAll(async () => {
      await myDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
      await myDataSource.query(`TRUNCATE reservations;`);
      await myDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);
      await myDataSource.query(`INSERT INTO reservations (reservation_number, date, patient, hospital_id, time_id, type_id)
      VALUES 
      (1,"2022-10-17","이코더",1,3,1),
      (2,"2022-10-17","김코드",1,4,1),
      (3,"2022-10-18","김코드",3,4,1),
      (4,"2022-10-24","이코더",1,3,1),
      (5,"2022-10-26","김코드",2,4,2)`);
    });
    afterAll(async () => {
      await myDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
      await myDataSource.query(`TRUNCATE reservations;`);
      await myDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);
      await myDataSource.query(`INSERT INTO reservations (reservation_number, date, patient, hospital_id, time_id, type_id)
      VALUES 
      (1,"2022-10-17","이코더",1,3,1),
      (2,"2022-10-17","김코드",1,4,1),
      (3,"2022-10-18","김코드",3,4,1),
      (4,"2022-10-24","이코더",1,3,1),
      (5,"2022-10-26","김코드",2,4,2)`);
    });

    const updateReservation = async (No, obj) => {
      return await request(app).patch(`/book/update/${No}`).send(obj);
    };

    test("SUCCESS: update 1", async () => {
      const obj = {
        patient: "김변경",
      };
      const res = await updateReservation(1, obj);
      expect(res.status).toBe(201);
      expect(JSON.parse(res.text)).toEqual({ message: "SUCCESS" });
    });

    test("SUCCESS: update 2", async () => {
      const obj = {
        date: "2022-10-26",
        patient: "이코더",
        time_id: 5,
        type_id: 1,
      };
      const res = await updateReservation(4, obj);
      expect(res.status).toBe(201);
      expect(JSON.parse(res.text)).toEqual({ message: "SUCCESS" });
    });

    test("FAIL: duplicated", async () => {
      const obj = {
        date: "2022-10-18",
        patient: "김코드",
        time_id: 4,
        type_id: 2,
      };
      const res = await updateReservation(2, obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "DUPLICATED_RESERVATION",
      });
    });

    test("FAIL: invalid date", async () => {
      const obj = {
        date: "1235-10-18",
      };
      const res = await updateReservation(2, obj);
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "INVALID_DATE",
      });
    });
  });

  // VIEW
  // GET ALL AVALIABLE RESERVATIONS BY DATE
  describe("GET AVAILABLE RESERVATION TEST", () => {
    beforeAll(async () => {
      await truncateAll();
      await myDataSource.query(`
      INSERT INTO hospitals (name, contact)
      VALUES 
      ("김안과의원",	"010-0000-1111")`);
      await myDataSource.query(`
      INSERT INTO types (name) VALUES ("외래"), ("검진")`);
      await myDataSource.query(`
      INSERT INTO times (time) VALUES ("9:00"),("10:00"),("11:00")`);
      await myDataSource.query(`INSERT INTO reservations (reservation_number, date, patient, hospital_id, time_id, type_id)
      VALUES 
      (1,"2022-10-17","이코더",1,1,1),
      (2,"2022-10-17","김코드",1,2,1),
      (3,"2022-10-17","김코드",1,3,1)`);
    });
    afterAll(async () => {
      await truncateAll();
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
      await myDataSource.query(`INSERT INTO reservations (reservation_number, date, patient, hospital_id, time_id, type_id)
      VALUES 
      (1,"2022-10-17","이코더",1,3,1),
      (2,"2022-10-17","김코드",1,4,1),
      (3,"2022-10-18","김코드",3,4,1),
      (4,"2022-10-24","이코더",1,3,1),
      (5,"2022-10-26","김코드",2,4,2)`);
      await myDataSource.query(`INSERT INTO no_shows (reservation_number, patient, hospital_id)
      VALUES (1, "이코더", 1)`);
    });

    const getAvailableResevationByDate = async (hospital_id, date) => {
      return await request(app).get(`/view/${hospital_id}?date=${date}`);
    };

    test("SUCCESS: get available reservation ", async () => {
      const res = await getAvailableResevationByDate(1, "2022-10-18");
      expect(res.status).toBe(200);
    });

    test("SUCCESS: no available reservation", async () => {
      const res = await getAvailableResevationByDate(1, "2022-10-17");
      expect(res.status).toBe(200);
    });

    test("FAIL: invalid date", async () => {
      const res = await getAvailableResevationByDate(1, "1700-10-17");
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "INVALID_DATE",
      });
    });

    test("FAIL: invalid hospital", async () => {
      const res = await getAvailableResevationByDate(99, "2022-10-17");
      expect(res.status).toBe(400);
      expect(JSON.parse(res.text)).toEqual({
        message: "INVALID_DATA",
      });
    });
  });
});

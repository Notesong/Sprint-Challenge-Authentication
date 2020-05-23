const supertest = require("supertest");
const server = require("../index");
const db = require("../database/dbconfig");

beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

describe("users integration tests", () => {
  it("POST /api/auth/login", async () => {
    const good_data = { username: "jandoe", password: "me1234" };
    const good_res = await supertest(server).post("/api/auth/login").send(good_data);
    expect(good_res.statusCode).toBe(200);
    expect(good_res.type).toBe("application/json");
    expect(good_res.body.message).toBe("welcome!");

    const bad_data = { username: "janetdoe", password: "me1234" };
    const bad_res = await supertest(server).post("/api/auth/login").send(bad_data);
    expect(bad_res.statusCode).toBe(401);
    expect(bad_res.type).toBe("application/json");
    expect(bad_res.body.message).toBe("invalid credentials");
  });

  it("POST /api/auth/register", async () => {
    const good_data = { username: "jackdoe", password: "password" };
    const good_res = await supertest(server).post("/api/auth/register").send(good_data);
    expect(good_res.statusCode).toBe(201);
    expect(good_res.type).toBe("application/json");
    expect(good_res.body.saved.username).toBe("jackdoe");

    const bad_data = { username: "jackdoe", password: "" };
    const bad_res = await supertest(server).post("/api/auth/register").send(bad_data);
    expect(bad_res.statusCode).toBe(400);
    expect(bad_res.type).toBe("application/json");
    expect(bad_res.body.message).toBe("missing login info");
  });
});

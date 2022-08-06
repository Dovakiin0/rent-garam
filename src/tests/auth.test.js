const { generateToken, hashPassword } = require("../utils/utility");
const supertest = require("supertest");
const db = require("../db");
const server = require("../config");

describe("Authentication", () => {
  afterEach(async () => {
    await db.query("DELETE FROM users");
  });

  it("Should Register User", async () => {
    let user = {
      email: "johndoe@mail.com",
      full_name: "John Doe",
      phone_no: "9876543210",
      password: await hashPassword("password"),
    };
    const res = await supertest(server).post("/api/v1/auth/").send(user);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("Should Login User", async () => {
    let user = {
      email: "johndoe@mail.com",
      full_name: "John Doe",
      phone_no: "9876543210",
      password: await hashPassword("password"),
    };
    const res = await supertest(server).post("/api/v1/auth/login").send(user);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("Should return hashed Password", async () => {
    const password = "password";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
  });

  it("Should generate Token", () => {
    const token = generateToken(1);
    expect(token).toBeDefined();
  });
});

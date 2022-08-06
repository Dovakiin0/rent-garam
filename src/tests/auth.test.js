const { generateToken, hashPassword } = require("../utils/utility");
const supertest = require("supertest");
const db = require("../db");
const server = require("../config");

describe("Unit", () => {
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

describe("Authentication", () => {
  beforeEach(async () => {
    const hashed = await hashPassword("password");
    const { rows } = await db.query(
      "INSERT INTO users (fullname, email, password, phone_no) VALUES ($1, $2, $3, $4)",
      ["hello world", "hello@world.com", hashed, "92838"]
    );
  });

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
    let cred = {
      email: "hello@world.com",
      password: "password",
    };
    const res = await supertest(server).post("/api/v1/auth/login").send(cred);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

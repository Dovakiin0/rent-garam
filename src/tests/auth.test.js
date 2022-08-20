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
  let token;
  beforeEach(async () => {
    const hashed = await hashPassword("password");
    const { rows } = await db.query(
      "INSERT INTO users (fullname, email, password, phone_no, role) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      ["hello world", "hello@world.com", hashed, "92838", "user"]
    );
    token = generateToken(rows[0].id);
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
      role: "user",
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

  it("Should return current logged user", async () => {
    const res = await supertest(server)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
  });
});

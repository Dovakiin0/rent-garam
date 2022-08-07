const supertest = require("supertest");
const db = require("../db");
const server = require("../config");
const path = require("path");

describe("Real Estate", () => {
  let user_id;
  let id;
  beforeEach(async () => {
    const { rows } = await db.query(
      "INSERT INTO users (fullname, email, password, phone_no) VALUES ($1, $2, $3, $4) RETURNING id",
      ["test", "email@mail.com", "pass", "92838"]
    );
    user_id = rows[0].id;
    const estate = {
      name: "Estate 1",
      image_url: "image.com",
      description: "THIS is good house",
      price: 100000,
      owner_id: rows[0].id,
      latitude: 79.99,
      longitude: 79.99,
    };

    const { rows: estateRow } = await db.query(
      "INSERT INTO estate (name, image_url, description, latitude, longitude, price, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      [
        estate.name,
        estate.image_url,
        estate.description,
        estate.latitude,
        estate.longitude,
        estate.price,
        estate.owner_id,
      ]
    );

    id = estateRow[0].id;
  });

  afterAll(async () => {
    await db.query("DELETE FROM estate");
    await db.query("DELETE FROM users");
  });

  it("Should get all estates", async () => {
    const res = await supertest(server).get("/api/v1/estate");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it("Should get one estate", async () => {
    const res = await supertest(server).get("/api/v1/estate/" + id);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
  });

  it("Should add new estate", async () => {
    const image = path.resolve(__dirname, "2.jpg");
    const estate = {
      name: "Estate 2",
      description: "THIS is good house",
      latitude: 79.99,
      longitude: 79.99,
      price: 100000,
      owner_id: user_id,
    };

    const res = await supertest(server)
      .post("/api/v1/estate/add")
      .attach("image", image)
      .field("name", estate.name)
      .field("price", estate.price)
      .field("owner_id", estate.owner_id)
      .field("description", estate.description)
      .field("latitude", estate.latitude)
      .field("longitude", estate.longitude);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("name");
  });

  it("Should edit estate", async () => {
    const estate = {
      name: "Estate updated",
      image_url: "url.com",
      price: 100000,
      owner_id: user_id,
    };

    const res = await supertest(server)
      .put("/api/v1/estate/" + id)
      .send(estate);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
  });
  it("Should delete estate", async () => {
    const res = await supertest(server).delete("/api/v1/estate/" + id);
    expect(res.status).toBe(200);
  });
});

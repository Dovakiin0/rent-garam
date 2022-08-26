const supertest = require("supertest");
const db = require("../db");
const server = require("../config");

describe("Favourite Real Estate", () => {
  let user_id;
  let estate_id;
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
      address: "New Baneshwor",
      type: "For Rent",
      price: 100000,
      owner_id: user_id,
      latitude: 79.99,
      bedroom: 5,
      washroom: 2,
      longitude: 79.99,
    };

    const { rows: estateRow } = await db.query(
      "INSERT INTO estate (name, image_url, description, address,bedroom,washroom, latitude, longitude, price, owner_id, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id",
      [
        estate.name,
        estate.image_url,
        estate.description,
        estate.address,
        estate.bedroom,
        estate.washroom,
        estate.latitude,
        estate.longitude,
        estate.price,
        estate.owner_id,
        estate.type,
      ]
    );
    estate_id = estateRow[0].id;

    const { rows: favouriteRow } = await db.query(
      "INSERT INTO favourite (user_id, estate_id) VALUES ($1, $2) RETURNING id",
      [user_id, estate_id]
    );
    id = favouriteRow[0].id;
  });

  afterEach(async () => {
    await db.query("DELETE FROM favourite");
    await db.query("DELETE FROM estate");
    await db.query("DELETE FROM users");
  });

  it("should add favourite", async () => {
    const res = await supertest(server).post("/api/v1/favourite").send({
      user_id,
      estate_id,
    });
    expect(res.status).toBe(201);
  });

  it("should get favourite", async () => {
    const res = await supertest(server).get("/api/v1/favourite/" + user_id);
    expect(res.status).toBe(200);
  });

  it("should delete favourite", async () => {
    const res = await supertest(server).delete("/api/v1/favourite/" + id);
    expect(res.status).toBe(200);
  });
});

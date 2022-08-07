const db = require("../db");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "../../storage/");

const addNew = async (req, res) => {
  const image = req.files.image;
  const dir = UPLOAD_DIR + image.name;
  image.mv(dir, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });
  const { name, price, owner_id, description, latitude, longitude } = req.body;
  const { rows } = await db.query(
    "INSERT INTO estate (name, image_url, description, latitude, longitude, price, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [name, image.name, description, latitude, longitude, price, owner_id]
  );
  if (rows.length > 0) {
    return res.status(201).json(rows[0]);
  }
  return res.status(400).json({
    message: "Invalid Data",
  });
};

const getAll = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM estate");
  if (rows.length > 0) {
    return res.status(200).json(rows);
  }
  return res.status(404).json({
    message: "No estates found",
  });
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT * FROM estate WHERE id = $1", [id]);
  if (rows.length > 0) {
    return res.status(200).json(rows[0]);
  }
  return res.status(404).json({
    message: "No estate found",
  });
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { name, image_url, price, description, latitude, longitude } = req.body;
  const { rows } = await db.query(
    "UPDATE estate SET name = $1, image_url = $2, price = $3, description = $4, latitude = $5, longitude = $6 WHERE id = $7 RETURNING *",
    [name, image_url, price, description, latitude, longitude, id]
  );
  if (rows.length > 0) {
    return res.status(200).json(rows[0]);
  }
  return res.status(404).json({
    message: "No estate found",
  });
};

const del = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    "DELETE FROM estate WHERE id = $1 RETURNING *",
    [id]
  );
  if (rows.length > 0) {
    return res.status(200).json(rows[0]);
  }
  return res.status(404).json({
    message: "No estate found",
  });
};

module.exports = {
  addNew,
  getAll,
  getOne,
  edit,
  del,
};

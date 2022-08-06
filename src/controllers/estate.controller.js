const db = require("../db");

const addNew = async (req, res) => {
  const { name, image_url, price, owner_id } = req.body;
  const { rows } = await db.query(
    "INSERT INTO estate (name, image_url, price, owner_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, image_url, price, owner_id]
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
  const { name, image_url, price, owner_id } = req.body;
  const { rows } = await db.query(
    "UPDATE estate SET name = $1, image_url = $2, price = $3, owner_id = $4 WHERE id = $5 RETURNING *",
    [name, image_url, price, owner_id, id]
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

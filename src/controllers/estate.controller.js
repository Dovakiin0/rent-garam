const db = require("../db");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "../../storage/");

/**
 * Adds new estate listing
 */
const addNew = async (req, res) => {
  const image = req.files.image;
  const dir = UPLOAD_DIR + image.name;
  image.mv(dir, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  const {
    name,
    price,
    owner_id,
    description,
    address,
    latitude,
    longitude,
    bedroom,
    washroom,
  } = req.body;
  const { rows } = await db.query(
    "INSERT INTO estate (name, image_url, description,address,bedroom,washroom, latitude, longitude, price, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
    [
      name,
      image.name,
      description,
      address,
      bedroom,
      washroom,
      latitude,
      longitude,
      price,
      owner_id,
    ]
  );
  if (rows.length > 0) {
    return res.status(201).json(rows[0]);
  }
  return res.status(400).json({
    message: "Invalid Data",
  });
};

/**
 * Get All estate listing
 */
const getAll = async (req, res) => {
  const { rows } = await db.query(
    "SELECT * FROM estate LEFT JOIN users ON estate.owner_id = users.id"
  );
  if (rows.length > 0) {
    return res.status(200).json(rows);
  }
  return res.status(404).json({
    message: "No estates found",
  });
};

const getMyEstates = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM estate WHERE owner_id = $1", [
    req.params.id,
  ]);
  if (rows.length > 0) {
    return res.status(200).json(rows);
  }
  return res.status(404).json({
    message: "No estates found",
  });
};

/**
 * Get one estate listing with id
 */
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

/**
 * Edit and existing estate listing
 */
const edit = async (req, res) => {
  const { rows: estateRow } = await db.query(
    "SELECT image_url FROM estate WHERE id = $1",
    [req.params.id]
  );
  let image_url = estateRow[0].image_url;
  console.log(req.files);
  if (typeof req.files !== "undefined" && req.files !== null) {
    const image = req.files.image;
    const dir = UPLOAD_DIR + image.name;
    image.mv(dir, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      image_url = image.name;
    });
  }
  const { id } = req.params;
  const {
    name,
    price,
    description,
    latitude,
    longitude,
    bedroom,
    washroom,
    address,
  } = req.body;
  const { rows } = await db.query(
    "UPDATE estate SET name = $1, image_url = $2, price = $3, description = $4, latitude = $5, longitude = $6, bedroom = $7, washroom = $8, address = $9 WHERE id = $10 RETURNING *",
    [
      name,
      image_url,
      price,
      description,
      latitude,
      longitude,
      bedroom,
      washroom,
      address,
      id,
    ]
  );
  if (rows.length > 0) {
    return res.status(200).json(rows[0]);
  }
  return res.status(404).json({
    message: "No estate found",
  });
};

/**
 * Delete an existing estate listing
 */
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
  getMyEstates,
};

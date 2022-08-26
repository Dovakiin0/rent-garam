const db = require("../db");

const getAllFavorite = async (req, res) => {
  const { rows } = await db.query(
    "SELECT estate.id as id, favourite.id as favourite_id, name, image_url, description,address,bedroom,washroom, latitude, longitude, price, owner_id, type, sold, estate.createdAt FROM favourite INNER JOIN estate ON favourite.estate_id = estate.id WHERE favourite.user_id = $1",
    [req.params.id]
  );
  if (rows.length > 0) {
    return res.status(200).json(rows);
  }
  return res.status(404).json({
    message: "Favourites Not Found",
  });
};

const addFavourite = async (req, res) => {
  const { rows } = await db.query(
    "INSERT INTO favourite (user_id, estate_id) VALUES ($1, $2) RETURNING *",
    [req.body.user_id, req.body.estate_id]
  );
  if (rows.length > 0) {
    return res.status(201).json(rows[0]);
  }
  return res.status(400).json({
    message: "Invalid Data",
  });
};

const deleteFavourite = async (req, res) => {
  const { rows } = await db.query(
    "DELETE FROM favourite WHERE id = $1 RETURNING *",
    [req.params.id]
  );
  if (rows.length > 0) {
    return res.status(200).json(rows[0]);
  }
  return res.status(400).json({
    message: "Invalid Data",
  });
};

module.exports = {
  getAllFavorite,
  addFavourite,
  deleteFavourite,
};

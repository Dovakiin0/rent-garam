const router = require("express").Router();

const {
  getAllFavorite,
  addFavourite,
  deleteFavourite,
} = require("../controllers/favourite.controller");

router.get("/:id", getAllFavorite);
router.post("/", addFavourite);
router.delete("/:id", deleteFavourite);

module.exports = router;

const Router = require("express-promise-router");

const router = new Router();

const {
  getOne,
  addNew,
  edit,
  del,
  getAll,
  getMyEstates,
} = require("../controllers/estate.controller");

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/my/:id", getMyEstates);
router.post("/add", addNew);
router.put("/:id", edit);
router.delete("/:id", del);

module.exports = router;

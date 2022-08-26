const Router = require("express-promise-router");

const router = new Router();

const {
  getOne,
  addNew,
  edit,
  del,
  getAll,
  getMyEstates,
  getEstateQuery,
} = require("../controllers/estate.controller");

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/my/:id", getMyEstates);
router.get("/all/e/query", getEstateQuery);
router.post("/add", addNew);
router.put("/:id", edit);
router.delete("/:id", del);

module.exports = router;

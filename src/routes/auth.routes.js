const Router = require("express-promise-router");

const router = new Router();

const {
  registerUser,
  loginUser,
  getMe,
  changePassword,
  getUser,
} = require("../controllers/auth.controller");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/change", changePassword);
router.post("/get", getUser);
router.get("/me", getMe);

module.exports = router;

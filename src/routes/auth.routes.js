const Router = require("express-promise-router");

const router = new Router();

const {
  registerUser,
  loginUser,
  ok,
} = require("../controllers/auth.controller");

router.post("/", registerUser);
router.post("/ok", ok);
router.post("/login", loginUser);

module.exports = router;

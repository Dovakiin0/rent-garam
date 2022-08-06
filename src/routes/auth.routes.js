const Router = require("express-promise-router");

const router = new Router();

const { registerUser, loginUser } = require("../controllers/auth.controller");

router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;

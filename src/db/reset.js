const db = require("./index");

async function Reset() {
  const { rows } = await db.query("DROP TABLE IF EXISTS users, estate");
}

Reset()
  .then((res) => console.log("Reset"))
  .catch((err) => console.log(err));

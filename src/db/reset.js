const db = require("./index");

async function Reset() {
  const { rows } = await db.query(
    "DROP TABLE IF EXISTS favourite, estate, users"
  );
}

Reset()
  .then((res) => console.log("Reset"))
  .catch((err) => console.log(err));

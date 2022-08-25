const db = require("./index");
const { hashPassword } = require("../utils/utility");

async function seed() {
  const password = await hashPassword("admin");

  const user = {
    fullname: "Admin",
    email: "admin@admin.com",
    phone_no: "0712345678",
    password: password,
    role: "admin",
  };

  const { rows } = await db.query(
    "INSERT INTO users (fullname, email, password, phone_no, role) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [user.fullname, user.email, user.password, user.phone_no, user.role]
  );

  return rows[0];
}

seed()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

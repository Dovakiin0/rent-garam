import { check_logged_in, log_out } from "./auth.js";

let { logged_in, me } = await check_logged_in();
var header_prop = document.querySelector(".nav-right");
if (!logged_in) {
  header_prop.innerHTML = `<a href="login.html" class="btn">Log In</a>
  <a href="sign-up.html" class="btn">Sign Up</a>`;
} else {
  header_prop.innerHTML = `
  <div class="dropdown">
  <div class="cont">
  <i class="ico bx bx-user"></i>
  <p>${me.fullname}</p>
  </div>
  <div class="dropdown-content">
  <a href="upload.html">Create Listing</a>
  <br>
  <a href="#">My Listings</a>
  <br>
  <a href="#" id="logout">Log Out</a>
  </div>
  </div>
  `;

  document.getElementById("logout").addEventListener("click", async () => {
    log_out();
  });
}

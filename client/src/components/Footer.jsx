import React from "react";

function Footer() {
  return (
    <section class="footer">
      <div class="footer-container">
        <div class="box-container">
          <div class="box">
            <h3>quick links</h3>
            <a href="#">home</a>
            <a href="#">services</a>
            <a href="#">featured</a>
            <a href="#">agents</a>
            <a href="#">contact</a>
          </div>

          <div class="box">
            <h3>extra links</h3>
            <a href="#">my account</a>
            <a href="#">my favorite</a>
            <a href="#">my list</a>
          </div>

          <div class="box">
            <h3>follow us</h3>
            <a href="#">facebook</a>
            <a href="#">twitter</a>
            <a href="#">instagram</a>
            <a href="#">linkedin</a>
          </div>
        </div>

        <div class="credit">
          Copyright &copy; 2022 <span> Rent Garam </span> | all rights reserved!
        </div>
      </div>
    </section>
  );
}

export default Footer;

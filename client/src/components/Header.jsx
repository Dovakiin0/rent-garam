import React from "react";
import UserMenu from "./UserMenu";

function Header() {
  return (
    <>
      <header className="flex justify-around h-20 items-center shadow-lg sticky top-0 z-50 bg-white">
        <a href="#" className="text-2xl">
          <span className="text-primary">Rent</span>Garam
        </a>

        <nav className="space-x-10 uppercase">
          <a href="#home">home</a>
          <a href="#services">services</a>
          <a href="#featured">featured</a>
          <a href="#contact">contact</a>
        </nav>
        <UserMenu />
      </header>
    </>
  );
}

export default Header;

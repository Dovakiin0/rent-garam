import React, { useState } from "react";
import UserMenu from "./UserMenu";
import { Burger } from "@mantine/core";
import { Link } from "react-router-dom";

function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const title = burgerOpen ? "Close navigation" : "Open navigation";
  return (
    <>
      <header className="flex justify-around h-20 items-center shadow-lg sticky top-0 z-50 bg-white">
        <a href="/" className="text-2xl">
          <span className="text-primary">Rent</span>Garam
        </a>

        <nav className="hidden md:flex space-x-10 uppercase">
          <a href="/#home">home</a>
          <a href="/#services">services</a>
          <a href="/#featured">featured</a>
          <a href="/#contact">contact</a>
        </nav>
        <nav className="block md:hidden">
          <Burger
            opened={burgerOpen}
            title={title}
            onClick={() => setBurgerOpen((o) => !o)}
          />
        </nav>
        <UserMenu />
      </header>
    </>
  );
}

export default Header;

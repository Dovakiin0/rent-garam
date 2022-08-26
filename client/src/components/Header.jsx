import React, { useState } from "react";
import UserMenu from "./UserMenu";
import { Burger } from "@mantine/core";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const title = burgerOpen ? "Close navigation" : "Open navigation";

  return (
    <>
      <SideBar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        closeBurger={setBurgerOpen}
      />
      <header className="flex justify-around h-20 items-center shadow-lg sticky top-0 z-50 bg-white">
        <a href="/" className="text-2xl">
          <span className="text-primary">Rent</span>Garam
        </a>

        <nav className="hidden md:flex space-x-10 uppercase">
          <a href="/#home" className="hover:text-primary">
            Home
          </a>
          <a href="/#services" className="hover:text-primary">
            Services
          </a>
          <a href="/#featured" className="hover:text-primary">
            Featured
          </a>
          <a href="/#contact" className="hover:text-primary">
            Contact
          </a>
        </nav>
        <nav className="block md:hidden">
          <Burger
            opened={burgerOpen}
            title={title}
            onClick={() => {
              setBurgerOpen((o) => !o);
              setSidebarOpen(true);
            }}
          />
        </nav>
        <UserMenu />
      </header>
    </>
  );
}

export default Header;

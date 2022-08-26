import React from "react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mantine/core";

function SideBar({ open, setOpen, closeBurger }) {
  return (
    <>
      <Drawer
        opened={open}
        onClose={() => {
          setOpen(false);
          closeBurger(false);
        }}
        title="Navigations"
        padding="xl"
        size="sm"
      >
        <nav className="flex flex-col space-y-5 mt-10">
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
      </Drawer>
    </>
  );
}

export default SideBar;

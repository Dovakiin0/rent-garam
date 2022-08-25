import React, { useState } from "react";
import { AppShell, Navbar, Header, Footer } from "@mantine/core";
import UserMenu from "../components/UserMenu";
import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  const [active, setActive] = useState(0);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} className="flex flex-col justify-between">
          <div className="flex flex-col space-y-2">
            <p className="text-xl bold m-5">Admin Dashboard</p>
            <Link to="/dashboard/all-listing">
              <div
                className={`${
                  active === 0 ? "bg-primary text-light" : ""
                } p-2 rounded-sm cursor-pointer`}
                onClick={() => setActive(0)}
              >
                <p className="ml-5">All Listings</p>
              </div>
            </Link>
            <Link to="/dashboard/create-listing">
              <div
                className={`${
                  active === 1 ? "bg-primary text-light" : ""
                } p-2 rounded-sm cursor-pointer`}
                onClick={() => setActive(1)}
              >
                <p className="ml-5">Create Listing</p>
              </div>
            </Link>
            <Link to="/dashboard/favourite-listing">
              <div
                className={`${
                  active === 2 ? "bg-primary text-light" : ""
                } p-2 rounded-sm cursor-pointer`}
                onClick={() => setActive(2)}
              >
                <p className="ml-5">Favourite Listings</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/">
              <button className="w-full bg-primary text-light h-10 rounded-sm">
                Exit Dashboard
              </button>
            </Link>
          </div>
        </Navbar>
      }
      header={
        <Header height={60} p="sm">
          <div className="flex justify-between items-center">
            <a href="/" className="text-2xl ml-5">
              <span className="text-primary">Rent</span>Garam
            </a>
            <div className="mr-5">
              <UserMenu />
            </div>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[2],
        },
      })}
    >
      <div className="p-5">
        <Outlet />
      </div>
    </AppShell>
  );
}

export default AdminDashboard;

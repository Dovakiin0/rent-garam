import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaUser } from "react-icons/fa";
import { Menu } from "@mantine/core";

function UserMenu() {
  const auth = useAuth();

  return auth?.currentUser ? (
    <div className="flex space-x-5">
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <p className="cursor-pointer">
            <FaUser className="text-primary text-2xl active:text-secondary" />
          </p>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Logged in as: {auth?.currentUser.fullname}</Menu.Label>
          <Link to="/dashboard">
            <Menu.Item>My Dashboard</Menu.Item>
          </Link>
          {/* <Menu.Item>Account Settings</Menu.Item> */}
          <Menu.Item
            onClick={() => {
              auth.logout();
              window.location.reload();
            }}
          >
            Log Out
          </Menu.Item>
          <Menu.Divider />
        </Menu.Dropdown>
      </Menu>
    </div>
  ) : (
    <div className="flex space-x-5 items-center">
      <Link to="/login">
        <button className="bg-primary p-2 rounded-md text-white w-[80px]">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="bg-light text-secondary w-[80px]">SignUp</button>
      </Link>
    </div>
  );
}

export default UserMenu;

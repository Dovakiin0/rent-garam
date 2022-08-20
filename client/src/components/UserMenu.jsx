import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaUser } from "react-icons/fa";

function UserMenu({ className }) {
  const [open, setOpen] = useState(true);
  const auth = useAuth();
  return auth?.currentUser ? (
    <div className="flex space-x-5">
      <p className="cursor-pointer">
        <FaHeart className="text-primary text-2xl active:text-secondary" />
      </p>
      <p className="cursor-pointer">
        <FaUser className="text-primary text-2xl active:text-secondary" />
      </p>
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

import { Button, PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth?.currentUser !== null) {
      navigate("/");
    }
  }, [auth?.currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        form
      );
      if (status === 200) {
        localStorage.setItem("token", JSON.stringify(data.token));
        window.location.reload();
        navigate("/");
      }
    } catch (err) {
      setError("Username or Password does not match");
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#efefef] min-h-screen flex flex-col items-center justify-center">
      <div
        className="
        flex flex-col
        bg-white
        shadow-md
        px-4
        sm:px-6
        md:px-8
        lg:px-10
        py-8
        rounded-3xl
        w-50
        max-w-md
      "
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Log In
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div>

        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              required
              type="email"
              placeholder="Enter your email"
              name="email"
              className="mb-5"
              onChange={handleChange}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              required
              className="mb-5"
              name="password"
              onChange={handleChange}
              error={error}
            />
            <Button className="mt-10" color={"red"} fullWidth type="submit">
              Submit
            </Button>
          </form>
          <Link to="/forgot">
            <p className="text-xs text-center ml-2 text-primary font-semibold mt-2">
              Forgot Password?
            </p>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          className="
          inline-flex
          items-center
          text-gray-700
          font-medium
          text-xs text-center
        "
        >
          <span className="ml-2">
            Don't have an Account?
            <Link to="/register">
              <p className="text-xs ml-2 text-primary font-semibold">
                Register here
              </p>
            </Link>
          </span>
        </a>
      </div>
    </div>
  );
}

export default Login;

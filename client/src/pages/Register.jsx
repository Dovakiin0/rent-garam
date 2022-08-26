import React, { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone_no: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setError("Passwords do not match");
      return;
    }
    delete form.password2;
    setError("");
    try {
      const { data, status } = await axios.post(
        "http://localhost:3000/api/v1/auth/",
        form
      );
      if (status === 201) {
        localStorage.setItem("token", JSON.stringify(data.token));
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (auth?.currentUser !== null) {
      navigate("/");
    }
  }, [auth]);

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
          Join us Now
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to create new account
        </div>

        <div className="mt-10">
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextInput
              label="Full Name"
              required
              placeholder="Enter your full name"
              name="fullname"
              className="mb-5"
              onChange={(e) => handleChange(e)}
            />
            <TextInput
              label="Email"
              type={"email"}
              name="email"
              required
              placeholder="Enter your email"
              className="mb-5"
              onChange={(e) => handleChange(e)}
            />
            <TextInput
              label="Phone Number"
              type={"text"}
              name="phone_no"
              required
              placeholder="Enter your phone number"
              className="mb-5"
              onChange={(e) => handleChange(e)}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              required
              className="mb-5"
              onChange={(e) => handleChange(e)}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Enter your password again"
              name="password2"
              required
              className="mb-5"
              error={error}
              onChange={(e) => handleChange(e)}
            />
            <Button className="mt-10" color={"red"} fullWidth type="submit">
              Submit
            </Button>
          </form>
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
            You have an account?
            <Link to="/login">
              <p className="text-xs ml-2 text-primary font-semibold">
                Login here
              </p>
            </Link>
          </span>
        </a>
      </div>
    </div>
  );
}

export default Register;

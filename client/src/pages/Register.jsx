import React from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div class="bg-[#efefef] min-h-screen flex flex-col items-center justify-center">
      <div
        class="
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
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Join us Now
        </div>
        <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to create new account
        </div>

        <div class="mt-10">
          <form action="#">
            <form action="#">
              <TextInput
                label="Full Name"
                required
                placeholder="Enter your full name"
                className="mb-5"
              />
              <TextInput
                label="Email"
                required
                placeholder="Enter your email"
                className="mb-5"
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                required
                className="mb-5"
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Enter your password again"
                required
                className="mb-5"
              />
              <Button className="mt-10" color={"red"} fullWidth>
                Submit
              </Button>
            </form>
          </form>
        </div>
      </div>
      <div class="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          class="
          inline-flex
          items-center
          text-gray-700
          font-medium
          text-xs text-center
        "
        >
          <span class="ml-2">
            You have an account?
            <Link to="/login">
              <p class="text-xs ml-2 text-primary font-semibold">Login here</p>
            </Link>
          </span>
        </a>
      </div>
    </div>
  );
}

export default Register;

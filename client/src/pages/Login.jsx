import { Button, PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
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
          Log In
        </div>
        <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div>

        <div class="mt-10">
          <form action="#">
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
            <Button className="mt-10" color={"red"} fullWidth>
              Submit
            </Button>
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
            Don't have an Account?
            <Link to="/register">
              <p class="text-xs ml-2 text-primary font-semibold">
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

import React from "react";
import { TextInput, Button, PasswordInput } from "@mantine/core";
import axios from "axios";
import { SuccessNotification } from "../components/Notifications";
import { useNavigate } from "react-router-dom";

function Forgot() {
  const [email, setEmail] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [cred, setCred] = React.useState({
    password: "",
    password1: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        "http://localhost:3000/api/v1/auth/get",
        { email }
      );
      if (status === 200) {
        setUser(data.user);
        setError("");
      }
    } catch (err) {
      console.log(err);
      setError("User does not exist");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (cred.password !== cred.password1) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data, status } = await axios.post(
        "http://localhost:3000/api/v1/auth/change",
        { password: cred.password, id: user.id }
      );
      if (status === 200) {
        SuccessNotification({ message: "Password changed successfully" });
        navigate("/login");
        setError("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
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
          Forgot Password
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div>

        <div className="mt-10">
          {user ? (
            <form onSubmit={handlePasswordChange}>
              <TextInput
                label="Email"
                disabled
                type="email"
                value={user?.email}
                name="email"
                className="mb-5"
              />
              <PasswordInput
                label="Password"
                placeholder="Enter new password"
                required
                className="mb-5"
                name="password"
                onChange={handleChange}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Enter your password again"
                required
                className="mb-5"
                name="password1"
                onChange={handleChange}
                error={error}
              />
              <Button className="mt-10" color={"red"} fullWidth type="submit">
                Submit
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Email"
                required
                type="email"
                placeholder="Enter your email"
                name="email"
                className="mb-5"
                onChange={(e) => setEmail(e.target.value)}
                error={error}
              />
              <Button className="mt-10" color={"red"} fullWidth type="submit">
                Submit
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forgot;

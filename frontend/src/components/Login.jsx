import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../slices/userSlice";
import { setToken } from "../utils/tokenUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      setToken(token);
      dispatch(setUser(user));
      navigate("/");
      alert("Logged in successfully");
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <div className=" container">
      <div className="card">
        <div className="header">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-column">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input"
          />
          <button type="submit" className="button button-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

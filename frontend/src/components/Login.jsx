import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userSlice, { setUser } from "../slices/userSlice";
import { isTokenExpired, setToken } from "../utils/tokenUtils";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

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

  useEffect(() => {
    if (!isTokenExpired() && user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="main container">
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
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

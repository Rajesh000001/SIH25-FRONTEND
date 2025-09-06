import React, { useState } from "react";
import { Link } from "react-router-dom";
import train from "../assets/train-background.png";
import "./login.css";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test({ username })) {
      localStorage.setItem("email", email);
    } else {
      localStorage.setItem("username", username);
    }

    localStorage.setItem("password", password);

    let isValid = true;

    setUserError("");
    setPasswordError("");

    if (!username.trim()) {
      setUserError("*Username required");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("*Password required");
      isValid = false;
    }

    if (isValid) {
      console.log("username: ", username);
      console.log("password: ", password);
    }
  };

  return (
    <div className="loginPage">
      <div id="container">
        <div id="loginbox">
          <div id="login">Login</div>
          <form onSubmit={handleSubmit}>
            <div id="inputbox">
              <div className="input">
                <i className="fa-solid fa-circle-user"></i>
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {userError && <p className="error-message">{userError}</p>}
              <div className="input">
                <i className="fa-solid fa-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
            </div>
            <div className="submit">
              <div className="submitbox">
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
          <div className="bottom-loginPage">
            <div id="forget-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <div id="signup">
              Don't have an account?<Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
        <div id="pic">
          <img src={train} alt="Train" />
        </div>
      </div>
    </div>
  );
}

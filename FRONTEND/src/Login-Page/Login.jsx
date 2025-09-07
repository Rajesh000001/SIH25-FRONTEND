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
  const [role, setRole] = useState("Operator");

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    setUserError("");
    setPasswordError("");

    if (!username.trim()) {
      setUserError("*Username or Email required");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("*Password required");
      isValid = false;
    }

    if (!isValid) return;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(username)) {
      localStorage.setItem("email", username);
    } else {
      localStorage.setItem("username", username);
    }

    localStorage.setItem("password", password);
    localStorage.setItem("role", role);

    console.log("Login success:", { username, password, role });
  };

  return (
    <div className="loginPage">
      <div id="container">
        <div id="loginbox">
          {/* Role Selection */}
          <div className="roles">
            {["Admin", "Operator", "Judge"].map((r) => (
              <button
                key={r}
                className={`role ${role === r ? "active-role" : ""}`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div id="login">Login</div>

          {/* Form */}
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
                <button type="submit">Login as {role}</button>
              </div>
            </div>
          </form>

          {/* Bottom Links */}
          <div className="bottom-loginPage">
            <div id="forget-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <div id="signup">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>

        {/* Side Image */}
        <div id="pic">
          <img src={train} alt="Train" />
        </div>
      </div>
    </div>
  );
}

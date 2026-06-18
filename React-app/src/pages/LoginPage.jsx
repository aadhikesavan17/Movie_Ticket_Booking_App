/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [name,setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const dummyUser = {
      name: name,
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(dummyUser));
    navigate("/movies");
  };

  return (
    <div className="login-container">


      <div className="icon-background">
        <div className="icon icon1">🎬</div>
        <div className="icon icon2">🍿</div>
        <div className="icon icon3">🎶</div>
        <div className="icon icon4">🍕</div>
      </div>
      
      <form className="login-form" onSubmit={handleLogin}>
        <h2>🎟️ Movie Ticket Login</h2>

         <label>Name</label>
         <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage; */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const BASE_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   const url = isRegister
    ? `${BASE_URL}/auth/register`
    : `${BASE_URL}/auth/login`;
    
    const body = isRegister
      ? { name, email, password }
      : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.token) {
        // Save token + user info exactly like before
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({
          name: data.name,
          email: data.email,
        }));
        navigate("/movies");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Cannot connect to server. Is Spring Boot running?");
    }
  };

  return (
    <div className="login-container">
      <div className="icon-background">
        <div className="icon icon1">🎬</div>
        <div className="icon icon2">🍿</div>
        <div className="icon icon3">🎶</div>
        <div className="icon icon4">🍕</div>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>🎟️ {isRegister ? "Create Account" : "Movie Ticket Login"}</h2>

        {error && (
          <p style={{ color: "#ff6b6b", textAlign: "center", marginBottom: "1rem" }}>
            {error}
          </p>
        )}

        {isRegister && (
          <>
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isRegister ? "Register" : "Login"}</button>

        <p
          style={{ textAlign: "center", marginTop: "1rem", cursor: "pointer", color: "#ff9999" }}
          onClick={() => { setIsRegister(!isRegister); setError(""); }}
        >
          {isRegister ? "Already have an account? Login" : "New here? Create account"}
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
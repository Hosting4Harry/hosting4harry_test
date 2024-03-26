import React, { useState } from "react";
import AuthService from "../../AuthService";
import { HistoryRouterProps } from "react-router-dom";

interface LoginProps extends HistoryRouterProps {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    AuthService.login(username, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import api from "../api/axios";
import GoogleLoginButton from "../components/GoogleLoginButton";

interface LoginResponse {
  message: string;
  token?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await api.post<LoginResponse>("/auth/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {/* Google login button */}
      <div style={{ marginTop: "20px" }}>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import GoogleLoginButton from "../components/GoogleLoginButton"; // 👈 import

interface RegisterResponse {
  message: string;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await api.post<RegisterResponse>("/auth/register", {
        username,
        email,
        password,
      });

      setMessage(res.data.message);
      if (res.data.message.includes("verify")) {
        localStorage.setItem("pendingEmail", email);
        navigate("/auth/verify-otp");
      }

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
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
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {/* 👇 Add Google Signup/Login */}
      <div style={{ marginTop: "20px" }}>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Register;

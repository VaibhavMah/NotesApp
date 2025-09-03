import { useState } from "react";
import api from "../api/axios";
import GoogleLoginButton from "../components/GoogleLoginButton";
import bgImg from "../assets/signup.png"; 
import { Link } from "react-router-dom"; 

interface LoginResponse {
  message: string;
  token?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    try {
      const res = await api.post<LoginResponse>("/auth/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setAlert({ type: "success", text: res.data.message || "Login successful!" });
        window.location.href = "/dashboard";
      } else {
        setAlert({ type: "error", text: res.data.message || "Login failed" });
      }
    } catch (err: any) {
      setAlert({ type: "error", text: err.response?.data?.message || "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
  {/* Left form */}
  <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 p-6">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

      {alert && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            alert.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {alert.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6">
        <GoogleLoginButton />
      </div>
      <p className="mt-4 text-sm text-gray-600 text-center">
  New to Notes App?{" "}
  <Link to="/auth/register" className="text-blue-600 font-medium hover:underline">
    Sign up
  </Link>
</p>
    </div>
  </div>

  {/* Right image - hidden on mobile */}
  <div className="hidden md:flex w-1/2">
    <img
      src={bgImg}
      alt="Login background"
      className="object-contain w-full h-full"
    />
  </div>
</div>

  );
};

export default Login;

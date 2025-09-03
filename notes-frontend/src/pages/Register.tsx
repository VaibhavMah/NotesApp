import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import GoogleLoginButton from "../components/GoogleLoginButton";
import bgImg from "../assets/signup.png"; // place your PNG here

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/register", { username, email, password });
      console.log("✅ Registered:", res.data);

      localStorage.setItem("pendingEmail", email);
      navigate("/auth/verify-otp");

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error("⚠️ Registration failed", err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="flex min-h-screen overflow-hidden">
  {/* Left side form */}
  <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 bg-white">
    <div className="max-w-sm w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sign up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Name"
          className="w-full p-3 border rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {isLoading ? "Registering..." : "Get OTP"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <a href="/auth/login" className="text-blue-600">
          Sign in
        </a>
      </p>

      <div className="mt-6">
        <GoogleLoginButton />
      </div>
    </div>
  </div>

  {/* Right side image */}
  <div className="hidden md:flex w-1/2">
    <img
      src={bgImg}
      alt="Signup Illustration"
className="object-fill w-full h-screen"
    />
  </div>
</div>

  );
};

export default Register;

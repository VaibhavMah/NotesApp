import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface VerifyResponse {
  message: string;
  token?: string;
}

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Get email from localStorage (set during registration)
  const email = localStorage.getItem("pendingEmail") || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await api.post<VerifyResponse>("/auth/verify-otp", {
        email,
        otp,
      });

      setMessage(res.data.message);
      console.log("✅ Verification successful:", res.data);

      if (res.data.message.includes("verified")) {
        // ✅ Remove pending email (not needed anymore)
        localStorage.removeItem("pendingEmail");

        // ✅ If token is provided, store it & redirect to dashboard
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard"); // change this to your actual landing page
        } else {
          // fallback: if no token, send to login
          navigate("/auth/login");
        }
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || "Verification failed";
      setMessage(errorMessage);
      console.error("❌ Verification error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify OTP</h2>
      <p>Email: {email}</p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default VerifyOtp;

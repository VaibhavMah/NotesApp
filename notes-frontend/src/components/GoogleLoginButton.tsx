import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleJwtPayload {
  email: string;
  name: string;
  picture?: string;
}

const GoogleLoginButton: React.FC = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn") as HTMLElement,
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleCredentialResponse = async (res: GoogleCredentialResponse) => {
    try {
      // Decode Google token just for debugging/logging
      const decoded: GoogleJwtPayload = jwtDecode(res.credential);
      console.log("Google user:", decoded);

      // Send Google credential to backend
      const response = await api.post<{ token: string }>("/auth/google", {
        token: res.credential,
      });

      // ✅ Store token first
      localStorage.setItem("token", response.data.token);

      // ✅ Then redirect
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login not successful");
    }
  };

  return (
    <div>
      <div id="google-login-btn"></div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GoogleLoginButton;

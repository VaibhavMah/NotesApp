import { useEffect } from "react";
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

      localStorage.setItem("token", response.data.token);
      console.log("Logged in with Google ✅");

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return <div id="google-login-btn"></div>;
};

export default GoogleLoginButton;

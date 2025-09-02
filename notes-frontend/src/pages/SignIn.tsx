import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function SignIn() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign in</h2>

        <div className="space-y-4">
          <Input label="Email" type="email" placeholder="john@example.com" />
          <Input label="password" placeholder="" />
          <Button text="Sign in" onClick={handleLogin} />
        </div>

        <p className="mt-4 text-sm text-center">
          Need an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

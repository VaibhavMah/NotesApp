import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleOtpVerify = () => {
    // fake OTP verification
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
        
        {/* Left Panel (form) */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Sign up</h2>

          {step === 1 && (
            <div className="space-y-4">
              <Input label="Username" placeholder="John" />
              <Input label="Password" type="password" />
              <Input label="Email" type="email" placeholder="john@example.com" />
              <Button text="Get OTP" onClick={() => setStep(2)} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Input label="OTP" placeholder="1234" />
              <Button text="Sign up" onClick={handleOtpVerify} />
            </div>
          )}

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Panel (image placeholder like your mockup) */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <img
            src="https://source.unsplash.com/600x600/?abstract,technology"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

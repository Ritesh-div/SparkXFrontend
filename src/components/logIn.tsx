import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { logInApiCall } from "@/api/logInApiCall";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { forgetPasswordResetApiCall } from "@/api/forgetPasswordReset";

export function LogIn({ onSwitch }: { onSwitch: () => void }) {
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}"); //any where i get user using this

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    try {
      const data = await logInApiCall(email, password);
      toast.success("Login successful!");
      console.log("Login successful:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (user) {
        toast.success("Logged in successfully!");
        navigate("/dashboard"); // Redirect to dashboard or home page
        window.location.reload();
      } else {
        navigate("/"); // Redirect to login if user is not found
      }
    } catch (error: any) {
      console.log("Error during login:", error);
      toast.error(error.error || "Login failed. Invaild email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {showForgot ? (
        <Card className="w-[90%] max-w-sm">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await forgetPasswordResetApiCall(forgotEmail);

              if (res.ok) {
                toast.success(
                  "If this email exists, a reset link has been sent."
                );
                setShowForgot(false);
              } else {
                toast.error("Something went wrong.");
              }
            }}
            className="flex flex-col gap-4 p-4"
          >
            <Label htmlFor="forgot-email" className="text-xl">
              Enter your email
            </Label>
            <Input
              id="forgot-email"
              type="email"
              placeholder="Your Email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <Button type="submit">Send Reset Link</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForgot(false)}
            >
              Back to Login
            </Button>
          </form>
        </Card>
      ) : (
        <Card className="w-[90%] max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={onSwitch}
              >
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForgot(true);
                      }}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6">
                Login
              </Button>
            </form>
          </CardContent>
          {/* <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter> */}
        </Card>
      )}
    </div>
  );
}

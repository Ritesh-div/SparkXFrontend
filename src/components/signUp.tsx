import { signUpApiCall } from "@/api/signUpapiCall";
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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SignUp({ onSwitch }: { onSwitch: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required.");
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
      const data = await signUpApiCall(username, email, password);
      console.log("Sign up successful:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user) {
        toast.success("Account created successfully!");
        navigate("/dashboard");
        window.location.reload(); // Redirect to dashboard or home page
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error during sign up:", error);
      toast.error(error.error || "Sign up failed. Account already exists.");
    }
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-[90%] max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
          <CardAction>
            <Button
              onClick={onSwitch}
              className="rounded-full"
              variant="outline"
            >
              Log In
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Create Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="*********"
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              SignUp
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2">
          
          <Button variant="outline" className="w-full">
            Continue with Google
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "sonner";

export default function ResetPassword() {
  const { token } = useParams(); // expects a route like /reset-password/:token
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/reset-password`,
      
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken: token, newPassword }),
      }
    );
    setLoading(false);
    if (res.ok) {
      toast.success("Password reset successful! Please log in.");
      navigate("/"); // or your login route
    } else {
      toast.error("Reset failed. The link may be invalid or expired.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen w-screen absolute top-0 left-0 z-10 bg-gray-100 flex items-center justify-center flex-col gap-4"
    >
      <Card className="w-[90%] max-w-sm p-6">
        <Label htmlFor="new-password" className="text-md">
          New Password
        </Label>
        <Input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </Card>
    </form>
  );
}

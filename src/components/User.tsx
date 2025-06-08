import { Avatar } from "@radix-ui/react-avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { BrainCircuit, LogOut, MessageCircle, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
export default function User() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    window.location.href = "/";
  };

  const firstLetter =
    user && user.username && user.username.length > 0
      ? user.username[0].toUpperCase()
      : user && user.email && user.email.length > 0
      ? user.email[0].toUpperCase()
      : "U";

  return (
    <div className="w-auto flex  ">
      <HoverCard>
        <HoverCardTrigger>
          <Link to="/temprarychat">
            <MessageCircle className="mt-4 ml-3" />
          </Link>
        </HoverCardTrigger>
        <HoverCardContent>Temporary Chat</HoverCardContent>
      </HoverCard>

      <div className="m-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <div className="h-10 w-10 cursor-pointer flex justify-center items-center rounded-4xl bg-green-100">
                {firstLetter}
              </div>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {user && user.email ? user.email : "No email"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BrainCircuit />
              <Link to="/upgradeplan">Upgrade Plan</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="border-t-1" onClick={handleLogout}>
              <LogOut /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

import {
  Brain,
  BrainCircuit,
  Calendar,
  MessageCircle,
  Notebook,
  NotebookText,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "New chat",
    to: "/newchat",
    icon: MessageCircle,
  },
  {
    title: "History",
    to: "/history",
    icon: Calendar,
  },
  {
    title: "Image to PDF",
    to: "/imagetopdf",
    icon: Notebook,
  },
  {
    title: "Text to PDF",
    to: "/texttopdf",
    icon: NotebookText,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex gap-1">
              <Brain size={18}></Brain> <p>SparkX</p>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="m-2 flex items-center border-t-2 pt-2 border-gray-200">
        <BrainCircuit></BrainCircuit>
        <Link to="/upgradeplan">
          <div className="flex flex-col gap-2 m-2 ">
            <p className="text-md leading-[0.2] text-left">SparkX Plus</p>
            <p className="text-xs text-gray-400">Our smartest model & more</p>
          </div>
        </Link>
      </div>
    </Sidebar>
  );
}

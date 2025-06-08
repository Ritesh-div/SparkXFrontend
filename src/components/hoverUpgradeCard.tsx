import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { BrainCircuit, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function HoverUpgradeCard() {
  return (
    <div>
      <div className="flex items-center justify-between mt-2 bottom-0">
        <HoverCard>
          <HoverCardTrigger>
            <Plus />
          </HoverCardTrigger>
          <HoverCardContent className="flex items-center gap-1 border-2 p-4 bg-white rounded-lg shadow-lg">
            <BrainCircuit size={24} />
            <div className="flex flex-col gap-2">
              <p className="text-md leading-[0.2] text-left">SparkX Plus</p>
              <p className="text-xs text-gray-400">Our smartest model & more</p>
            </div>
            <div>
              <Button className="ml-2 rounded-2xl">
                <Link to="/upgradeplan">Upgrade</Link>
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}

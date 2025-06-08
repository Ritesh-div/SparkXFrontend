import { useState } from "react";
import { LogIn } from "./logIn";
import { SignUp } from "./signUp";
import { Brain } from "lucide-react";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <p className="absolute top-0 left-0 z-11 p-2 flex text-lg font-semibold"><Brain/>SparkX</p>
      <div className="h-screen w-screen absolute top-0 left-0 z-10">
      {showLogin ? (
        <LogIn onSwitch={() => setShowLogin(false)} />
      ) : (
        <SignUp onSwitch={() => setShowLogin(true)} />
      )}
    </div>
    </div>
    
  );
}
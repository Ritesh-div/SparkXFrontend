import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Dashboard from "./components/home";
import User from "./components/User";
import TempraryChat from "./components/tempraryChat";
import History from "./components/History";
import UpgradePlan from "./components/upgradePlan";
import Footer from "./components/footer";
import Settings from "./components/settings";
import Auth from "./components/Auth";
import { useState } from "react";
import ResetPassword from "./components/ResetPassword";
import ImageToPdf from "./components/imageToPdf";
import TextToPdf from "./components/textToPdf";

function App() {
  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-screen h-screen bg-gray-100">
          <div className="flex justify-between items-center border-gray-200">
            <SidebarTrigger />
            <div>
              <User />
            </div>
          </div>
          <Routes>
            {!user ? (
              <>
                <Route path="/" element={<Auth />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
                <Route
                  path="*"
                  element={
                    <div className="flex justify-center items-center font-bold text-2xl">
                      404 Not Found
                    </div>
                  }
                />
              </>
            ) : (
              <>
                <Route path="/" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/newchat" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/temprarychat" element={<TempraryChat />} />
                <Route path="/upgradeplan" element={<UpgradePlan />} />
                <Route path="/imagetopdf" element={<ImageToPdf />} />
                <Route path="/texttopdf" element={<TextToPdf />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
                <Route
                  path="*"
                  element={
                    <div className="flex justify-center items-center font-bold text-2xl">
                      404 Not Found
                    </div>
                  }
                />
              </>
            )}
          </Routes>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
}

export default App;

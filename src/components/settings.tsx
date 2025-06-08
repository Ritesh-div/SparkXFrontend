import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { deleteAllPromptResponses } from "../api/deleteAllPromptResponses";

export default function Settings() {
  const navigate = useNavigate();
  const handleDeleteAll = async () => {
    try {
      const response = await deleteAllPromptResponses();
      if (response.ok) {
        navigate("/history");
      } else {
        alert("Failed to delete all history.");
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      alert("Error deleting all history.");
    }
  };

  return (
    <div className="overflow-y-auto h-[87vh] bg-gray-50 dark:bg-gray-900">
      <h1 className="text-center text-3xl p-2 font-semibold">Settings</h1>
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full lg:w-[50%] h-auto bg-gray-50  p-6 rounded-lg shadow-md mt-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Upgrade Your Plan</h2>
          <p className="mb-4">
            Upgrade your plan to access premium features and get the most out of
            our service. Choose a plan that suits your needs.
          </p>
          <ul>
            <li className="mb-2">Access to advanced features</li>
            <li className="mb-2">Priority support</li>
            <li className="mb-2">Increased storage</li>
            <li className="mb-2">Enhanced security features</li>
          </ul>
          <div className="flex justify-between items-center font-semibold">
            <p>Upgrade your Plan</p>
            <Link to="/upgradeplan">
              <Button className="rounded-4xl cursor-pointer">Upgrade</Button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[50%] h-auto bg-gray-50  p-6 rounded-lg shadow-md mt-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Privacy and Data</h2>
          <p className="mb-4">
            Manage your privacy settings and control your data. You can clear
            your chat history and other personal data from our servers.
          </p>
          <div className="flex justify-between items-center mt-4 font-semibold">
            <p>Clear Chat History</p>
            <Button
              className="rounded-4xl cursor-pointer"
              onClick={handleDeleteAll}
            >
              All Clear
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-[50%] h-auto bg-gray-50  p-6 rounded-lg shadow-md mt-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
          <p className="mb-4">
            We value your feedback. Let us know your thoughts about the app, any
            issues you encountered, or suggestions for improvement.
          </p>
          <div className="flex justify-between items-center mt-4 font-semibold">
            <p>Send Feedback</p>
            <Button className="rounded-4xl">
              <a
                href="mailto:riteshkumarsahu1345@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-gray-400 text-xs">
        SparkX v1.0.0 &copy; 2025
      </div>
    </div>
  );
}

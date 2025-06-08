import  { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getPromptResponses } from "@/api/getPromptResponses";
import LineLoader from "./LineLoader";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { deletePromptResponse } from "@/api/deletePromptResponse";

interface HistoryItem {
  _id: string;
  prompt: string;
  response: string;
  createdAt?: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    getPromptResponses(user._id)
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center h-[88vh]">
        <LineLoader />
      </div>
    );
  }

  if (history.length === 0) {
    return <div className="p-4 text-center h-[88vh]">No history found.</div>;
  }

  const handleDelete = (id: string) => async () => {
    try {
      const response = await deletePromptResponse(id);
      if (response.ok) {
        setHistory((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete history item");
      }
    } catch (error) {
      console.error("Error deleting history item:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-black ">Your History</h2>
      <div className="space-y-6 h-[550px] overflow-y-auto pr-2">
        {history.map((item) => (
          <div
            key={item._id}
            className="bg-gray-50 p-4 rounded-xl shadow text-black"
          >
            <div className="mb-2 flex justify-between items-center">
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                Prompt:
                <span className="ml-2 text-black">{item.prompt}</span>
              </span>
              <Button variant={"outline"} onClick={handleDelete(item._id)}>
                {" "}
                <Trash2 />
              </Button>
            </div>
            <div>
              <span className="font-semibold text-green-700 dark:text-green-300">
                Response:
              </span>
              <span className="ml-2">
                <ReactMarkdown>{item.response}</ReactMarkdown>
              </span>
            </div>
            {item.createdAt && (
              <div className="text-xs text-gray-400 mt-2">
                {new Date(item.createdAt).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

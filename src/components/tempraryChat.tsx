import React, { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import { getGeminiResponse } from "../api/geminiApicall"; 
import LineLoader from "./LineLoader";
import HoverUpgradeCard from "./hoverUpgradeCard";
export default function TempraryChat() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<
    { prompt: string; response: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    const prompt = value;
    setValue("");
    setHistory((prev) => [...prev, { prompt, response: "" }]);
    const response = await getGeminiResponse(prompt);
    // Update the last history item with the response
    setHistory((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1].response = response;
      }
      return updated;
    });

    setLoading(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-1 h-[87vh] bg-amber-20 justify-center items-center flex-col gap-8">
        <div className="w-[100%] md:w-[65%] h-auto overflow-y-auto p-6 border-gray-200">
          {history.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="mt-4 mb-2 p-4 rounded-2xl bg-gray-50  w-fit ml-auto text-right">
                <p>{item.prompt}</p>
              </div>
              {item.response && (
                <div className="mt-2 mb-8 p-4 bg-gray-50 rounded-2xl w-fit">
                  <ReactMarkdown>{item.response}</ReactMarkdown>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {history.length === 0 && (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl">How can I assist you?</h1>
          </div>
        )}
        {loading && (
          <div className="mt-2 rounded-2xl w-[58%] h-0.5">
            <LineLoader />
          </div>
        )}
        <div
          className={
            ` w-full max-w-3xl h-auto border-2 items-center p-4 rounded-4xl bg-gray-50 ` +
            (history.length > 0
              ? " bottom-2" // styles when response exists
              : "") // styles when response does not exist
          }
        >
          <form
            onSubmit={handleSubmit}
            className="w-full items-stretch p-2 rounded-4xl flex"
          >
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask Anything"
              style={{
                width: "100%",
                resize: "none",
                overflow: "hidden",
                fontSize: "16px",
                lineHeight: "1.5",
                border: "none",
                outline: "none",
              }}
              rows={1}
              disabled={loading}
            />
            <Button
              type="submit"
              className="ml-2 rounded-2xl"
              disabled={loading}
            >
              <SendHorizonal />
            </Button>
          </form>
          {/* Hover Card */}
          <HoverUpgradeCard/>
        </div>
      </div>
    </div>
  );
}

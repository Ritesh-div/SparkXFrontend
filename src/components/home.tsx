import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import LineLoader from "./LineLoader";
import HoverUpgradeCard from "./hoverUpgradeCard";
import AutoGrowTextarea from "./AutoGrowTextarea";
import PdfDownloadButton from "./PdfDownloadButton";

export default function Dashboard() {
  const [response] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<
    { prompt: string; response: string }[]
  >([]);

  const handlePromptSubmit = (prompt: string) => {
    setHistory((prev) => [...prev, { prompt, response: "" }]);
  };

  const handleResponse = (response: string) => {
    setHistory((prev) => {
      // Update the last entry with the response
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1].response = response;
      }
      console.log("Response received:", response);
      return updated;
    });
    setLoading(false);
    // handleCollectResponse(response);
  };


  return (
    <div className="realative">
      <div className="flex flex-1 h-[87vh] bg-amber-20 justify-center items-center flex-col gap-8">
        {/* Show prompt and response */}
        <div className="w-full break-words max-w-[67%] h-auto overflow-y-auto p-6  border-gray-200">
          {history.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="mt-4 mb-2 p-4 rounded-2xl bg-gray-50 w-fit ml-auto text-right ">
                <p>{item.prompt}</p>
              </div>
              {item.response && (
                <div className="mt-2 mb-8 p-4 bg-gray-50 rounded-2xl w-fit">
                  <ReactMarkdown>{item.response}</ReactMarkdown>
                  <PdfDownloadButton
                    text={item.response}
                    fileName="response.pdf"
                  />
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
          <div className="mt-2 rounded-2xl w-[90%] lg:w-[60%] h-0.5">
            <LineLoader />
          </div>
        )}
        {/* Input area */}
        <div
          className={
            ` w-full max-w-3xl h-auto border-2 items-center p-4 rounded-4xl bg-white` +
            (response
              ? "absolute bottom-2" // styles when response exists
              : "") // styles when response does not exist
          }
        >
          <AutoGrowTextarea
            onPromptSubmit={handlePromptSubmit}
            onResponse={handleResponse}
            setLoading={setLoading}
          />
          {/* Hover Card */}
          <HoverUpgradeCard />
        </div>
      </div>
    </div>
  );
}

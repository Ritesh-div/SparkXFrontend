import React, { useState, useRef, useEffect } from "react";
import { getGeminiResponse } from "../api/geminiApicall";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";
import { savePromptResponse } from "@/api/savePromptResponse";

interface AutoGrowTextareaProps {
  onPromptSubmit?: (prompt: string) => void;
  onResponse?: (response: string) => void;
  setLoading?: (loading: boolean) => void;
}
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?._id || "";

const AutoGrowTextarea: React.FC<AutoGrowTextareaProps> = ({
  onPromptSubmit,
  onResponse,
  setLoading,
}) => {
  const [value, setValue] = useState("");
  // const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (value.trim()) {
    onPromptSubmit?.(value);
    setLoading?.(true);
    const geminiResponse = await getGeminiResponse(value);
    onResponse?.(geminiResponse);

    // Save to MongoDB via backend
    await savePromptResponse(value, geminiResponse,userId);

    setLoading?.(false);
    setValue("");
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-stretch p-2 rounded-4xl "
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="Ask Anything"
        style={{
          width: "98%",
          resize: "none",
          overflow: "hidden",
          fontSize: "16px",
          lineHeight: "1.5",
          border: "none",
          outline: "none",
        }}
        rows={1}
      />
      <Button type="submit" className="ml-2 rounded-2xl">  
        <SendHorizonal />
      </Button>
    </form>
  );
};

export default AutoGrowTextarea;

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Download } from "lucide-react";

export default function TextToPdf() {
  const [text, setText] = useState("");
  const [pdfName, setPdfName] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const leftMargin = 20;
    const topMargin = 20;
    const lineHeight = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const wrapWidth = pageWidth - leftMargin * 2;

    const lines = doc.splitTextToSize(text, wrapWidth);

    let y = topMargin;
    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - topMargin) {
        doc.addPage();
        y = topMargin;
      }
      doc.text(line, leftMargin, y);
      y += lineHeight;
    });

    const name = pdfName.trim()
      ? pdfName.endsWith(".pdf")
        ? pdfName
        : pdfName + ".pdf"
      : "output.pdf";
    doc.save(name);
    setPdfName("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[87vh] bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Text to PDF Converter</h1>
      <div className="max-w-3xl w-[90%] p-6 bg-white rounded-lg shadow-md max-h-[70vh] overflow-y-auto">
        <textarea
          ref={textareaRef}
          className="outline-none rounded-2xl p-2 mb-3 w-full h-auto resize-none"
          placeholder="Enter your text here..."
          value={text}
          onChange={handleTextChange}
          style={{ overflow: "hidden" }}
        />
      </div>
      <div className="flex items-center justify-between gap-3 w-[90%] max-w-3xl p-2">
        <Input
          type="text"
          value={pdfName}
          onChange={(e) => setPdfName(e.target.value)}
          placeholder="Enter PDF name"
          className="border rounded-2xl px-2 py-1 my-2"
        />
        <Button
          className="rounded-2xl"
          onClick={handleDownload}
          disabled={!text.trim()}
        >
          <Download/> PDF
        </Button>
      </div>
    </div>
  );
}

import { useRef, useState } from "react";
import jsPDF from "jspdf";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Download } from "lucide-react";

export default function ImageToPdf() {
  const [imgDataList, setImgDataList] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfName, setPdfName] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    const readers = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target?.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then(setImgDataList);
  };

  const handleDownload = () => {
    if (imgDataList.length === 0) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    imgDataList.forEach((img, idx) => {
      if (idx !== 0) doc.addPage();
      doc.addImage(img, "JPEG", 10, 10, pageWidth - 20, pageHeight - 20);
    });

    doc.save(pdfName.endsWith(".pdf") ? pdfName : pdfName + ".pdf");
    setPdfName("");
    setImgDataList([]);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-[87vh] gap-4">
      <h1 className="text-2xl font-bold mb-4">Image to PDF Converter</h1>
      <div className="max-w-3xl w-[90%] flex flex-wrap gap-1 p-6 bg-white rounded-lg shadow-md max-h-[70vh] overflow-y-auto">
        <Input
          type="file"
          accept="image/jpeg,image/png"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="text-blue-400 cursor-pointer mb-4 mt-3 outline-0 border-0 hover:underline"
        />
        
        <div className="flex flex-wrap gap-2">
          {imgDataList.map((img, idx) =>
            img ? (
              <img
                key={idx}
                src={img}
                alt={`Preview ${idx + 1}`}
                className="max-w-xs max-h-60 border"
              />
            ) : null
          )}
        </div>
      </div>
      <div className="flex justify-between items-center max-w-3xl w-[90%] gap-4">
        <Input
          type="text"
          value={pdfName}
          onChange={(e) => setPdfName(e.target.value)}
          placeholder="Enter PDF name"
          className="border rounded-2xl px-2 py-1"
        />{" "}
        <Button
          onClick={handleDownload}
          disabled={imgDataList.length === 0}
          className="rounded-4xl text-sm"
        //   variant="outline"
        >
          <Download/> PDF
        </Button>
      </div>
    </div>
  );
}

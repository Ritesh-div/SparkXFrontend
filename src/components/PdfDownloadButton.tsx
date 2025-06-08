import jsPDF from "jspdf";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { marked } from "marked";
interface PdfDownloadButtonProps {
  text: string;
  fileName?: string;
}

export default function PdfDownloadButton({
  text,
  fileName = "output.pdf",
}: PdfDownloadButtonProps) {
const handleDownload = async () => {
  const doc = new jsPDF();
  const leftMargin = 20;
  const topMargin = 20;
  const lineHeight = 10;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const wrapWidth = pageWidth - leftMargin * 2;

  // marked.parse returns a string (HTML) or a Promise<string>
  const html = await marked.parse(text);
  // Remove HTML tags to get plain text
  const plainText = html.replace(/<[^>]+>/g, "");
  const lines = doc.splitTextToSize(plainText, wrapWidth);

  let y = topMargin;
  lines.forEach((line: string) => {
    if (y + lineHeight > pageHeight - topMargin) {
      doc.addPage();
      y = topMargin;
    }
    doc.text(line, leftMargin, y);
    y += lineHeight;
  });

  doc.save(fileName);
};

  return (
    <div className="flex items-center justify-end mt-2">
        <Button
      onClick={handleDownload}
      disabled={!text.trim()}
      variant={"outline"}
      className="rounded-4xl text-sm"
    >
     <Download/> PDF
    </Button>
    </div>
    
  );
}

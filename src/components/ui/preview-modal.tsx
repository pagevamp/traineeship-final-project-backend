import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, Download, ExternalLink } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PreviewModalProps {
  file: {
    name?: string;
    url: string;
    type?: string;
    size?: string;
  };
  closeModal: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ file, closeModal }) => {
  const [downloading, setDownloading] = React.useState(false);

  const getFileExtension = (url: string) => {
    const pathname = new URL(url).pathname;
    const filename = pathname.split("/").pop();
    const match = filename?.match(/\.(\w+)(?=\?|$)/);
    return match ? match[1].toLowerCase() : null;
  };

  const isImageFile = (url: string) => {
    const extension = getFileExtension(url);
    return extension && ["jpg", "jpeg", "png"].includes(extension);
  };

  const isPdfFile = (url: string) => {
    const extension = getFileExtension(url);
    return extension === "pdf";
  };

  const isDocumentFile = (url: string) => {
    const extension = getFileExtension(url);
    return extension && ["doc", "docx", "txt", "rtf"].includes(extension);
  };

  const isSpreadsheetFile = (url: string) => {
    const extension = getFileExtension(url);
    return extension && ["xls", "xlsx", "csv"].includes(extension);
  };

  const getFileIcon = (url: string) => {
    if (isPdfFile(url)) {
      return { bg: "bg-red-500", text: "PDF" };
    }
    if (isDocumentFile(url)) {
      return { bg: "bg-blue-500", text: "DOC" };
    }
    if (isSpreadsheetFile(url)) {
      return { bg: "bg-green-500", text: "XLS" };
    }
    return { bg: "bg-gray-500", text: "FILE" };
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(file.url, { mode: "cors" });
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name || `download.${getFileExtension(file.url)}`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback: open in new tab (won't always trigger download, but avoids navigation away)
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name || `download.${getFileExtension(file.url)}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setDownloading(false);
  };

  const handleOpenInNewTab = () => {
    window.open(file.url, "_blank");
  };

  const fileName =
    file.name || file.url.split("/").pop()?.split("?")[0] || "Document";

  return (
    <div className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[85vh] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-3xl">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate font-secondary">
            {fileName}
          </h3>
          {file.size && <p className="text-sm text-gray-500">{file.size}</p>}
        </div>
        <div className="flex items-center gap-2 ml-4">
          {/* <Button
            onClick={handleDownload}
            variant="outline"
            disabled={downloading}
          >
            <Download className="h-4 w-4 mr-1" />
            {downloading ? "Downloading..." : "Download"}
          </Button> */}
          <Button
            onClick={closeModal}
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow overflow-auto">
        {isImageFile(file.url) ? (
          <div className="flex justify-center">
            <Image
              src={file.url}
              alt={fileName}
              width={800}
              height={600}
              className="max-w-full h-auto rounded-lg object-contain"
            />
          </div>
        ) : isPdfFile(file.url) ? (
          <div className="w-full h-[600px]">
            <iframe
              src={`${file.url}#toolbar=1&navpanes=1&scrollbar=1&view=FitW`}
              className="w-full h-full border-0 rounded-lg"
              title={fileName}
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div
              className={`w-24 h-32 ${
                getFileIcon(file.url).bg
              } rounded-lg flex items-center justify-center mb-4 shadow-lg`}
            >
              <span className="text-white text-lg font-bold">
                {getFileIcon(file.url).text}
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-center">{fileName}</p>
            <div className="flex gap-2">
              <Button onClick={handleOpenInNewTab} variant="outline">
                <ExternalLink className="h-4 w-4 mr-1" />
                Open File
              </Button>
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center p-4 border-t bg-gray-50 rounded-b-3xl">
        <div className="flex gap-2">
          <Button
            onClick={closeModal}
            variant={"customGradient"}
            className="flex items-center gap-2 px-8 py-2 text-sm hover: text-white rounded-md transition-colors"
          >
            <Icon icon="gg:close-r" width="16" height="16" />
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;

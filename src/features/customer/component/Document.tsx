import React from "react";
import Image from "next/image";
import { getFileExtensionFromS3Url } from "@/constant";
import { useModalContext } from "@/providers/modal-context";
import PreviewModal from "@/components/ui/preview-modal";

const Documents = ({ documentsDetail }: any) => {
  console.log(documentsDetail, "documentsDetail");
  const { openModal } = useModalContext();

  // Define document types with their labels and URLs
  const documentTypes = [
    {
      label: "Contract",
      url: documentsDetail?.contractUrl,
      filename: documentsDetail?.contract,
    },
    {
      label: "Passport",
      url: documentsDetail?.passportUrl,
      filename: documentsDetail?.passport,
    },
    {
      label: "Emirates ID",
      url: documentsDetail?.emiratesIdUrl,
      filename: documentsDetail?.emiratesId,
    },
    {
      label: "Trade License",
      url: documentsDetail?.tradeLicenseUrl,
      filename: documentsDetail?.tradeLicense,
    },
    {
      label: "VAT Certificate",
      url: documentsDetail?.vatCertificateUrl,
      filename: documentsDetail?.vatCertificate,
    },
  ];

  const isImageFile = (url: string) => {
    const extension = getFileExtensionFromS3Url(url);
    return (
      extension &&
      ["jpg", "jpeg", "png", "gif", "webp"].includes(extension.toLowerCase())
    );
  };

  const isPdfFile = (url: string) => {
    const extension = getFileExtensionFromS3Url(url);
    return extension && extension.toLowerCase() === "pdf";
  };

  const handleDocumentClick = (doc: any) => {
    openModal({
      component: PreviewModal,
      props: {
        file: {
          url: doc.url,
          name: doc.label,
          type: doc.filename,
        },
      },
      className: "max-w-4xl w-full rounded-3xl",
    });
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-[25px] p-x-2 py-4 md:p-6">
      <div className="flex flex-wrap items-center gap-4 justify-start">
        {documentTypes.map(
          (doc, index) =>
            doc.url && (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="relative w-[220px] h-[115px] overflow-hidden border rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                  onClick={() => handleDocumentClick(doc)}
                >
                  {isImageFile(doc.url) ? (
                    <Image
                      src={doc.url}
                      alt={doc.label}
                      width={220}
                      height={115}
                      className="rounded-lg object-contain"
                    />
                  ) : isPdfFile(doc.url) ? (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div className="w-12 h-16 bg-red-500 rounded flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">
                          PDF
                        </span>
                      </div>
                      <span className="text-xs text-gray-600 text-center px-2">
                        {doc.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div className="w-12 h-16 bg-gray-400 rounded flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">
                          FILE
                        </span>
                      </div>
                      <span className="text-xs text-gray-600 text-center px-2">
                        {doc.label}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-600 mt-2 font-secondary font-[300] text-center">
                  {doc.label}
                </span>
              </div>
            )
        )}
        {/* <Button className="w-[130px] h-[115px] bg-[#F1F1F1] rounded-[25px] text-[#1C2B38] hover:bg-[#E0E0E0] mt-2 md:mt-0">
          More
        </Button> */}
      </div>
    </div>
  );
};

export default Documents;

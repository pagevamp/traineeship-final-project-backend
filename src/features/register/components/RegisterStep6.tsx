import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CustomerRegister6Props } from "../types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: File | null;
}

const FileViewerModal: React.FC<FileViewerModalProps> = ({
  isOpen,
  onClose,
  file,
}) => {
  if (!isOpen || !file) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {file.name}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icon icon="mdi:close" width="20" height="20" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-auto max-h-[calc(90vh-120px)]">
            {file.type.startsWith("image/") ? (
              // Image viewer
              <div className="flex justify-center">
                <div className="max-w-full max-h-full">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                    style={{ maxHeight: "70vh" }}
                  />
                </div>
              </div>
            ) : file.type === "application/pdf" ? (
              // PDF viewer
              <div className="w-full h-[70vh]">
                <iframe
                  src={URL.createObjectURL(file)}
                  className="w-full h-full border-0 rounded"
                  title={file.name}
                />
              </div>
            ) : (
              // Fallback for unsupported files
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Icon icon="mdi:file-document" width="64" height="64" />
                <p className="mt-4 text-lg">Preview not available</p>
                <p className="text-sm">This file type cannot be previewed</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <Button
                onClick={onClose}
                variant={"customGradient"}
                className="flex items-center gap-2 px-8 py-2 text-sm hover: text-white rounded-md transition-colors"
              >
                <Icon icon="gg:close-r" width="16" height="16" />
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Register6 = (props: CustomerRegister6Props) => {
  const { setValue, trigger, errors, defaultValues, watch } = props;

  // Store file input refs for programmatic access
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Store image URLs in state to ensure they persist and trigger re-renders
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  // Watch the documents form data
  const watchedDocuments = watch("documents");

  // Initialize documents array if it doesn't exist
  React.useEffect(() => {
    if (!defaultValues?.documents || !defaultValues.documents[0]) {
      setValue("documents", [
        {
          tradeLicense: "",
          vatCertificate: "",
          passport: "",
          emiratesId: "",
          securityCheque: "",
          contract: "",
          other: "",
        },
      ]);
    }
  }, [setValue, defaultValues?.documents]);

  // Create image URLs for existing files when component mounts or form data changes
  React.useEffect(() => {
    if (watchedDocuments?.[0]) {
      const documents = watchedDocuments[0];
      const newImageUrls: { [key: string]: string } = {};
      let hasChanges = false;

      // Check each document field for existing files and create image URLs
      Object.keys(documents).forEach((key) => {
        const value = documents[key as keyof typeof documents];
        if (
          value &&
          typeof value === "object" &&
          "name" in value &&
          "type" in value
        ) {
          // Get the document ID for this form field (handle the typo mapping)
          const documentId = key;

          // Create image URL for image files if not already created
          if (
            (value as File).type.startsWith("image/") &&
            !imageUrls[documentId]
          ) {
            newImageUrls[documentId] = URL.createObjectURL(value as File);
            hasChanges = true;
          }
        }
      });

      // Update image URLs if there are changes
      if (hasChanges) {
        setImageUrls((prev) => ({ ...prev, ...newImageUrls }));
      }
    }
  }, [watchedDocuments, imageUrls]);

  // Cleanup image URLs on unmount
  React.useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [imageUrls]);

  // Modal state for file viewer
  const [viewerModal, setViewerModal] = useState<{
    isOpen: boolean;
    file: File | null;
  }>({
    isOpen: false,
    file: null,
  });

  // Helper function to get the correct form field name for a document ID
  const getFormFieldName = useCallback((documentId: string): string => {
    const fieldMapping: { [key: string]: string } = {};
    return fieldMapping[documentId] || documentId;
  }, []);

  // Helper function to get file from form data
  const getFileFromForm = useCallback(
    (documentId: string): File | null => {
      if (watchedDocuments?.[0]) {
        const documents = watchedDocuments[0];
        const formFieldName = getFormFieldName(documentId);
        const value = documents[formFieldName as keyof typeof documents];

        if (
          value &&
          typeof value === "object" &&
          "name" in value &&
          "type" in value
        ) {
          return value as File;
        }
      }
      return null;
    },
    [watchedDocuments, getFormFieldName]
  );

  // File handling functions
  const handleFileSelect = useCallback((documentId: string) => {
    fileInputRefs.current[documentId]?.click();
  }, []);

  const handleFileChange = useCallback(
    (documentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const formFieldName = getFormFieldName(documentId);

      if (file) {
        // Validate file type
        const allowedTypes = [".pdf", ".png", ".jpg", ".jpeg"];
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

        if (!allowedTypes.includes(fileExtension)) {
          toast.error("Please upload only PDF, PNG, JPG, or JPEG files.");
          setValue(`documents.0.${formFieldName}` as any, "");
          if (fileInputRefs.current[documentId]) {
            fileInputRefs.current[documentId]!.value = "";
          }
          return;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          toast.error("File size must be less than 10MB.");
          setValue(`documents.0.${formFieldName}` as any, "");
          if (fileInputRefs.current[documentId]) {
            fileInputRefs.current[documentId]!.value = "";
          }
          return;
        }

        // Store file in form data
        setValue(`documents.0.${formFieldName}` as any, file);

        // Create image URL for image files
        if (file.type.startsWith("image/")) {
          // Clean up existing URL if any
          if (imageUrls[documentId]) {
            URL.revokeObjectURL(imageUrls[documentId]);
          }
          const newUrl = URL.createObjectURL(file);
          setImageUrls((prev) => ({ ...prev, [documentId]: newUrl }));
        }

        trigger(`documents.0.${formFieldName}` as any);
      } else {
        setValue(`documents.0.${formFieldName}` as any, "");
      }
    },
    [setValue, trigger, getFormFieldName, imageUrls]
  );

  const removeFile = useCallback(
    (documentId: string) => {
      const formFieldName = getFormFieldName(documentId);
      setValue(`documents.0.${formFieldName}` as any, "");
      trigger(`documents.0.${formFieldName}` as any);

      // Clean up image URL if it exists
      if (imageUrls[documentId]) {
        URL.revokeObjectURL(imageUrls[documentId]);
        setImageUrls((prev) => {
          const newUrls = { ...prev };
          delete newUrls[documentId];
          return newUrls;
        });
      }

      if (fileInputRefs.current[documentId]) {
        fileInputRefs.current[documentId]!.value = "";
      }
    },
    [setValue, trigger, getFormFieldName, imageUrls]
  );

  // Modal functions
  const openFileViewer = useCallback((file: File) => {
    setViewerModal({ isOpen: true, file });
  }, []);

  const closeFileViewer = useCallback(() => {
    setViewerModal({ isOpen: false, file: null });
  }, []);

  // Helper functions
  const getFileIcon = useCallback((fileType: string) => {
    if (fileType?.startsWith("image/")) return "mdi:image";
    if (fileType === "application/pdf") return "mdi:file-pdf-box";
    return "mdi:file-document";
  }, []);

  // Create blob URL on-demand for image previews
  const getImageUrl = useCallback((file: File): string => {
    return URL.createObjectURL(file);
  }, []);

  // Render file preview component
  const renderFilePreview = useCallback(
    (documentId: string, file: File) => {
      return (
        <div className="w-[209px] p-2 bg-orange-50 border border-orange-200 rounded-md">
          <div className="flex items-center gap-3">
            {/* File Preview/Icon */}
            <div className="flex-shrink-0">
              {file.type.startsWith("image/") ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border">
                  <Image
                    src={imageUrls[documentId] || getImageUrl(file)}
                    alt={file.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => openFileViewer(file)}
                  />
                </div>
              ) : (
                <div
                  className="w-12 h-12 rounded-lg bg-white border flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => openFileViewer(file)}
                >
                  <Icon
                    icon={getFileIcon(file.type)}
                    width="20"
                    height="20"
                    className="text-gray-500"
                  />
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-orange-800 truncate mb-1">
                {file.name}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openFileViewer(file)}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Icon icon="mdi:eye" width="12" height="12" />
                  <span>View</span>
                </button>

                <button
                  onClick={() => removeFile(documentId)}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  <Icon icon="mdi:close" width="12" height="12" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    },
    [imageUrls, getImageUrl, openFileViewer, getFileIcon, removeFile]
  );

  return (
    <>
      <motion.div
        className="text-[16px] min-w-[320px] max-w-screen-2xl mx-auto px-4 flex flex-col gap-6 md:flex-col md:place-items-center md:gap-[21px] mt-2 mb-1"
        initial={{ x: 10, opacity: 0.1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <div className="relative mb-2 w-[163px] h-[163px] mx-auto">
          <Image
            src="Ellipse 1.svg"
            alt="ellipse"
            fill
            className="absolute inset-0 m-auto"
            style={{ objectFit: "contain" }}
          />
          <Image
            src="Work.svg"
            alt="work"
            width={50}
            height={50}
            className="absolute inset-0 m-auto"
          />
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-center md:gap-[24px]">
            <div className="flex flex-col gap-2 flex-1 w-full">
              <div
                className={cn(
                  "w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-6 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
                  errors.documents?.[0]?.tradeLicense && "border-destructive"
                )}
                onClick={() => handleFileSelect("tradeLicense")}
              >
                <Image
                  src="/Upload.svg"
                  alt="Upload"
                  className="w-6 h-6 object-contain"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Trade License
                  <span className="text-red-600 ml-1">*</span>
                </span>
              </div>
              {/* Hidden file input */}
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFileChange("tradeLicense", e)}
                ref={(el) => {
                  fileInputRefs.current["tradeLicense"] = el;
                }}
              />
              {/* Uploaded file display */}
              {getFileFromForm("tradeLicense") &&
                renderFilePreview(
                  "tradeLicense",
                  getFileFromForm("tradeLicense")!
                )}
              {/* Error display */}
              {errors.documents?.[0]?.tradeLicense && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.documents[0].tradeLicense?.message}
                </p>
              )}
            </div>

            <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

            <div className="flex flex-col gap-2 flex-1 w-full">
              <div
                className={cn(
                  "w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
                  errors.documents?.[0]?.vatCertificate && "border-destructive"
                )}
                onClick={() => handleFileSelect("vatCertificate")}
              >
                <Image
                  src="/Upload.svg"
                  alt="Upload"
                  className="w-6 h-6 object-contain"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Vat certificate
                  <span className="text-red-600 ml-1">*</span>
                </span>
              </div>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFileChange("vatCertificate", e)}
                ref={(el) => {
                  fileInputRefs.current["vatCertificate"] = el;
                }}
              />
              {getFileFromForm("vatCertificate") &&
                renderFilePreview(
                  "vatCertificate",
                  getFileFromForm("vatCertificate")!
                )}
              {/* Error display */}
              {errors.documents?.[0]?.vatCertificate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.documents[0].vatCertificate?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px] mt-6">
            <div className="flex flex-col gap-2 flex-1 w-full">
              <div
                className={cn(
                  "w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
                  errors.documents?.[0]?.passport && "border-destructive"
                )}
                onClick={() => handleFileSelect("passport")}
              >
                <Image
                  src="/Upload.svg"
                  alt="Upload"
                  className="w-6 h-6 object-contain"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Passport copy
                  <span className="text-red-600 ml-1">*</span>
                </span>
              </div>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFileChange("passport", e)}
                ref={(el) => {
                  fileInputRefs.current["passport"] = el;
                }}
              />
              {getFileFromForm("passport") &&
                renderFilePreview("passport", getFileFromForm("passport")!)}
              {/* Error display */}
              {errors.documents?.[0]?.passport && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.documents[0].passport?.message}
                </p>
              )}
            </div>

            <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

            <div className="flex flex-col gap-2 flex-1 w-full">
              <div
                className={cn(
                  "w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
                  errors.documents?.[0]?.emiratesId && "border-destructive"
                )}
                onClick={() => handleFileSelect("emiratesId")}
              >
                <Image
                  src="/Upload.svg"
                  alt="Upload"
                  className="w-6 h-6 object-contain"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Emirates ID
                  <span className="text-red-600 ml-1">*</span>
                </span>
              </div>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFileChange("emiratesId", e)}
                ref={(el) => {
                  fileInputRefs.current["emiratesId"] = el;
                }}
              />
              {getFileFromForm("emiratesId") &&
                renderFilePreview("emiratesId", getFileFromForm("emiratesId")!)}
              {/* Error display */}
              {errors.documents?.[0]?.emiratesId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.documents[0].emiratesId?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px] mt-6">
            <div className="flex flex-col gap-2 flex-1 w-full">
              <div
                className="w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleFileSelect("securityCheque")}
              >
                <Image
                  src="/Upload.svg"
                  alt="Upload"
                  className="w-6 h-6 object-contain"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Security Cheque
                </span>
              </div>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFileChange("securityCheque", e)}
                ref={(el) => {
                  fileInputRefs.current["securityCheque"] = el;
                }}
              />
              {getFileFromForm("securityCheque") &&
                renderFilePreview(
                  "securityCheque",
                  getFileFromForm("securityCheque")!
                )}
              {/* Error display */}
              {errors.documents?.[0]?.securityCheque && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.documents[0].securityCheque?.message}
                </p>
              )}
            </div>

            <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

            <div className="flex flex-col gap-2 flex-1 w-full">
              <div
                className={cn(
                  "w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
                  errors.documents?.[0]?.contract && "border-destructive"
                )}
                onClick={() => handleFileSelect("contract")}
              >
                <Image
                  src="/Upload.svg"
                  alt="Upload"
                  className="w-6 h-6 object-contain"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium text-[#1E1E1E]">
                  Contract
                  <span className="text-red-600 ml-1">*</span>
                </span>
              </div>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFileChange("contract", e)}
                ref={(el) => {
                  fileInputRefs.current["contract"] = el;
                }}
              />
              {getFileFromForm("contract") &&
                renderFilePreview("contract", getFileFromForm("contract")!)}
              {/* Error display */}
              {errors.documents?.[0]?.contract && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.documents[0].contract?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1 w-full mt-6">
            <div
              className="w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleFileSelect("other")}
            >
              <Image
                src="/Upload.svg"
                alt="Upload"
                className="w-6 h-6 object-contain"
                width={20}
                height={20}
              />
              <span className="text-sm font-medium text-[#1E1E1E]">Others</span>
            </div>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => handleFileChange("other", e)}
              ref={(el) => {
                fileInputRefs.current["other"] = el;
              }}
            />
            {getFileFromForm("other") &&
              renderFilePreview("other", getFileFromForm("other")!)}
            {/* Error display */}
            {errors.documents?.[0]?.other && (
              <p className="text-red-500 text-xs mt-1">
                {errors.documents[0].other?.message}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* File Viewer Modal */}
      <FileViewerModal
        isOpen={viewerModal.isOpen}
        onClose={closeFileViewer}
        file={viewerModal.file}
      />
    </>
  );
};

export default Register6;

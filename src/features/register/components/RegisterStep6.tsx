import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CustomerRegister6Props } from "../types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getFileExtensionFromS3Url } from "@/constant";

interface FileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: File | null;
  fileUrl?: string;
  fileName?: string;
}

const FileViewerModal: React.FC<FileViewerModalProps> = ({
  isOpen,
  onClose,
  file,
  fileUrl,
  fileName,
}) => {
  if (!isOpen || (!file && !fileUrl)) return null;

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
              {fileName || (file ? file.name : "Document")}
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
            {file ? (
              // File object viewer
              file.type.startsWith("image/") ? (
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
              )
            ) : fileUrl ? (
              // URL viewer
              (() => {
                const extension = getFileExtensionFromS3Url(fileUrl);
                const isImage =
                  extension &&
                  ["jpg", "jpeg", "png"].includes(extension.toLowerCase());
                const isPdf = extension && extension.toLowerCase() === "pdf";

                if (isImage) {
                  // Image viewer
                  return (
                    <div className="flex justify-center">
                      <div className="max-w-full max-h-full">
                        <Image
                          src={fileUrl}
                          width={800}
                          height={600}
                          alt={fileName || "Image"}
                          className="max-w-full max-h-full object-contain"
                          style={{ maxHeight: "70vh" }}
                        />
                      </div>
                    </div>
                  );
                } else if (isPdf) {
                  // PDF viewer
                  return (
                    <div className="w-full h-[70vh]">
                      <iframe
                        src={fileUrl}
                        className="w-full h-full border-0 rounded"
                        title={fileName || "PDF Document"}
                      />
                    </div>
                  );
                } else {
                  // Fallback for unsupported files
                  return (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <Icon icon="mdi:file-document" width="64" height="64" />
                      <p className="mt-4 text-lg">Preview not available</p>
                      <p className="text-sm">
                        This file type cannot be previewed
                      </p>
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Download File
                      </a>
                    </div>
                  );
                }
              })()
            ) : (
              // No file or URL
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Icon icon="mdi:file-document" width="64" height="64" />
                <p className="mt-4 text-lg">No file to preview</p>
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
    fileUrl?: string;
    fileName?: string;
  }>({
    isOpen: false,
    file: null,
  });

  // Helper function to get the correct form field name for a document ID
  const getFormFieldName = useCallback((documentId: string) => documentId, []);

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

  // Helper function to get URL from profile data (for re-apply scenario)
  const getFileUrlFromProfile = useCallback(
    (documentId: string): string | null => {
      // Check if we have profile data with URLs
      if (defaultValues?.documents?.[0]) {
        const documents = defaultValues.documents[0];

        // For update scenario, check if there's a URL field (e.g., tradeLicenseUrl)
        const urlFieldName = `${documentId}Url`;
        const urlValue = documents[urlFieldName as keyof typeof documents];

        if (
          urlValue &&
          typeof urlValue === "string" &&
          urlValue.startsWith("https")
        ) {
          return urlValue;
        }
      }
      return null;
    },
    [defaultValues?.documents]
  );

  // Helper function to get file name from form data or profile
  const getFileNameFromData = useCallback(
    (documentId: string): string | null => {
      // First check if there's a File object (priority)
      const file = getFileFromForm(documentId);
      const hasFile =
        file && typeof file === "object" && "name" in file && "type" in file;
      if (hasFile) {
        return file.name;
      }

      // Then check if there's a URL from profile
      const url = getFileUrlFromProfile(documentId);
      const hasUrl = url && typeof url === "string" && url.startsWith("https");
      if (hasUrl) {
        // Extract filename from URL using the existing function
        const extension = getFileExtensionFromS3Url(url);
        if (extension) {
          const lowerExt = extension.toLowerCase();
          if (["jpg", "jpeg", "png"].includes(lowerExt)) {
            return `Image.${extension}`;
          } else if (lowerExt === "pdf") {
            return `Document.${extension}`;
          } else {
            return `Document.${extension}`;
          }
        }
        return "Document";
      }

      return null;
    },
    [getFileFromForm, getFileUrlFromProfile]
  );

  // Helper function to check if a document field has data (either File or URL)
  const hasDocumentData = useCallback(
    (documentId: string): boolean => {
      const file = getFileFromForm(documentId);
      const fileUrl = getFileUrlFromProfile(documentId);

      const hasFile =
        file && typeof file === "object" && "name" in file && "type" in file;
      const hasUrl =
        fileUrl && typeof fileUrl === "string" && fileUrl.startsWith("https");

      return !!(hasFile || hasUrl);
    },
    [getFileFromForm, getFileUrlFromProfile]
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

      // Clear the main field (File object)
      setValue(`documents.0.${formFieldName}` as any, "");

      // Clear the URL field if it exists
      const urlFieldName = `${formFieldName}Url`;
      setValue(`documents.0.${urlFieldName}` as any, "");

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
  const openFileViewer = useCallback(
    (file: File | null, fileUrl?: string, fileName?: string) => {
      setViewerModal({ isOpen: true, file, fileUrl, fileName });
    },
    []
  );

  const closeFileViewer = useCallback(() => {
    setViewerModal({ isOpen: false, file: null });
  }, []);

  // Helper functions
  const getFileIcon = useCallback((fileType: string, fileUrl?: string) => {
    if (fileType?.startsWith("image/")) return "mdi:image";
    if (fileType === "application/pdf") return "mdi:file-pdf-box";

    // For URLs, use extension to determine icon
    if (fileUrl) {
      const extension = getFileExtensionFromS3Url(fileUrl);
      if (
        extension &&
        ["jpg", "jpeg", "png"].includes(extension.toLowerCase())
      ) {
        return "mdi:image";
      }
      if (extension && extension.toLowerCase() === "pdf") {
        return "mdi:file-pdf-box";
      }
    }

    return "mdi:file-document";
  }, []);

  // Create blob URL on-demand for image previews
  const getImageUrl = useCallback((file: File): string => {
    return URL.createObjectURL(file);
  }, []);

  // Render file preview component with priority logic
  const renderFilePreview = useCallback(
    (documentId: string) => {
      const file = getFileFromForm(documentId);
      const fileUrl = getFileUrlFromProfile(documentId);
      const fileName = getFileNameFromData(documentId);

      // Check if we have a File object (priority) or a URL
      const hasFile =
        file && typeof file === "object" && "name" in file && "type" in file;
      const hasUrl =
        fileUrl && typeof fileUrl === "string" && fileUrl.startsWith("https");

      // Determine file type using extension for URLs
      const isImage = hasFile
        ? file.type.startsWith("image/")
        : hasUrl &&
          (() => {
            const extension = getFileExtensionFromS3Url(fileUrl);
            return (
              extension &&
              ["jpg", "jpeg", "png"].includes(extension.toLowerCase())
            );
          })();

      const isPdf = hasFile
        ? file.type === "application/pdf"
        : hasUrl &&
          (() => {
            const extension = getFileExtensionFromS3Url(fileUrl);
            return extension && extension.toLowerCase() === "pdf";
          })();

      // Determine display name and file type
      const displayName =
        fileName || (isImage ? "Image" : isPdf ? "Document.pdf" : "Document");

      return (
        <div className="w-[209px] p-2 bg-orange-50 border border-orange-200 rounded-md">
          <div className="flex items-center gap-3">
            {/* File Preview/Icon */}
            <div className="flex-shrink-0">
              {isImage ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border">
                  {hasFile ? (
                    <Image
                      src={imageUrls[documentId] || getImageUrl(file)}
                      alt={displayName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() =>
                        openFileViewer(file, fileUrl || undefined, displayName)
                      }
                    />
                  ) : hasUrl ? (
                    <Image
                      src={fileUrl}
                      alt={displayName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() =>
                        openFileViewer(file, fileUrl || undefined, displayName)
                      }
                    />
                  ) : null}
                </div>
              ) : (
                <div
                  className="w-12 h-12 rounded-lg bg-white border flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    openFileViewer(file, fileUrl || undefined, displayName)
                  }
                >
                  <Icon
                    icon={getFileIcon(file?.type || "", fileUrl || undefined)}
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
                {displayName}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    openFileViewer(file, fileUrl || undefined, displayName)
                  }
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
    [
      getFileFromForm,
      getFileUrlFromProfile,
      getFileNameFromData,
      imageUrls,
      getImageUrl,
      openFileViewer,
      getFileIcon,
      removeFile,
    ]
  );

  // Render document field with appropriate preview
  const renderDocumentField = useCallback(
    (documentId: string, label: string, isRequired: boolean = false) => {
      const hasData = hasDocumentData(documentId);

      return (
        <div className="flex flex-col gap-2 flex-1 w-full">
          <div
            className={cn(
              "w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
              errors.documents?.[0]?.[
                documentId as keyof (typeof errors.documents)[0]
              ] && "border-destructive"
            )}
            onClick={() => handleFileSelect(documentId)}
          >
            <Image
              src="/Upload.svg"
              alt="Upload"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              {label}
              {isRequired && <span className="text-red-600 ml-1">*</span>}
            </span>
          </div>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => handleFileChange(documentId, e)}
            ref={(el) => {
              fileInputRefs.current[documentId] = el;
            }}
          />
          {hasData && renderFilePreview(documentId)}
          {/* Error display */}
          {errors.documents?.[0]?.[
            documentId as keyof (typeof errors.documents)[0]
          ] && (
            <p className="text-red-500 text-xs mt-1">
              {
                (
                  errors.documents[0][
                    documentId as keyof (typeof errors.documents)[0]
                  ] as any
                )?.message
              }
            </p>
          )}
        </div>
      );
    },
    [
      hasDocumentData,
      errors,
      handleFileSelect,
      handleFileChange,
      renderFilePreview,
    ]
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
            {renderDocumentField("tradeLicense", "Trade License", true)}
            <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />
            {renderDocumentField("vatCertificate", "Vat certificate", true)}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px] mt-6">
            {renderDocumentField("passport", "Passport copy", true)}
            <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />
            {renderDocumentField("emiratesId", "Emirates ID", true)}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px] mt-6">
            {renderDocumentField("securityCheque", "Security Cheque", false)}
            <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />
            {renderDocumentField("contract", "Contract", true)}
          </div>

          <div className="flex flex-col items-center gap-2 flex-1 w-full mt-6">
            {renderDocumentField("other", "Others", false)}
          </div>
        </div>
      </motion.div>

      {/* File Viewer Modal */}
      <FileViewerModal
        isOpen={viewerModal.isOpen}
        onClose={closeFileViewer}
        file={viewerModal.file}
        fileUrl={viewerModal.fileUrl}
        fileName={viewerModal.fileName}
      />
    </>
  );
};

export default Register6;

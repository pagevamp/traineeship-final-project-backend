"use client";

import { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import MenuBar from "./MenuBar";
import { Upload } from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = useCallback((file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-[2ch]",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: `min-h-[86px] outline-none text-sm rounded-md bg-white py-2 px-3 ${
          isDragging ? "border-blue-500 bg-blue-50" : ""
        }`,
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          event.preventDefault();

          const files = Array.from(event.dataTransfer.files);
          if (files.some((file) => !file.type.startsWith("image/"))) {
            return false;
          }

          files.forEach(async (file) => {
            const imageUrl = await handleImageUpload(file);
            if (imageUrl) {
              editor?.chain().focus().setImage({ src: imageUrl }).run();
            }
          });
          return true;
        }
        return false;
      },
      handlePaste: (view, event) => {
        if (event.clipboardData?.files?.length) {
          event.preventDefault();

          const files = Array.from(event.clipboardData.files);
          if (files.some((file) => !file.type.startsWith("image/"))) {
            return false;
          }

          files.forEach(async (file) => {
            const imageUrl = await handleImageUpload(file);
            if (imageUrl) {
              editor?.chain().focus().setImage({ src: imageUrl }).run();
            }
          });
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes("Files")) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragging(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files);
      for (const file of files) {
        if (file.type.startsWith("image/")) {
          const imageUrl = await handleImageUpload(file);
          if (imageUrl) {
            editor?.chain().focus().setImage({ src: imageUrl }).run();
          }
        }
      }
    }
  };

  return (
    <div
      className="relative"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="p-2 sticky top-0 z-10">
        <MenuBar
          editor={editor}
          onImageUpload={() => document.getElementById("image-upload")?.click()}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

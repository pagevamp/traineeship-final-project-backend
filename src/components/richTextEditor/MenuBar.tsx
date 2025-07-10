import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Image as ImageIcon,
  Underline,
  Link,
} from "lucide-react";
import { ReactNode } from "react";
import { Toggle } from "../ui/toggle";

interface MenuItemProps {
  icon: ReactNode;
  onClick: () => void;
  isActive: boolean;
  tooltip?: string;
  disabled?: boolean;
}

function MenuItem({
  icon,
  onClick,
  isActive,
  tooltip = "",
  disabled = false,
}: MenuItemProps) {
  return (
    <Toggle
      pressed={isActive}
      onPressedChange={onClick}
      aria-label={tooltip}
      disabled={disabled}
      className="hover:bg-primary-light data-[state=on]:bg-primary-light"
    >
      {icon}
    </Toggle>
  );
}

interface MenuBarProps {
  editor: any | null;
  onImageUpload: () => void;
}

export default function MenuBar({ editor, onImageUpload }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const menuItems = [
    // {
    //   icon: <Heading1 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    //   isActive: editor.isActive("heading", { level: 1 }),
    //   tooltip: "Heading 1",
    // },
    // {
    //   icon: <Heading2 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    //   isActive: editor.isActive("heading", { level: 2 }),
    //   tooltip: "Heading 2",
    // },
    // {
    //   icon: <Heading3 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    //   isActive: editor.isActive("heading", { level: 3 }),
    //   tooltip: "Heading 3",
    // },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: <Underline className="size-4" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      tooltip: "Underline",
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      tooltip: "Strikethrough",
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
      tooltip: "Align Left",
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
      tooltip: "Align Center",
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
      tooltip: "Align Right",
    },
    // {
    //   icon: <List className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleBulletList().run(),
    //   isActive: editor.isActive("bulletList"),
    //   tooltip: "Bullet List",
    // },
    // {
    //   icon: <ListOrdered className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleOrderedList().run(),
    //   isActive: editor.isActive("orderedList"),
    //   tooltip: "Ordered List",
    // },
    // {
    //   icon: <ImageIcon className="size-4" />,
    //   onClick: onImageUpload,
    //   isActive: false,
    //   tooltip: "Insert Image",
    // },
    // {
    //   icon: <Link className="size-4" />,
    //   onClick: setLink,
    //   isActive: editor.isActive("link"),
    //   tooltip: "Insert Link",
    // },
  ];

  return (
    <div className="rounded-md shadow-md border mb-1 bg-white space-x-2 z-50 flex flex-wrap">
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          onClick={item.onClick}
          isActive={item.isActive}
          tooltip={item.tooltip}
        />
      ))}
    </div>
  );
}

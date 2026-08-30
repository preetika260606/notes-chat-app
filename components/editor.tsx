"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Strikethrough,
} from "lucide-react";

interface EditorProps {
  initialContent?: string;
  documentId: Id<"documents">;
  preview?: boolean;
}

interface ToolButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: ReactNode;
}

export const Editor = ({
  initialContent = "",
  documentId,
  preview = false,
}: EditorProps) => {
  const [characterCount, setCharacterCount] = useState(0);

  const [wordCount, setWordCount] = useState(0);

  // Convex update mutation
  const update = useMutation(api.documents.update);

  // Save status
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">(
    "saved",
  );

  // Timer for autosave
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateCounts = (editor: any) => {
    const text = editor.getText().trim();

    const characters = text.length;

    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;

    setCharacterCount(characters);

    setWordCount(words);
  };

  const editor = useEditor({
    immediatelyRender: false,
    editable: !preview,
    extensions: [
      StarterKit,

      Placeholder.configure({
        placeholder: "Start writing your note...",
      }),
    ],

    content: initialContent,

    editorProps: {
      attributes: {
        class:
          "outline-none min-h-[500px] py-4 text-[16px] leading-8 text-foreground focus:outline-none",
      },
    },

    onCreate: ({ editor }) => {
      updateCounts(editor);
    },

    onUpdate: ({ editor }) => {
      updateCounts(editor);

      if (preview) return;

      setSaveStatus("saving");

      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }

      saveTimeout.current = setTimeout(async () => {
        try {
          await update({
            id: documentId,
            content: editor.getHTML(),
          });

          setSaveStatus("saved");
        } catch (error) {
          console.error("Failed to save document:", error);
          setSaveStatus("error");
        }
      }, 700);
    },
  });

  useEffect(() => {
    if (!editor) return;

    const content = initialContent ?? "";

    if (editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
      updateCounts(editor);
    }
  }, [editor, initialContent]);

  useEffect(() => {
    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, []);

  if (!editor) {
    return (
      <div className="min-h-[500px] animate-pulse">
        <div className="h-10 w-full rounded-md bg-muted" />
      </div>
    );
  }

  const ToolButton = ({
    onClick,
    isActive = false,
    disabled = false,
    title,
    children,
  }: ToolButtonProps) => {
    return (
      <button
        type="button"
        title={title}
        onClick={onClick}
        disabled={disabled}
        className={`flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 ${
          isActive
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        } disabled:cursor-not-allowed disabled:opacity-40`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="w-full pb-40">
      {/* Toolbar */}
      {!preview && (
        <div className="sticky top-0 z-20 mb-6 flex items-center gap-1 overflow-x-auto rounded-lg border bg-background px-2 py-2 shadow-sm">
          <ToolButton
            title="Undo"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </ToolButton>

          <ToolButton
            title="Redo"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </ToolButton>

          <div className="mx-1 h-6 w-px bg-border" />

          <ToolButton
            title="Bold"
            isActive={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </ToolButton>

          <ToolButton
            title="Italic"
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </ToolButton>

          <ToolButton
            title="Strikethrough"
            isActive={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </ToolButton>

          <div className="mx-1 h-6 w-px bg-border" />

          <ToolButton
            title="Heading 1"
            isActive={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="h-4 w-4" />
          </ToolButton>

          <ToolButton
            title="Heading 2"
            isActive={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </ToolButton>

          <div className="mx-1 h-6 w-px bg-border" />

          <ToolButton
            title="Bullet List"
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </ToolButton>

          <ToolButton
            title="Numbered List"
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolButton>

          <ToolButton
            title="Quote"
            isActive={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </ToolButton>

          <ToolButton
            title="Code Block"
            isActive={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code className="h-4 w-4" />
          </ToolButton>
        </div>
      )}

      {/* Editor Area */}
      <div className="editor-content min-h-[500px]">
        <EditorContent editor={editor} />
      </div>

      {/* Footer */}
      {!preview && (
        <div className="mt-10 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>
            {characterCount.toLocaleString()} characters ·{" "}
            {wordCount.toLocaleString()} words
          </span>

          <span>
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "saved" && "Saved ✓"}
            {saveStatus === "error" && "Failed to save"}
          </span>
        </div>
      )}
    </div>
  );
};

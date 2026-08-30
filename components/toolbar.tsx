"use client";
import { useMutation } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { Button } from "@/components/./ui/button";
import { ImageIcon, Smile, X, Share2, Copy } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { ElementRef, useRef, useState } from "react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useQuery } from "convex/react";
import { Star } from "lucide-react";
import { toast } from "sonner";
interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
  const coverImage = useCoverImage();
  const toggleFavorite = useMutation(api.documents.toggleFavorite);
  const onPublish = () => {
    update({
      id: initialData._id,
      isPublished: !initialData.isPublished,
    });
  };
  const onCopyLink = () => {
    const url = `${window.location.origin}/preview/${initialData._id}`;

    navigator.clipboard.writeText(url);

    toast.success("Public link copied!");
  };
  const document = useQuery(api.documents.getById, {
    documentId: initialData._id,
  });
  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);
  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "untitled",
    });
  };

  const onkeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event?.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    console.log("Selected icon:", icon);
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };
  return (
    <div className="pl-[54px] group relative">
      {!preview && (
        <div className="flex justify-end gap-2 pt-4">
          {initialData.isPublished && (
            <Button onClick={onCopyLink} variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy link
            </Button>
          )}

          <Button
            onClick={onPublish}
            variant={initialData.isPublished ? "outline" : "default"}
            size="sm"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {initialData.isPublished ? "Unpublish" : "Publish"}
          </Button>
        </div>
      )}
      {!!document?.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {document?.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>

          <button
            onClick={() => toggleFavorite({ id: initialData._id })}
            className="p-2 hover:bg-muted rounded-md transition"
            title={
              initialData.isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <Star
              className={`h-5 w-5 ${
                initialData.isFavorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onkeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};

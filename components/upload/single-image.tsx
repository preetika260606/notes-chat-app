"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useUploader } from "./uploader-provider";

interface SingleImageDropzoneProps {
  width: number;
  height: number;
  dropzoneOptions?: {
    maxSize?: number;
  };
  onUploadComplete?: (url: string) => void;
}

export const SingleImageDropzone = ({
  width,
  height,
  dropzoneOptions,
  onUploadComplete,
}: SingleImageDropzoneProps) => {
  const { uploadFn } = useUploader();
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);

      try {
        const res = await uploadFn({
          file,
          onProgressChange: (progress) => {
            console.log("Uploading:", progress);
          },
        });

        setFileUrl(res);
        onUploadComplete?.(res);
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
      }
      
    },
    [uploadFn]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: dropzoneOptions?.maxSize,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex items-center justify-center border border-dashed rounded-md cursor-pointer overflow-hidden",
        uploading && "opacity-50"
      )}
      style={{ width, height }}
    >
      <input {...getInputProps()} />

      {fileUrl ? (
        <img
          src={fileUrl}
          alt="Uploaded"
          className="object-cover w-full h-full"
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          {uploading ? "Uploading..." : "Click or drag image"}
        </p>
      )}
    </div>
  );
};
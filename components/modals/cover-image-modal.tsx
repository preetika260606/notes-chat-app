"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "../upload/single-image";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);

      const res = await edgestore.publicImages.upload({
        file,
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Cover Image</DialogTitle>
        </DialogHeader>

        <SingleImageDropzone
          width={400}
          height={200}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 2,
          }}
          onUploadComplete={async (url) => {
            setIsSubmitting(true);

            await update({
              id: params.documentId as Id<"documents">,
              coverImage: url,
            });

            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

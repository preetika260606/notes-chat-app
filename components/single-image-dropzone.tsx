"use client";

import { SingleImageDropzone } from "@/components/upload/single-image";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import * as React from "react";

export function SingleImageDropzoneUsage() {
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = React.useCallback(
    async (args) => {
      const { file, onProgressChange, signal } = args;

      const res = await edgestore.publicImages.upload({
        file,
        signal,
        onProgressChange,
      });

      console.log(res);
      return res.url;
    },
    [edgestore]
  );

  return (
    <UploaderProvider uploadFn={uploadFn}>
      <SingleImageDropzone
        height={200}
        width={200}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1,
        }}
      />
    </UploaderProvider>
  );
}
"use client";

import { UploaderProvider } from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";

export const UploaderProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { edgestore } = useEdgeStore();

  const uploadFn = async ({ file, onProgressChange }: any) => {
    const res = await edgestore.publicImages.upload({
      file,
      onProgressChange,
    });

    return res.url;
  };

  return (
    <UploaderProvider uploadFn={uploadFn}>
      {children}
    </UploaderProvider>
  );
};
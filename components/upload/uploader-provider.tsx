"use client";

import React, { createContext, useContext } from "react";

export type UploadFn = (args: {
  file: File;
  onProgressChange?: (progress: number) => void;
  signal?: AbortSignal;
}) => Promise<any>;

const UploadContext = createContext<{
  uploadFn: UploadFn;
} | null>(null);

export const UploaderProvider = ({
  children,
  uploadFn,
}: {
  children: React.ReactNode;
  uploadFn: UploadFn;
}) => {
  return (
    <UploadContext.Provider value={{ uploadFn }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUploader = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploader must be used within UploaderProvider");
  }
  return context;
};
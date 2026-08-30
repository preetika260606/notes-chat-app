"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Editor } from "@/components/editor";

const PreviewPage = () => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return <div className="p-10">Loading...</div>;
  }

  if (document === null || !document.isPublished) {
    return <div className="p-10">This note is not available.</div>;
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />

      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} preview />

        <Editor
          initialContent={document.content}
          documentId={document._id}
          preview
        />
      </div>
    </div>
  );
};

export default PreviewPage;
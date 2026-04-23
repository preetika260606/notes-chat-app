import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { initEdgeStore } from "@edgestore/server";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicImages: es.imageBucket(),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
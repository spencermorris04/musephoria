import { postRouter } from "~/server/api/routers/post";
import { screenplayUploadRouter } from "~/server/api/routers/screenplayUpload"; // Import the new router
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { screenplayRetrieveRouter } from "~/server/api/routers/screenplayRetrieve";
import { userRouter } from "~/server/api/routers/user";
import { screenplayProcessRouter } from "~/server/api/routers/screenplayProcess";
import { summarizeRouter } from "~/server/api/routers/summarize";
import { beatsheetRouter } from "./routers/beatsheetGenerator";
import { beatsheetUploaderRouter } from "./routers/beatsheetUploader";
import { characterSheetGeneratorRouter } from "./routers/characterSheetGenerator";
import { characterSheetUploaderRouter } from "./routers/characterSheetUploader";
import { characterSheetRetrieverRouter } from "./routers/characterSheetRetriever";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  post: postRouter,
  screenplayUpload: screenplayUploadRouter,
  screenplayRetrieve: screenplayRetrieveRouter,
  screenplayProcess: screenplayProcessRouter,
  user: userRouter,
  summarize: summarizeRouter,
  beatsheetGenerator: beatsheetRouter,
  beatsheetUploader: beatsheetUploaderRouter,
  characterSheetGenerator: characterSheetGeneratorRouter,
  characterSheetUploader: characterSheetUploaderRouter,
  characterSheetRetriever: characterSheetRetrieverRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

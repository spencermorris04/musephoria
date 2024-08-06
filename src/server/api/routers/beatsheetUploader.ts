// src/server/api/routers/beatsheetUploader.ts

import { z } from "zod";
import { createTRPCRouter, protectedProcedure, TRPCError } from "~/server/api/trpc";
import firestore from "~/server/firestore";

// Update the SummarySchema to expect a string
const SummarySchema = z.string();

const BeatSheetSchema = z.object({
  openingImage: z.string(),
  themeStated: z.string(),
  setup: z.string(),
  catalyst: z.string(),
  debate: z.string(),
  breakIntoTwo: z.string(),
  bStory: z.string(),
  funAndGames: z.string(),
  midpoint: z.string(),
  badGuysCloseIn: z.string(),
  allIsLost: z.string(),
  darkNightOfTheSoul: z.string(),
  breakIntoThree: z.string(),
  finale: z.string(),
  finalImage: z.string()
});

export const beatsheetUploaderRouter = createTRPCRouter({
  uploadBeatSheet: protectedProcedure
    .input(
      z.object({
        screenplayId: z.string(),
        summary: SummarySchema,  // Expect a single string for summary
        beatSheet: BeatSheetSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        if (!userId) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not authenticated' });
        }

        const { screenplayId, summary, beatSheet } = input;
        const screenplayRef = firestore.collection('screenplays').doc(screenplayId);

        // First, check if the screenplay belongs to the current user
        const screenplayDoc = await screenplayRef.get();
        if (!screenplayDoc.exists) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Screenplay not found' });
        }
        const screenplayData = screenplayDoc.data();
        if (screenplayData?.userId !== userId) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'You do not have permission to update this screenplay' });
        }

        // Update the document with the new summary and beat sheet
        await screenplayRef.update({
          summary: summary,  // Save summary as a string
          beatSheet: beatSheet
        });

        return { success: true, message: "Beat sheet and summary uploaded successfully" };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error("Error uploading beat sheet and summary:", error);
        throw new TRPCError({ 
          code: 'INTERNAL_SERVER_ERROR', 
          message: 'Failed to upload beat sheet and summary' 
        });
      }
    }),
});

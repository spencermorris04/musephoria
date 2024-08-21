import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { CharacterSheetSchema, CharacterSheet } from "./characterSheetGenerator";
import firestore from "~/server/firestore";

export const characterSheetRetrieverRouter = createTRPCRouter({
  getCharacterSheet: protectedProcedure
    .input(z.object({
      screenplayId: z.string(),
      characterName: z.string(),
    }))
    .query(async ({ input }) => {
      try {
        const { screenplayId, characterName } = input;

        const screenplayDoc = await firestore.collection('screenplays').doc(screenplayId).get();

        if (!screenplayDoc.exists) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: "Screenplay not found",
          });
        }

        const screenplayData = screenplayDoc.data();
        const characterSheet = screenplayData?.characterSheets?.[characterName] as CharacterSheet | undefined;

        if (!characterSheet) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: "Character sheet not found",
          });
        }

        return CharacterSheetSchema.parse(characterSheet);
      } catch (error) {
        console.error("Error retrieving character sheet:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Failed to retrieve character sheet",
        });
      }
    }),
});
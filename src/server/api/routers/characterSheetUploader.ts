import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { CharacterSheetSchema, CharacterSheet } from "./characterSheetGenerator";
import firestore from "~/server/firestore";

export const characterSheetUploaderRouter = createTRPCRouter({
  uploadCharacterSheet: protectedProcedure
    .input(z.object({
      screenplayId: z.string(),
      characterSheet: CharacterSheetSchema,
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { screenplayId, characterSheet } = input;
        const userId = ctx.session.user.id;

        const screenplayRef = firestore.collection('screenplays').doc(screenplayId);
        const screenplayDoc = await screenplayRef.get();

        if (!screenplayDoc.exists) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: "Screenplay not found",
          });
        }

        const screenplayData = screenplayDoc.data();
        if (screenplayData?.userId !== userId) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: "You don't have permission to update this screenplay",
          });
        }

        // Update the screenplay document with the new character sheet
        await screenplayRef.update({
          [`characterSheets.${characterSheet.characterMap.characterName}`]: characterSheet,
        });

        return { success: true, message: "Character sheet uploaded successfully" };
      } catch (error) {
        console.error("Error uploading character sheet:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Failed to upload character sheet",
        });
      }
    }),
});
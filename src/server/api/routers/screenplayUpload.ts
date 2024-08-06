import { z } from "zod";
import { createTRPCRouter, protectedProcedure, TRPCError } from "~/server/api/trpc";
import firestore from "~/server/firestore";

const ScreenplayElementSchema = z.object({
  line_number: z.number(),
  text: z.string()
});

const DialogueSchema = z.object({
  character: z.string(),
  line: ScreenplayElementSchema
});

const SceneSchema = z.object({
  heading: ScreenplayElementSchema,
  screen_directions: z.array(ScreenplayElementSchema),
  dialogues: z.array(DialogueSchema)
});

const CharacterSchema = z.object({
  name: z.string(),
  dialogue: z.array(ScreenplayElementSchema)
});

const ScreenplaySchema = z.object({
  title: z.string(),
  author: z.string(),
  preliminaryContent: z.array(ScreenplayElementSchema),
  scenes: z.array(SceneSchema),
  characters: z.array(CharacterSchema)
});

export const screenplayUploadRouter = createTRPCRouter({
  uploadScreenplay: protectedProcedure
    .input(z.object({
      screenplay: ScreenplaySchema
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        if (!userId) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not authenticated' });
        }

        const screenplayWithUserId = {
          ...input.screenplay,
          userId: userId
        };

        const docRef = await firestore.collection('screenplays').add(screenplayWithUserId);
        return { id: docRef.id, message: 'Screenplay uploaded successfully' };
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new TRPCError({ 
            code: 'INTERNAL_SERVER_ERROR', 
            message: error.message || 'An unexpected error occurred' 
          });
        } else {
          throw new TRPCError({ 
            code: 'INTERNAL_SERVER_ERROR', 
            message: 'An unexpected error occurred' 
          });
        }
      }
    }),
});
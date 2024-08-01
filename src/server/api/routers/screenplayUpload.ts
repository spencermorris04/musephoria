import { z } from "zod";
import { createTRPCRouter, protectedProcedure, TRPCError } from "~/server/api/trpc";
import firestore from "~/server/firestore";

export const screenplayUploadRouter = createTRPCRouter({
  uploadScreenplay: protectedProcedure
    .input(z.object({
      screenplay: z.object({
        title: z.string(),
        author: z.string(),
        preliminaryContent: z.array(z.object({
          line_number: z.number(),
          text: z.string()
        })),
        scene_headings: z.array(z.object({
          line_number: z.number(),
          text: z.string()
        })),
        characters: z.array(z.object({
          name: z.string(),
          dialogue: z.array(z.object({
            line_number: z.number(),
            text: z.string()
          }))
        })),
        screen_directions: z.array(z.object({
          line_number: z.number(),
          text: z.string()
        })),
        dialogues: z.array(z.object({
          line_number: z.number(),
          text: z.string()
        }))
      })
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
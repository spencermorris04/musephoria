import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import firestore from "~/server/firestore";

export const userRouter = createTRPCRouter({
  getUserProfile: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const userDoc = await firestore.collection('users').doc(input.userId).get();
      return userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
    }),

  createOrUpdateUserProfile: protectedProcedure
    .input(z.object({
      userId: z.string(),
      name: z.string(),
      email: z.string().email(),
      image: z.string().optional(),
      bio: z.string(),
    }))
    .mutation(async ({ input }) => {
      await firestore.collection('users').doc(input.userId).set(input, { merge: true });
      return { success: true };
    }),
});
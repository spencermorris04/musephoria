import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import firestore from "~/server/firestore";

// Define a type for the user document data
interface UserDocument {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
}

export const userRouter = createTRPCRouter({
  getUserProfile: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const userDoc = await firestore.collection('users').doc(input.userId).get();
      if (!userDoc.exists) return null;
      
      const userData = userDoc.data() as Omit<UserDocument, 'id'>;
      return {
        id: userDoc.id,
        name: userData.name ?? "",
        email: userData.email ?? "",
        image: userData.image ?? "",
        bio: userData.bio ?? "",
      } as UserDocument;
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
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import firestore from "~/server/firestore";

export const screenplayRetrieveRouter = createTRPCRouter({
  getUserScreenplays: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const screenplaysSnapshot = await firestore.collection('screenplays').where('userId', '==', input.userId).get();
      
      if (screenplaysSnapshot.empty) {
        return [];
      }
      
      return screenplaysSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }),

    getAllScreenplays: protectedProcedure
  .query(async () => {
    const screenplaysSnapshot = await firestore.collection('screenplays').get();
    
    return screenplaysSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }),
  
  getScreenplayById: protectedProcedure
    .input(z.object({ screenplayId: z.string() }))
    .query(async ({ ctx, input }) => {
      const screenplayDoc = await firestore.collection('screenplays').doc(input.screenplayId).get();
      
      if (!screenplayDoc.exists) {
        return null;
      }
      
      return {
        id: screenplayDoc.id,
        ...screenplayDoc.data()
      };
    }),
});


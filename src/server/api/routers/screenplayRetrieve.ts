import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import firestore from "~/server/firestore";

// Extend the screenplaySchema with optional summary, beatSheet, and userId
const screenplaySchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  userId: z.string(), // Add userId field
  summary: z.string().optional(), // Make summary field optional
  beatSheet: z
    .object({
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
      finalImage: z.string(),
    })
    .optional(), // Make the entire beatSheet object optional
  preliminaryContent: z.array(
    z.object({ line_number: z.number(), text: z.string() })
  ),
  scenes: z.array(
    z.object({
      heading: z.object({ line_number: z.number(), text: z.string() }),
      screen_directions: z.array(
        z.object({ line_number: z.number(), text: z.string() })
      ),
      dialogues: z.array(
        z.object({
          character: z.string(),
          line: z.object({ line_number: z.number(), text: z.string() }),
        })
      ),
    })
  ),
  characters: z.array(
    z.object({
      name: z.string(),
      dialogue: z.array(
        z.object({ line_number: z.number(), text: z.string() })
      ),
    })
  ),
});


export const screenplayRetrieveRouter = createTRPCRouter({
  getUserScreenplays: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const screenplaysSnapshot = await firestore
        .collection("screenplays")
        .where("userId", "==", input.userId)
        .get();

      if (screenplaysSnapshot.empty) {
        return [];
      }

      return screenplaysSnapshot.docs.map((doc) =>
        screenplaySchema.parse({ id: doc.id, ...doc.data() })
      );
    }),

  getAllScreenplays: protectedProcedure.query(async () => {
    const screenplaysSnapshot = await firestore.collection("screenplays").get();

    return screenplaysSnapshot.docs.map((doc) =>
      screenplaySchema.parse({ id: doc.id, ...doc.data() })
    );
  }),

  getScreenplayById: protectedProcedure
    .input(z.object({ screenplayId: z.string() }))
    .query(async ({ input }) => {
      const screenplayDoc = await firestore
        .collection("screenplays")
        .doc(input.screenplayId)
        .get();

      if (!screenplayDoc.exists) {
        return null;
      }

      return screenplaySchema.parse({
        id: screenplayDoc.id,
        ...screenplayDoc.data(),
      });
    }),
});

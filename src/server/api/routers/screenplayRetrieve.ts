import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import firestore from "~/server/firestore";
import { TRPCError } from "@trpc/server";

// Define a schema for the character without dialogue
const characterWithoutDialogueSchema = z.object({
  name: z.string(),
});

// Extend the existing screenplaySchema
const screenplaySchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  userId: z.string(),
  summary: z.string().optional(),
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
    .optional(),
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

  getScreenplayCharacters: protectedProcedure
  .input(z.object({ screenplayId: z.string() }))
  .query(async ({ input }) => {
    try {
      const screenplayDoc = await firestore
        .collection("screenplays")
        .doc(input.screenplayId)
        .get();

      if (!screenplayDoc.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Screenplay not found",
        });
      }

      const screenplayData = screenplaySchema.parse({
        id: screenplayDoc.id,
        ...screenplayDoc.data(),
      });

      // Extract unique characters from the screenplay
      const uniqueCharacters = new Set<string>();

      // Add characters from the characters array
      screenplayData.characters.forEach(char => uniqueCharacters.add(char.name));

      // Add characters from dialogues in scenes
      screenplayData.scenes.forEach(scene => {
        scene.dialogues.forEach(dialogue => uniqueCharacters.add(dialogue.character));
      });

      // Convert the Set to an array of character objects
      const characters = Array.from(uniqueCharacters).map(name => ({ name }));

      return characterWithoutDialogueSchema.array().parse(characters);
    } catch (error) {
      console.error("Error retrieving screenplay characters:", error);
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Failed to retrieve screenplay characters",
      });
    }
  }),

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

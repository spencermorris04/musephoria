import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env.js";
import { TRPCError } from "@trpc/server";
import firestore from "~/server/firestore";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const CharacterSheetSchema = z.object({
  characterMap: z.object({
    characterName: z.string(),
    originOfUrge: z.string(),
    coreUrge: z.string(),
    statedBelief: z.string(),
    goals: z.string(),
    relationships: z.string(),
    lifestyle: z.string(),
    presentation: z.string(),
    dialogue: z.string(),
  }),
  characterArc: z.object({
    atFirst: z.string(),
    laterOn: z.string(),
    outcomes: z.string(),
    overcomeUrge: z.enum(['yes', 'no', 'worse']),
    changedGoals: z.string(),
    changedRelationships: z.string(),
    changedLifestyle: z.string(),
    changedPresentation: z.string(),
    changedDialogue: z.string(),
  }),
  moreAttributes: z.object({
    mood: z.string(),
    hobbies: z.string(),
    skills: z.string(),
    habits: z.string(),
    tastes: z.string(),
    weaknesses: z.string(),
    extraInfo: z.string(),
  }),
  perspectives: z.object({
    characters: z.array(z.object({
      name: z.string(),
      copingStrategy: z.string(),
      relationship: z.string(),
    })),
    sharedNegativeExperience: z.string(),
  }),
});

export type CharacterSheet = z.infer<typeof CharacterSheetSchema>;

export const characterSheetGeneratorRouter = createTRPCRouter({
  generateCharacterSheet: protectedProcedure
    .input(z.object({
      screenplayId: z.string(),
      characterName: z.string(),
    }))
    .mutation(async ({ input }) => {
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
        const summary = screenplayData?.summary;

        if (!summary) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: "Screenplay summary not found",
          });
        }

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an expert screenplay analyst tasked with creating a detailed character sheet based on a screenplay summary. Focus on the character provided and generate a comprehensive character sheet.",
            },
            {
              role: "user",
              content: `Create a detailed character sheet for ${characterName} based on the following screenplay summary. Include information for the character map, character arc, more attributes, and perspectives.

Summary:
${summary}

Please provide the character sheet in a structured JSON format that matches the following schema:
${JSON.stringify(CharacterSheetSchema.shape, null, 2)}`,
            },
          ],
          response_format: { type: "json_object" },
          max_tokens: 4000,
          temperature: 0.7,
        });

        const characterSheetContent = completion.choices[0]?.message.content;
        if (!characterSheetContent) {
          throw new Error("No content received from OpenAI");
        }

        const characterSheet = CharacterSheetSchema.parse(JSON.parse(characterSheetContent));

        return characterSheet;
      } catch (error) {
        console.error("Error generating character sheet:", error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Failed to generate character sheet",
        });
      }
    }),
});
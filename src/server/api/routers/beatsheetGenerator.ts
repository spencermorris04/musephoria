import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { env } from "~/env.js";

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// Define a Zod schema for the beat sheet
const Beat = z.object({
  beat: z.string(),    // Define the 'beat' property as a string
  content: z.string(), // Define the 'content' property as a string
});

// Define a schema for the array of beats
const BeatSheetSchema = z.array(Beat); // Define the BeatSheet as an array of Beat objects

export const beatsheetRouter = createTRPCRouter({
  generateBeatSheet: protectedProcedure
    .input(
      z.object({
        summary: z.string(), // Expect a 'summary' string input from the user
      })
    )
    .mutation(async ({ input }) => {
      try {
        const completion = await openai.beta.chat.completions.parse({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an expert screenplay analyst tasked with creating a Save the Cat beat sheet based on a screenplay summary. Return the beat sheet in JSON format, with each beat as an object containing a 'beat' name and 'content'.",
            },
            {
              role: "user",
              content: `Create a Save the Cat beat sheet based on the following screenplay summary. Follow the 15-beat structure and provide detailed descriptions for each beat in JSON format. Ensure that your beat sheet aligns with the story elements present in the summary.

Summary:
${input.summary}

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Ensure that you are evaluating the totality of the screenplay in your analysis and maintain temporal consistency with the provided summary. Be as precise and holistic in your analysis of each beat as possible, providing full context for each beat.

Format your response as a JSON array where each beat is an object with a "beat" and "content" property.

Write the output in such a way that it could be directly parsed as json. That means that you should not include 'Json' at the beginning or any other text that is not part of the json structure.

Again, assume that the summary represents the full screenplay. DO NOT TAKE ONE PART OF THE SCREENPLAY AND FOCUS THE ENTIRE BEAT SHEET ON IT. The Dark Night of the Soul should be near the end of the screenplay, certainly not in the first half.

The beat sheet must be linear! This means that the events MUST OCCUR in the same order as they do in the summary provided.
`,
            },
          ],
          max_tokens: 3000,
          temperature: 0.7,
          response_format: zodResponseFormat(BeatSheetSchema, "beat_sheet"),  // Use the zodResponseFormat with BeatSheetSchema
        });

        // Check if the choices array is not empty and contains the expected data
        if (completion.choices && completion.choices.length > 0) {
          const choice = completion.choices[0];
          
          // Check if the response contains a refusal
          if (choice?.message?.refusal) {
            throw new Error("Model refused to fulfill the request.");
          }

          // Parse the structured data from the response
          const beatSheet = choice?.message?.parsed;
          
          // Return the structured data directly
          return {
            beatSheet: beatSheet ?? "Failed to generate beat sheet.",
          };
        } else {
          throw new Error("No choices returned in the response.");
        }
      } catch (error) {
        console.error("Error generating beat sheet:", error);
        throw new Error("Failed to generate beat sheet");
      }
    }),
});
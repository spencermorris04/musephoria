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
  beat: z.string(),
  content: z.string(),
});

const BeatSheetSchema = z.object({
  beat_sheet: z.array(Beat),
});

export const beatsheetRouter = createTRPCRouter({
  generateBeatSheet: protectedProcedure
    .input(
      z.object({
        summary: z.string(),
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

The beat sheet must be linear! This means that the events MUST OCCUR in the same order as they do in the summary provided.`,
            },
          ],
          response_format: zodResponseFormat(BeatSheetSchema, "beat_sheet"),
          max_tokens: 3000,
          temperature: 0.7,
        });

        const parsedMessage = completion.choices[0]?.message.parsed;
        if (!parsedMessage) {
          throw new Error("Failed to parse the beat sheet");
        }

        const beatSheet = parsedMessage.beat_sheet;
        if (!beatSheet) {
          throw new Error("Beat sheet is missing in the parsed response");
        }

        return {
          beatSheet: beatSheet,
        };
      } catch (error) {
        console.error("Error generating beat sheet:", error);
        throw new Error("Failed to generate beat sheet");
      }
    }),
});
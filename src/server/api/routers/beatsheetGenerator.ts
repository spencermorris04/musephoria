// src/server/api/routers/beatsheetGenerator.ts

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env.js";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
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
        const response = await openai.chat.completions.create({
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

Again, assume that the summary represents the full screenplay. DO NOT TAKE ONE PART OF THE SCREENPLAY AND FOCUS THE ENTIRE BEAT SHEET ON IT. The Dark Knight of the Soul should be near the end of the screenplay, certainly not in the first half.

The beat sheet must be linear! This means that the events MUST OCCUR in the same order as they do in the summary provided.

This is what the output should look like:

[
  {
    "beat": "Opening Image (1%)",
    "content": "[Describe the opening image]"
  },
  {
    "beat": "Theme Stated (5%)",
    "content": "[State the theme]"
  },
  {
    "beat": "Set-Up (1-10%)",
    "content": "[Describe the set-up]"
  },
  {
    "beat": "Catalyst (10%)",
    "content": "[Describe the catalyst]"
  },
  {
    "beat": "Debate (10-20%)",
    "content": "[Describe the debate]"
  },
  {
    "beat": "Break into Two (20%)",
    "content": "[Describe the break into two]"
  },
  {
    "beat": "B Story (22%)",
    "content": "[Describe the B Story]"
  },
  {
    "beat": "Fun and Games (20-50%)",
    "content": "[Describe the fun and games section]"
  },
  {
    "beat": "Midpoint (50%)",
    "content": "[Describe the midpoint]"
  },
  {
    "beat": "Bad Guys Close In (50-75%)",
    "content": "[Describe how the bad guys close in]"
  },
  {
    "beat": "All is Lost (75%)",
    "content": "[Describe the all is lost moment]"
  },
  {
    "beat": "Dark Night of the Soul (75-80%)",
    "content": "[Describe the dark night of the soul]"
  },
  {
    "beat": "Break into Three (80%)",
    "content": "[Describe the break into three]"
  },
  {
    "beat": "Finale (80-99%)",
    "content": "[Describe the finale]"
  },
  {
    "beat": "Final Image (99-100%)",
    "content": "[Describe the final image]"
  }
]`,
            },
          ],
          max_tokens: 3000,
          temperature: 0.7,
        });

        // Return the generated JSON string directly
        return {
          beatSheet: response.choices[0]?.message.content?.trim() ?? "Failed to generate beat sheet.",
        };
      } catch (error) {
        console.error("Error generating beat sheet:", error);
        throw new Error("Failed to generate beat sheet");
      }
    }),
});
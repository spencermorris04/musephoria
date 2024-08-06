import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env.js";

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const summarizeRouter = createTRPCRouter({
  generateSummary: protectedProcedure
    .input(
      z.object({
        chunk: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Use the gpt-4o-mini model for generating scene summaries
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini", // Ensure you're using the correct model
          messages: [
            {
              role: "system",
              content:
                "You are an expert screenplay analyst tasked with creating detailed scene-by-scene summaries. Your summaries should be comprehensive, leaving no plot details out. Use character names instead of pronouns whenever possible to maintain clarity. Add a line break between each scene summary.",
            },
            {
              role: "user",
              content: `Provide a detailed scene-by-scene summary of the following screenplay chunk. Be as specific as possible, use character names instead of pronouns, and ensure all plot points are included. Do not number the scene as this is just part of the screenplay, not necessarily the beginning.

${input.chunk}

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You should 

Format your response as follows:
**Scene Heading Content 1**
[Detailed summary of the first scene]

**Scene Heading Content 2**
[Detailed summary of the second scene]

...and so on for each scene in the chunk.

Ensure that there is a line break between each scene summary.`,
            },
          ],
          max_tokens: 5000,
          temperature: 0.5,
        });

        // Extract and return the generated summary from the response
        return {
          summary: response.choices[0]?.message.content?.trim() ?? "No summary generated.",
        };
      } catch (error) {
        // Log and handle errors gracefully
        console.error("Error generating summary:", error);
        throw new Error("Failed to generate summary");
      }
    }),
});

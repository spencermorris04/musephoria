// src/server/api/routers/screenplayProcess.ts

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import firestore from "~/server/firestore";

export const screenplayProcessRouter = createTRPCRouter({
  processScreenplay: protectedProcedure
    .input(z.object({ screenplayId: z.string() }))
    .query(async ({ input }) => {
      const screenplayDoc = await firestore.collection('screenplays').doc(input.screenplayId).get();
      
      if (!screenplayDoc.exists) {
        throw new Error("Screenplay not found");
      }

      const screenplay = { id: screenplayDoc.id, ...screenplayDoc.data() } as any;

      // Ensure scenes exist and are an array
      if (!Array.isArray(screenplay.scenes)) {
        throw new Error("Invalid screenplay structure: scenes are missing or not an array");
      }

      // Sort scenes by line number
      const sortedScenes = screenplay.scenes.sort((a: any, b: any) => 
        (a.heading?.line_number ?? 0) - (b.heading?.line_number ?? 0)
      );

      // Split scenes into chunks of 30
      const sceneChunks = [];
      for (let i = 0; i < sortedScenes.length; i += 30) {
        sceneChunks.push(sortedScenes.slice(i, i + 30));
      }

      // Convert each chunk to text
      const textChunks = sceneChunks.map((chunk, index) => {
        let text = `Chunk ${index + 1}\n\n`;
        chunk.forEach((scene: any) => {
          text += `${scene.heading?.text ?? 'No heading'}\n\n`;
          scene.screen_directions?.forEach((direction: any) => {
            text += `${direction.text}\n`;
          });
          scene.dialogues?.forEach((dialogue: any) => {
            text += `${dialogue.text}\n`;
          });
          text += '\n';
        });
        return text;
      });

      return { textChunks };
    }),
});
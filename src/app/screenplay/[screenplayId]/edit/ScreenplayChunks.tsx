'use client';

import React, { useState, useEffect } from 'react';
import { api } from "~/trpc/react";
import ScreenplayVisualization from "../ScreenplayVisualization";

interface ScreenplayElement {
  line_number: number;
  text: string;
}

interface Scene {
  heading: ScreenplayElement;
  screen_directions: ScreenplayElement[];
  dialogues: {
    character: string;
    line: ScreenplayElement;
  }[];
}

interface Screenplay {
  id: string;
  title: string;
  author: string;
  scenes: Scene[];
  summary?: string; // Adding optional summary field
  beatSheet?: BeatSheet; // Adding optional beatSheet field
}

interface ScreenplayChunksProps {
  screenplay: Screenplay;
}

interface ChunkWithSummary {
  text: string;
  summary: string | null;
}

interface Beat {
    beat: string;
    content: string;
  }


interface BeatSheet {
  openingImage: string;
  themeStated: string;
  setup: string;
  catalyst: string;
  debate: string;
  breakIntoTwo: string;
  bStory: string;
  funAndGames: string;
  midpoint: string;
  badGuysCloseIn: string;
  allIsLost: string;
  darkNightOfTheSoul: string;
  breakIntoThree: string;
  finale: string;
  finalImage: string;
}

const ScreenplayChunks: React.FC<ScreenplayChunksProps> = ({ screenplay }) => {
  const [chunks, setChunks] = useState<ChunkWithSummary[]>([]);
  const [isProcessingSummary, setIsProcessingSummary] = useState(false);
  const [isProcessingBeatSheet, setIsProcessingBeatSheet] = useState(false);
  const [fullSummary, setFullSummary] = useState<string>(screenplay.summary || ''); // Initialize with existing summary
  const [beatSheet, setBeatSheet] = useState<BeatSheet | null>(screenplay.beatSheet || null); // Initialize with existing beat sheet
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showBeatSheetModal, setShowBeatSheetModal] = useState(false);

  const generateSummaryMutation = api.summarize.generateSummary.useMutation();
  const generateBeatSheetMutation = api.beatsheetGenerator.generateBeatSheet.useMutation();
  const uploadBeatSheetMutation = api.beatsheetUploader.uploadBeatSheet.useMutation();

  useEffect(() => {
    processScreenplayIntoChunks();
  }, [screenplay]);

  const processScreenplayIntoChunks = () => {
    const sortedScenes = [...screenplay.scenes].sort(
      (a, b) => (a.heading?.line_number ?? 0) - (b.heading?.line_number ?? 0)
    );

    const sceneChunks: Scene[][] = [];
    for (let i = 0; i < sortedScenes.length; i += 30) {
      sceneChunks.push(sortedScenes.slice(i, i + 30));
    }

    const textChunks = sceneChunks.map((chunk, index) => {
      let text = `Chunk ${index + 1}\n\n`;
      chunk.forEach((scene) => {
        text += `${' '.repeat(27)}${scene.heading?.text ?? 'No heading'}\n\n`;

        scene.screen_directions?.forEach((direction) => {
          text += `${' '.repeat(27)}${direction.text}\n`;
        });

        scene.dialogues?.forEach((dialogue) => {
          text += `${' '.repeat(63)}${dialogue.character.toUpperCase()}\n`;
          text += `${' '.repeat(45)}${dialogue.line.text}\n\n`;
        });
        text += '\n';
      });
      return { text, summary: null };
    });

    setChunks(textChunks);
  };

  const handleGenerateSummary = async () => {
    setIsProcessingSummary(true);
    setShowSummaryModal(true); // Open modal immediately
    try {
      // Generate summaries for each chunk
      const summarizedChunks = await Promise.all(
        chunks.map(async (chunk) => {
          const result = await generateSummaryMutation.mutateAsync({
            chunk: chunk.text,
          });
          return { ...chunk, summary: result.summary };
        })
      );

      // Combine all summaries into a single full summary
      const combinedSummary = summarizedChunks
        .map((chunk) => chunk.summary)
        .join('\n\n');

      setChunks(summarizedChunks);
      setFullSummary(combinedSummary);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsProcessingSummary(false);
    }
  };

  const handleGenerateBeatSheet = async () => {
    if (!fullSummary) {
      alert("Please generate the summary first.");
      return;
    }
  
    setIsProcessingBeatSheet(true);
    setShowBeatSheetModal(true); // Open modal immediately
    try {
      // Get beat sheet result from the API
      const beatSheetResult = await generateBeatSheetMutation.mutateAsync({
        summary: fullSummary,
      });
  
      // Parse the JSON string response and cast it to Beat[]
      const beatSheetData: Beat[] = JSON.parse(beatSheetResult.beatSheet);
  
      // Map parsed data to BeatSheet interface
      const parsedBeatSheet = mapBeatSheet(beatSheetData);
  
      // Update the state with the parsed beat sheet
      setBeatSheet(parsedBeatSheet);
    } catch (error) {
      console.error("Error generating beat sheet:", error);
    } finally {
      setIsProcessingBeatSheet(false);
    }
  };  

  const getBeatFriendlyName = (beat: string): string => {
    const beatMap: Record<string, string> = {
      openingImage: "Opening Image",
      themeStated: "Theme Stated",
      setup: "Set-Up",
      catalyst: "Catalyst",
      debate: "Debate",
      breakIntoTwo: "Break into Two",
      bStory: "B Story",
      funAndGames: "Fun and Games",
      midpoint: "Midpoint",
      badGuysCloseIn: "Bad Guys Close In",
      allIsLost: "All Is Lost",
      darkNightOfTheSoul: "Dark Night of the Soul",
      breakIntoThree: "Break into Three",
      finale: "Finale",
      finalImage: "Final Image",
    };
    return beatMap[beat] || beat;
  };

// Map parsed JSON data to the BeatSheet type
const mapBeatSheet = (data: Beat[]): BeatSheet => {
    const beatSheet: Partial<BeatSheet> = {};
  
    data.forEach((beat) => {
      switch (beat.beat) {
        case "Opening Image (1%)":
          beatSheet.openingImage = beat.content;
          break;
        case "Theme Stated (5%)":
          beatSheet.themeStated = beat.content;
          break;
        case "Set-Up (1-10%)":
          beatSheet.setup = beat.content;
          break;
        case "Catalyst (10%)":
          beatSheet.catalyst = beat.content;
          break;
        case "Debate (10-20%)":
          beatSheet.debate = beat.content;
          break;
        case "Break into Two (20%)":
          beatSheet.breakIntoTwo = beat.content;
          break;
        case "B Story (22%)":
          beatSheet.bStory = beat.content;
          break;
        case "Fun and Games (20-50%)":
          beatSheet.funAndGames = beat.content;
          break;
        case "Midpoint (50%)":
          beatSheet.midpoint = beat.content;
          break;
        case "Bad Guys Close In (50-75%)":
          beatSheet.badGuysCloseIn = beat.content;
          break;
        case "All is Lost (75%)":
          beatSheet.allIsLost = beat.content;
          break;
        case "Dark Night of the Soul (75-80%)":
          beatSheet.darkNightOfTheSoul = beat.content;
          break;
        case "Break into Three (80%)":
          beatSheet.breakIntoThree = beat.content;
          break;
        case "Finale (80-99%)":
          beatSheet.finale = beat.content;
          break;
        case "Final Image (99-100%)":
          beatSheet.finalImage = beat.content;
          break;
        default:
          console.warn(`Unknown beat: ${beat.beat}`);
          break;
      }
    });
  
    return beatSheet as BeatSheet;
  };  

  const handleBeatSheetChange = (beat: keyof BeatSheet, value: string) => {
    if (beatSheet) {
      setBeatSheet({ ...beatSheet, [beat]: value });
    }
  };

  const handleSubmitBeatSheet = async () => {
    if (!beatSheet) return;

    try {
      await uploadBeatSheetMutation.mutateAsync({
        screenplayId: screenplay.id,
        summary: fullSummary, // Submit the full concatenated summary
        beatSheet: beatSheet,
      });
      alert("Beat sheet and summary uploaded successfully!");
    } catch (error) {
      console.error("Error uploading beat sheet and summary:", error);
      alert("Failed to upload beat sheet and summary.");
    }
  };

  const convertScreenplayForVisualization = (screenplay: Screenplay) => {
    return {
      ...screenplay,
      preliminaryContent: [],
      scene_headings: screenplay.scenes.map((scene) => scene.heading),
      screen_directions: screenplay.scenes.flatMap(
        (scene) => scene.screen_directions
      ),
      dialogues: screenplay.scenes.flatMap((scene) =>
        scene.dialogues.map((d) => d.line)
      ),
      characters: screenplay.scenes.reduce((acc, scene) => {
        scene.dialogues.forEach((d) => {
          const existingChar = acc.find((c) => c.name === d.character);
          if (existingChar) {
            existingChar.dialogue.push(d.line);
          } else {
            acc.push({ name: d.character, dialogue: [d.line] });
          }
        });
        return acc;
      }, [] as { name: string; dialogue: ScreenplayElement[] }[]),
    };
  };

  return (
    <div>
      <div className="flex justify-between">
        {/* Summary Button */}
        <button
          onClick={() => {
            if (fullSummary) {
              setShowSummaryModal(true);
            } else {
              handleGenerateSummary();
            }
          }}
          disabled={isProcessingSummary}
          className="mb-4 mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {fullSummary ? 'View Summary' : 'Generate Summary'}
        </button>

        {/* Beat Sheet Button */}
        <button
          onClick={() => {
            if (beatSheet) {
              setShowBeatSheetModal(true);
            } else {
              handleGenerateBeatSheet();
            }
          }}
          disabled={isProcessingBeatSheet || (!fullSummary && !beatSheet)}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {beatSheet ? 'View Beat Sheet' : 'Generate Beat Sheet'}
        </button>
      </div>

      {/* Screenplay Visualization */}
      <ScreenplayVisualization
        screenplay={convertScreenplayForVisualization(screenplay)}
      />

      {/* Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/4 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Screenplay Summary</h2>
            {isProcessingSummary ? (
              <div className="flex justify-center items-center h-64">
                <div className="loader"></div> {/* Add a loading spinner */}
              </div>
            ) : (
              <textarea
                value={fullSummary}
                readOnly
                className="w-full h-64 p-2 border rounded"
              />
            )}
            <div className="text-center mt-4">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Beat Sheet Modal */}
        {showBeatSheetModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-3/4 p-6 rounded-lg shadow-lg overflow-y-auto max-h-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Save the Cat Beat Sheet
            </h2>
            {isProcessingBeatSheet ? (
                <div className="flex justify-center items-center h-64">
                <div className="loader"></div> {/* Add a loading spinner */}
                </div>
            ) : (
                Object.entries(beatSheet || {}).map(([beat, content]) => (
                <div key={beat} className="mb-6 flex">
                    <div className="w-1/3 pr-4">
                    <h3 className="text-lg font-semibold">
                        {getBeatFriendlyName(beat)}
                    </h3>
                    </div>
                    <div className="w-2/3">
                    <textarea
                        value={content}
                        onChange={(e) =>
                        handleBeatSheetChange(beat as keyof BeatSheet, e.target.value)
                        }
                        className="w-full h-24 p-2 border rounded bg-white"
                    />
                    </div>
                </div>
                ))
            )}
            <div className="text-center mt-4">
                <button
                onClick={handleSubmitBeatSheet}  // Call the submit function
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                Submit Beat Sheet
                </button>
                <button
                onClick={() => setShowBeatSheetModal(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                Close
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default ScreenplayChunks;

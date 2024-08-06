import { notFound } from "next/navigation";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";
import ScreenplayChunks from "./ScreenplayChunks"; // Import the ScreenplayChunks component

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

interface Screenplay {
  id: string;
  title: string;
  author: string;
  scenes: Scene[];
  summary?: string; // Optional field for summary
  beatSheet?: BeatSheet; // Optional field for beat sheet
}

export default async function EditScreenplayPage({ params }: { params: { screenplayId: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    notFound(); // Or redirect to login page
  }

  try {
    const context = await createTRPCContext({ headers: new Headers() });
    const caller = createCaller(context);

    const screenplayData = await caller.screenplayRetrieve.getScreenplayById({ screenplayId: params.screenplayId });

    if (!screenplayData) {
      notFound();
    }

    // Create a default screenplay structure, including summary and beatSheet
    const screenplay: Screenplay = {
      id: screenplayData.id,
      title: screenplayData.title || "Untitled",
      author: screenplayData.author || "Unknown",
      scenes: screenplayData.scenes || [],
      summary: screenplayData.summary || '', // Initialize with existing summary if available
      beatSheet: screenplayData.beatSheet ?? undefined, // Convert null to undefined
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{screenplay.title}</h1>
        <p className="text-xl mb-4">By {screenplay.author}</p>
        <ScreenplayChunks screenplay={screenplay} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching screenplay:", error);
    notFound();
  }
}

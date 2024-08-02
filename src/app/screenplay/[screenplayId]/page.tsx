import { notFound } from "next/navigation";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";
import ScreenplayVisualization from "./ScreenplayVisualization";

// Define types to match ScreenplayVisualization component
interface ScreenplayElement {
  line_number: number;
  text: string;
}

interface Character {
  name: string;
  dialogue: ScreenplayElement[];
}

interface Screenplay {
  id: string;
  title: string;
  author: string;
  preliminaryContent: ScreenplayElement[];
  scene_headings: ScreenplayElement[];
  characters: Character[];
  screen_directions: ScreenplayElement[];
  dialogues: ScreenplayElement[];
}

export default async function ScreenplayPage({ params }: { params: { screenplayId: string } }) {
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

    // Create a default screenplay structure
    const defaultScreenplay: Screenplay = {
      id: screenplayData.id,
      title: "Untitled",
      author: "Unknown",
      preliminaryContent: [],
      scene_headings: [],
      characters: [],
      screen_directions: [],
      dialogues: [],
    };

    // Merge screenplayData with defaultScreenplay
    const screenplay: Screenplay = {
      ...defaultScreenplay,
      ...screenplayData,
    };

    // Convert string arrays to ScreenplayElement arrays if necessary
    const convertToScreenplayElement = (arr: (string | ScreenplayElement)[]): ScreenplayElement[] => {
      return arr.map((item, index) => {
        if (typeof item === 'string') {
          return { line_number: index + 1, text: item };
        }
        return item; // TypeScript already knows it's a ScreenplayElement
      });
    };

    screenplay.preliminaryContent = convertToScreenplayElement(screenplay.preliminaryContent);
    screenplay.scene_headings = convertToScreenplayElement(screenplay.scene_headings);
    screenplay.screen_directions = convertToScreenplayElement(screenplay.screen_directions);
    screenplay.dialogues = convertToScreenplayElement(screenplay.dialogues);

    // Convert characters to the expected format
    if (Array.isArray(screenplay.characters)) {
      screenplay.characters = screenplay.characters.map((char) => {
        if (typeof char === 'string') {
          return { name: char, dialogue: [] };
        }
        if (typeof char === 'object' && !Array.isArray(char.dialogue)) {
          return { ...char, dialogue: convertToScreenplayElement(char.dialogue || []) };
        }
        return char;
      });
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{screenplay.title}</h1>
        <p className="text-xl mb-4">By {screenplay.author}</p>
        <ScreenplayVisualization screenplay={screenplay} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching screenplay:", error);
    notFound();
  }
}

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

interface Scene {
  heading: ScreenplayElement;
  screen_directions: ScreenplayElement[];
  dialogues: {
    character: string;
    line: ScreenplayElement;
  }[];
}

interface Character {
  name: string;
  dialogue: ScreenplayElement[];
}

interface Screenplay {
  id: string;
  title: string;
  author: string;
  scenes: Scene[];
  summary?: string;
  beatSheet?: BeatSheet;
  preliminaryContent: ScreenplayElement[];
  characters: Character[];
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
      scenes: [],
      preliminaryContent: [],
      characters: [],
    };

    // Merge screenplayData with defaultScreenplay
    const screenplay: Screenplay = {
      ...defaultScreenplay,
      ...screenplayData,
    };

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

import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";
import { notFound } from "next/navigation";
import AllScreenplaysContent from "./AllScreenplaysContent";

// Define the Screenplay interface to match AllScreenplaysContent
interface Screenplay {
  id: string;
  title: string;
  author: string;
  userId: string;
}

export default async function AllScreenplaysPage() {
  const session = await getServerAuthSession();

  if (!session) {
    notFound(); // Or redirect to login page
  }

  try {
    const context = await createTRPCContext({ headers: new Headers() });
    const caller = createCaller(context);

    const screenplayData = await caller.screenplayRetrieve.getAllScreenplays();

    // Transform the data to match the Screenplay interface
    const screenplays: Screenplay[] = screenplayData.map((item) => ({
      id: item.id,
      title: item.title || "Untitled", // Use default value if title is not provided
      author: item.author || "Unknown", // Use default value if author is not provided
      userId: item.userId || "unknown", // Use default value if userId is not provided
    }));

    return <AllScreenplaysContent screenplays={screenplays} />;
  } catch (error) {
    console.error("Error fetching screenplays:", error);
    notFound();
  }
}

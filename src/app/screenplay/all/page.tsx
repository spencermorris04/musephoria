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
    const screenplays: Screenplay[] = screenplayData.map(item => ({
      title: "Untitled", // Default value
      author: "Unknown", // Default value
      userId: "unknown", // Default value
      ...item // This will overwrite the default values if the properties exist in the item
    }));

    return <AllScreenplaysContent screenplays={screenplays} />;
  } catch (error) {
    console.error("Error fetching screenplays:", error);
    notFound();
  }
}
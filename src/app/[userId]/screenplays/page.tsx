// /app/[userId]/screenplays/page.tsx

import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

// Define an interface for the data we actually receive
interface ScreenplayId {
  id: string;
}

export default async function UserScreenplaysPage({ params }: { params: { userId: string } }) {
  console.log("Starting UserScreenplaysPage for userId:", params.userId);

  const session = await getServerAuthSession();
  console.log("Session:", session);

  // Check if the logged-in user is trying to access their own screenplays
  if (!session || session.user.id !== params.userId) {
    console.log("User not authorized. Session user ID:", session?.user?.id, "Params user ID:", params.userId);
    notFound(); // Or redirect to an error page
  }

  try {
    // Create the tRPC context and caller
    const context = await createTRPCContext({ headers: new Headers() });
    const caller = createCaller(context);

    console.log("Attempting to fetch screenplays for userId:", params.userId);
    const screenplays = await caller.screenplayRetrieve.getUserScreenplays({ userId: params.userId });
    console.log("Fetched screenplays:", screenplays);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Screenplays</h1>
        {screenplays.length === 0 ? (
          <p>You haven't uploaded any screenplays yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenplays.map((screenplay: ScreenplayId) => (
              <div key={screenplay.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">Screenplay ID: {screenplay.id}</h2>
                  <p className="text-gray-600 mb-4">Details not available</p>
                </div>
                <div className="bg-gray-100 px-6 py-4">
                <Link href={`/screenplay/${screenplay.id}`} className="text-blue-600 hover:text-blue-800">
                  View Screenplay
                </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Detailed error:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    notFound();
  }
}
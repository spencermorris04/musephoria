import { notFound, redirect } from "next/navigation";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";
import ProfileContent from "./ProfileContent";

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const context = await createTRPCContext({ headers: new Headers() });
  const caller = createCaller(context);

  const userProfile = await caller.user.getUserProfile({ userId: params.userId });

  const isOwnProfile = session.user.id === params.userId;

  if (!userProfile && !isOwnProfile) {
    notFound();
  }

  // Provide default values for nullable properties
  const sessionUser = {
    id: session.user.id,
    name: session.user.name ?? "Anonymous",
    email: session.user.email ?? "No email provided",
    image: session.user.image ?? "/default-avatar.png" // Provide a path to a default avatar image
  };

  return (
    <ProfileContent 
      userId={params.userId}
      userProfile={userProfile}
      isOwnProfile={isOwnProfile}
      sessionUser={sessionUser}
    />
  );
}
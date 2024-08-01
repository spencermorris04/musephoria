'use client';

import { useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";

interface ProfileContentProps {
  userId: string;
  userProfile: any | null;
  isOwnProfile: boolean;
  sessionUser: {
    name: string;
    email: string;
    image: string;
  };
}

export default function ProfileContent({ userId, userProfile, isOwnProfile, sessionUser }: ProfileContentProps) {
  const [bio, setBio] = useState(userProfile?.bio || "");
  const [isEditing, setIsEditing] = useState(!userProfile && isOwnProfile);

  const createOrUpdateProfile = api.user.createOrUpdateUserProfile.useMutation({
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrUpdateProfile.mutate({
      userId,
      name: sessionUser.name,
      email: sessionUser.email,
      image: sessionUser.image,
      bio,
    });
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={4}
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save Profile
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {userProfile?.image && (
          <Image src={userProfile.image} alt={userProfile.name} width={100} height={100} className="rounded-full" />
        )}
        <div>
          <h1 className="text-2xl font-bold">{userProfile?.name}</h1>
          <p className="text-gray-600">{userProfile?.email}</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Bio</h2>
        <p>{userProfile?.bio || "No bio provided."}</p>
      </div>
      {isOwnProfile && (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
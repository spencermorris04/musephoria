// app/Dashboard/DashboardContent.tsx
'use client';

import Link from "next/link";

interface DashboardContentProps {
  userId: string;
}

export default function DashboardContent({ userId }: DashboardContentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight">Dashboard</h1>
        <div className="flex flex-row gap-8">
          <Link href={`/${userId}/screenplays`}>
            <div className="w-[300px] h-[150px] bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="text-2xl font-semibold">My Screenplays</span>
            </div>
          </Link>
          <Link href="/uploadScreenplay">
            <div className="w-[300px] h-[150px] bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="text-2xl font-semibold">Upload Screenplay</span>
            </div>
          </Link>
          <Link href={`/profile/${userId}`}>
            <div className="w-[300px] h-[150px] bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="text-2xl font-semibold">My Profile</span>
            </div>
          </Link>

          <Link href="/screenplay/all">
            <div className="w-[300px] h-[150px] bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-2xl font-semibold">All Screenplays</span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
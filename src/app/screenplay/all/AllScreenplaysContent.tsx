'use client';

import Link from "next/link";

interface Screenplay {
  id: string;
  title: string;
  author: string;
  userId: string;
}

interface AllScreenplaysContentProps {
  screenplays: Screenplay[];
}

export default function AllScreenplaysContent({ screenplays }: AllScreenplaysContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Screenplays</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenplays.map((screenplay) => (
          <div key={screenplay.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{screenplay.title}</h2>
              <p className="text-gray-600 mb-4">By {screenplay.author}</p>
            </div>
            <div className="bg-gray-100 px-6 py-4 flex justify-between">
              <Link 
                href={`/screenplay/${screenplay.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Screenplay
              </Link>
              <Link 
                href={`/profile/${screenplay.userId}`}
                className="text-green-600 hover:text-green-800"
              >
                View Author Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
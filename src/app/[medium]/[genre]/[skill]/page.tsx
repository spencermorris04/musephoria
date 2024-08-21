// app/[medium]/[genre]/[skill]/page.tsx
'use client';

import { useParams } from 'next/navigation';

export default function MediumGenreSkillPage() {
  const params = useParams()
  const { medium, genre, skill } = params

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {medium} / {genre} / {skill}
      </h1>
      <p className="mb-4">
        Welcome to the page for {medium} in the {genre} genre, focusing on {skill}.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Page Details:</h2>
        <ul className="list-disc list-inside">
          <li>Medium: {medium}</li>
          <li>Genre: {genre}</li>
          <li>Skill: {skill}</li>
        </ul>
      </div>
    </div>
  )
}
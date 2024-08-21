// app/[medium]/[genre]/[skill]/projects/@list/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

const projectItems = [
  { id: 1, title: 'My First Song', description: 'A pop song about love', date: '2023-06-01' },
  { id: 2, title: 'Short Story Collection', description: 'Five short stories about life', date: '2023-06-02' },
  // Add more items as needed
]

export default function ProjectList() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projectItems.map((item) => (
        <Link href={`?projectId=${item.id}`} key={item.id}>
          <div className="border p-4 rounded shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-xs text-gray-500 mt-2">{item.date}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
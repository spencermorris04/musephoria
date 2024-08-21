// app/[medium]/[genre]/[skill]/projects/@detail/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/shadcn-components/ui/dialog"

import { RouteParams, ProjectDetailsComponents, Medium } from '~/types';

const projectDetails: ProjectDetailsComponents = {
  Music: ({ genre, skill }) => (
    <div>
      <h3>Music Project for {genre} - {skill}</h3>
      {/* Add specific music project components */}
    </div>
  ),
  Writing: ({ genre, skill }) => (
    <div>
      <h3>Writing Project for {genre} - {skill}</h3>
      {/* Add specific writing project components */}
    </div>
  ),
  Acting: ({ genre, skill }) => (
    <div>
      <h3>Acting Project for {genre} - {skill}</h3>
      {/* Add specific acting project components */}
    </div>
  ),
}

export default function ProjectDetail({ params }: { params: RouteParams }) {
  const searchParams = useSearchParams()
  const projectId = searchParams.get('projectId')

  const DetailComponent = projectDetails[params.medium]

  if (!projectId) {
    return null
  }

  return (
    <Dialog open={!!projectId}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
        </DialogHeader>
        <DetailComponent genre={params.genre} skill={params.skill} />
        {/* Add more details based on the projectId */}
      </DialogContent>
    </Dialog>
  )
}
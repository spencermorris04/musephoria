// app/[medium]/[genre]/[skill]/projects/page.tsx
import { Suspense } from 'react'
import ProjectList from './ProjectList'
import ProjectDetail from './ProjectDetail'
import { Medium, Genre, Skill, RouteParams } from '~/types'

export default function ProjectsPage({ params }: { params: { medium: string, genre: string, skill: string } }) {
  // Convert string params to enum types
  const routeParams: RouteParams = {
    medium: params.medium as Medium,
    genre: params.genre as Genre,
    skill: params.skill as Skill
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectList />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectDetail params={routeParams} />
      </Suspense>
    </div>
  )
}
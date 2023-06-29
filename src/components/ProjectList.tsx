'use client'

import { api } from '@/utils/api'
import { Spinner } from './Spinner'
import { ProjectCard } from './ProjectCard'

export function ProjectList() {
  const { data: projects, isLoading } =
    api.project.getUserFullProjects.useQuery()

  if (isLoading) {
    return (
      <Spinner.Container>
        <Spinner size="lg" />
      </Spinner.Container>
    )
  }

  if (!projects) return null

  return (
    <section className="flex flex-col gap-4">
      {projects.map((project) => (
        <ProjectCard data={project} key={project.id} />
      ))}
    </section>
  )
}

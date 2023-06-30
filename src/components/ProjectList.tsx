'use client'

import { api } from '@/utils/api'
import { Spinner } from './Spinner'
import { ProjectCard } from './ProjectCard'
import Link from 'next/link'

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
        <Link href={`/projects/${project.id}`} key={project.id}>
          <ProjectCard data={project} />
        </Link>
      ))}
    </section>
  )
}

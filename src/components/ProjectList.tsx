'use client'

import { api } from '@/utils/api'
import { Spinner } from './Spinner'
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
    <div className="flex flex-col gap-1">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-lg bg-white p-4 shadow-2xl hover:shadow-none"
        >
          <div>
            <Link href={`/projects/${project.id}`}>
              <h3 className="truncate text-sm font-bold hover:underline">
                {project.name}
              </h3>
            </Link>
            <p className="truncate text-xs text-zinc-500">
              {project.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

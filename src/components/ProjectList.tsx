'use client'

import { api } from '@/utils/api'
import { Spinner } from './Spinner'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'

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
    <div className="space-y-2">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-center justify-between gap-2 rounded-lg bg-white p-4 shadow-2xl  hover:shadow-none"
        >
          <div className="w-full">
            <Link href={`/projects/${project.id}`}>
              <h3 className="w-fit text-sm font-bold hover:underline">
                {project.name}
              </h3>
            </Link>
            <p className="text-xs text-zinc-500">{project.description}</p>
          </div>
          <button className="grid h-6 w-6 min-w-[1.5rem] place-content-center rounded-full border">
            <MoreHorizontal size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

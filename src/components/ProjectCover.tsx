/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useProjectStore } from '@/store/project'
import { ProjectCard } from './ProjectCard'
import { useEffect } from 'react'

type Props = {
  data: Project
}
export function ProjectCover({ data }: Props) {
  const [project, setProject] = useProjectStore((store) => [
    store.project,
    store.setProject,
  ])

  useEffect(() => {
    setProject(data)
  }, [data])

  return <ProjectCard data={project ?? data} />
}

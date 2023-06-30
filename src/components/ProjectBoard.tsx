'use client'

import { api } from '@/utils/api'
import { Board } from './Board'

type Props = {
  id: string
}
export function ProjectBoard({ id }: Props) {
  const { data, isLoading } = api.task.getUserTasksByProject.useQuery({
    projectId: id,
  })
  return <Board data={data} isLoading={isLoading} />
}

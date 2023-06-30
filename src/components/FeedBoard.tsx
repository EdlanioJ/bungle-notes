'use client'

import { api } from '@/utils/api'
import { Board } from './Board'

export function FeedBoard() {
  const { data, isLoading } = api.task.getUserTasks.useQuery()

  return <Board data={data} isLoading={isLoading} />
}

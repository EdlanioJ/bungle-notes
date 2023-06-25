'use client'

import { api } from '@/utils/api'

export function Board() {
  const { data: tasks, isLoading } = api.task.getUserTasks.useQuery()
  if (isLoading) return <h1>Loading...</h1>

  if (!tasks) return null

  return (
    <div>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  )
}

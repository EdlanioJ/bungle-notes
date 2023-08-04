'use client'

import { useProjectStore } from '@/store/project'
import { useEffect } from 'react'

const statusToText: {
  [key in TaskStatus]: string
} = {
  done: 'Feito',
  inProgress: 'Fazendo',
  todo: 'A fazer',
}

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
  }, [data, setProject])

  const value = project ?? data

  const totalTask = Object.values(value.statusCount).reduce(
    (acc, total) => acc + total,
    0,
  )

  const statusCount = Object.entries(value.statusCount).map(
    ([key, value]) =>
      ({
        status: key,
        count: value,
      }) as { status: TaskStatus; count: number },
  )
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold text-zinc-800">{value.name}</h1>
      {value.description && (
        <p className="text-sm text-zinc-600">{value.description}</p>
      )}

      <div className="mt-4 flex w-full justify-between divide-x rounded-xl bg-white p-2 transition-all duration-300 hover:shadow-none">
        <div>
          <p>Total</p>
          <h3>{totalTask}</h3>
        </div>
        {statusCount.map((status) => (
          <div key={status.status}>
            <p>{statusToText[status.status]}</p>
            <h3>{status.count}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

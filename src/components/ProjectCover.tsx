'use client'

import { useProjectStore } from '@/store/project'
import { useEffect } from 'react'

const statusToText: {
  [key in TaskStatus]: string
} = {
  todo: 'A fazer',
  inProgress: 'Fazendo',
  done: 'Feito',
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
    <div className="w-full space-y-2">
      <h1 className="mt-2 text-xl font-bold text-zinc-800">{value.name}</h1>
      {value.description && (
        <p className="text-sm text-zinc-600">{value.description}</p>
      )}

      <div className="mt-4 flex w-full justify-between gap-2 divide-x-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
        <div className="flex-1">
          <p className="text-sm font-semibold text-zinc-500">Total</p>
          <h3 className="text-lg font-bold text-zinc-700">{totalTask}</h3>
        </div>
        {statusCount.map((status) => (
          <div className="flex-1 px-2" key={status.status}>
            <p className="text-sm font-semibold text-zinc-500">
              {statusToText[status.status]}
            </p>
            <h3 className="text-lg font-bold text-zinc-700">{status.count}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

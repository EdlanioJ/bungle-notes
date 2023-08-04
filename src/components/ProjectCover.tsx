'use client'

import { useProjectStore } from '@/store/project'
import { CheckCircle2, ListTodo, Loader2 } from 'lucide-react'
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
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="text-sm font-semibold text-zinc-500">Total</p>
          <h3 className="text-lg font-bold text-zinc-700">{totalTask}</h3>
        </div>
        {statusCount.map((status) => (
          <div
            className="flex flex-1 flex-col items-center justify-center"
            key={status.status}
          >
            <div className="flex items-center gap-2">
              {status.status === 'inProgress' && (
                <Loader2 size={20} className="text-amber-400" />
              )}
              {status.status === 'done' && (
                <CheckCircle2 size={20} className="text-green-600" />
              )}
              {status.status === 'todo' && (
                <ListTodo size={20} className="text-red-400" />
              )}
              <p className="text-sm font-semibold text-zinc-500 md:max-lg:hidden">
                {statusToText[status.status]}
              </p>
            </div>
            <h3 className="text-lg font-bold text-zinc-700">{status.count}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

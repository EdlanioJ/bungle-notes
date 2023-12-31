'use client'

import { useProjectStore } from '@/store/project'
import { CheckCircle2, ListTodo, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Heading } from './Heading'

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

  const statusCount = Object.entries(value.statusCount)
    .map(
      ([status, count]) =>
        ({ status, count }) as { status: TaskStatus; count: number },
    )
    .reverse()

  return (
    <div className="w-full space-y-2">
      <Heading className="mt-2">{value.name}</Heading>
      {value.description && (
        <p className="text-sm text-zinc-600">{value.description}</p>
      )}

      <div className="mt-4 flex w-full flex-wrap justify-around gap-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none md:divide-x-2">
        <div className="flex flex-1 basis-2/5 flex-col items-center justify-center md:basis-auto">
          <p className="text-xs font-semibold text-zinc-500">Total</p>
          <h3 className="text-lg font-bold text-zinc-700">{totalTask}</h3>
        </div>
        {statusCount.map((status) => (
          <div
            className="flex flex-1 basis-2/5 flex-col items-center justify-center text-xs md:basis-auto"
            key={status.status}
          >
            <div className="flex items-center gap-2">
              {status.status === 'inProgress' && (
                <Loader2 size={16} className="text-amber-400" />
              )}
              {status.status === 'done' && (
                <CheckCircle2 size={16} className="text-green-600" />
              )}
              {status.status === 'todo' && (
                <ListTodo size={16} className="text-red-400" />
              )}
              <p className="font-semibold text-zinc-500 md:max-lg:hidden">
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

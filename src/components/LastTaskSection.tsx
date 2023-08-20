'use client'

import { api } from '@/utils/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Spinner } from './Spinner'
import { cn } from '@/utils/cn'

const statusToText: {
  [key in TaskStatus]: string
} = {
  todo: 'A fazer',
  inProgress: 'Fazendo',
  done: 'Feito',
}

export function LastTaskSection() {
  const { data, isLoading } = api.task.lastTasks.useQuery()
  return (
    <section className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
      <p className="text-xs font-bold text-zinc-700">Últimas Tarefas</p>

      {isLoading && (
        <Spinner.Container>
          <Spinner />
        </Spinner.Container>
      )}

      {!isLoading && !data && (
        <div className="flex items-center justify-center">
          <strong className="text-center text-xs">Sem tarefas</strong>
        </div>
      )}

      {!isLoading && data && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarefa</TableHead>
              <TableHead className="md:max-xl:hidden">Projeto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((task) => (
              <TableRow key={task.id} className="text-xs">
                <TableCell className="font-semibold">{task.name}</TableCell>
                <TableCell className="hidden xl:block">
                  {task.project.name}
                </TableCell>
                <TableCell className="hidden md:block">
                  <span
                    className={cn(
                      'rounded-xl px-2 py-1 text-xs font-semibold text-white',
                      {
                        'bg-red-400': task.status === 'todo',
                        'bg-amber-400': task.status === 'inProgress',
                        'bg-green-600': task.status === 'done',
                      },
                    )}
                  >
                    {statusToText[task.status]}
                  </span>
                </TableCell>
                <TableCell>
                  {task.createdAt.toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  )
}

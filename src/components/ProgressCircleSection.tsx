'use client'

import { cn } from '@/utils/cn'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const statusToText: {
  [key in TaskStatus]: string
} = {
  todo: 'A fazer',
  inProgress: 'Fazendo',
  done: 'Feito',
}

type Props = {
  data: {
    projectCount: number
    taskStatusCount: StatusCount
  }
}
export function ProgressCircleSection({ data }: Props) {
  const statusData = Object.entries(data.taskStatusCount).map(
    ([status, count]) => ({
      status,
      count,
    }),
  )
  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
      <ResponsiveContainer width={'100%'} aspect={3}>
        <PieChart width={150} height={150}>
          <Pie
            data={statusData}
            cx={75}
            cy={75}
            innerRadius={40}
            fill="none"
            dataKey="count"
          >
            {statusData.map(({ status }) => (
              <Cell
                key={`cell-${status}`}
                className={cn({
                  'fill-red-400': status === 'todo',
                  'fill-amber-400': status === 'inProgress',
                  'fill-green-600': status === 'done',
                })}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-around gap-2">
        {Object.entries(data.taskStatusCount).map(([status, count]) => (
          <div
            key={status}
            className="flex flex-1 flex-col items-center justify-center gap-1"
          >
            <span className="text-2xl font-bold text-zinc-700">{count}</span>
            <div className="flex items-center gap-1">
              <div
                className={cn('h-2 w-2 rounded-full shadow-2xl', {
                  'bg-red-400': status === 'todo',
                  'bg-amber-400': status === 'inProgress',
                  'bg-green-600': status === 'done',
                })}
              />
              <span className="text-xs font-semibold text-zinc-400">
                {statusToText[status as TaskStatus]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

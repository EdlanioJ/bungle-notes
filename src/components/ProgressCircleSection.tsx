'use client'

import { cn } from '@/utils/cn'
import { Cell, Pie, PieChart } from 'recharts'

const SIZE = 150
const statusToText: {
  [key in TaskStatus]: string
} = {
  todo: 'A fazer',
  inProgress: 'Fazendo',
  done: 'Feito',
}

type CenterProps = {
  projectCount: number
}
function Center({ projectCount }: CenterProps) {
  return (
    <g transform={`translate(${SIZE / 2},${SIZE / 2})`}>
      <text
        textAnchor="middle"
        fontSize="48"
        className="fill-zinc-700 font-bold"
      >
        {projectCount}
      </text>
      <text
        y="30"
        textAnchor="middle"
        fontSize="16"
        className="fill-zinc-400 font-semibold"
      >
        {projectCount <= 1 ? 'Projeto' : 'Projetos'}
      </text>
    </g>
  )
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
      <div className="flex w-full items-center justify-center">
        <PieChart width={SIZE} height={SIZE}>
          <Pie
            data={statusData}
            innerRadius={SIZE / 2 - 10}
            outerRadius={SIZE / 2}
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
          <Center projectCount={data.projectCount} />
        </PieChart>
      </div>
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

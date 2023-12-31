'use client'

import { api } from '@/utils/api'
import { cn } from '@/utils/cn'
import { Cell, Label, Pie, PieChart } from 'recharts'
import { Spinner } from './Spinner'

const SIZE = 200
const statusToText: {
  [key in TaskStatus]: string
} = {
  todo: 'A fazer',
  inProgress: 'Fazendo',
  done: 'Feito',
}

type CustomLabelProps = {
  projectCount: number
}
function CustomLabel({ projectCount }: CustomLabelProps) {
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

export function ProgressCircleSection() {
  const { data, isLoading } = api.stats.projectAndTaskStatusCount.useQuery()

  const statusCount =
    data?.taskStatusCount.reduce((acc, { count }) => acc + count, 0) ?? 0

  return (
    <section className="flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
      <div className="flex h-[240px] flex-col items-center justify-center gap-2">
        {isLoading ? (
          <Spinner.Container>
            <Spinner size="md" />
          </Spinner.Container>
        ) : (
          <>
            <div className="flex w-full items-center justify-center">
              <PieChart width={SIZE} height={SIZE}>
                <Pie
                  data={data?.taskStatusCount}
                  stroke=""
                  isAnimationActive={false}
                  innerRadius={SIZE / 2 - 16}
                  outerRadius={SIZE / 2}
                  cornerRadius={16}
                  fill="none"
                  dataKey="count"
                >
                  {data?.taskStatusCount.map(({ status }) => (
                    <Cell
                      key={`cell-${status}`}
                      className={cn({
                        'fill-red-400': status === 'todo',
                        'fill-amber-400': status === 'inProgress',
                        'fill-green-600': status === 'done',
                      })}
                    />
                  ))}
                  <Label
                    content={
                      <CustomLabel projectCount={Number(data?.projectCount)} />
                    }
                  />
                </Pie>

                {statusCount === 0 && (
                  <Pie
                    data={[{ name: 'No Data', value: 1 }]}
                    dataKey="value"
                    stroke=""
                    innerRadius={SIZE / 2 - 20}
                    outerRadius={SIZE / 2}
                    className="fill-zinc-200"
                  >
                    <Label
                      content={
                        <CustomLabel
                          projectCount={Number(data?.projectCount)}
                        />
                      }
                    />
                  </Pie>
                )}
              </PieChart>
            </div>
            <div className="flex w-full justify-between">
              {data?.taskStatusCount.map(({ status, count }) => (
                <div
                  key={status}
                  className="flex flex-1 flex-col items-center justify-center gap-1"
                >
                  <span className="text-sm font-bold text-zinc-700">
                    {count}
                  </span>
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
          </>
        )}
      </div>
    </section>
  )
}

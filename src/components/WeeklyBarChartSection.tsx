'use client'

import { api } from '@/utils/api'
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'
import { Spinner } from './Spinner'

export function WeeklyBarChartSection() {
  const { data, isLoading } = api.stats.weeklyTaskCount.useQuery()

  return (
    <section className="flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
      <p className="text-xs font-bold text-zinc-700">Últimos 7 dias</p>
      <div className="flex h-[240px] items-center justify-center">
        {isLoading ? (
          <Spinner.Container>
            <Spinner size="md" />
          </Spinner.Container>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={360} height={240} barSize={16} data={data}>
              <Bar
                isAnimationActive={false}
                dataKey="count"
                className="fill-blue-500"
                radius={16}
                background={{ fill: '#d4d4d8', radius: 16 }}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                className="text-xs font-bold text-zinc-500"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}

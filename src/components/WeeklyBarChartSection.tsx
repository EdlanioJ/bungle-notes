'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'

const data = [
  { weekDay: 'Dom', value: 30 },
  { weekDay: 'Seg', value: 25 },
  { weekDay: 'Ter', value: 3 },
  { weekDay: 'Qua', value: 15 },
  { weekDay: 'Qui', value: 12 },
  { weekDay: 'Sex', value: 7 },
  { weekDay: 'Sab', value: 45 },
]

export function WeeklyBarChartSection() {
  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <BarChart width={320} height={180} data={data}>
          <Bar dataKey="value" className="fill-blue-500" background />
          <XAxis
            dataKey="weekDay"
            axisLine={false}
            tickLine={false}
            className="text-xs font-bold text-zinc-500"
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}

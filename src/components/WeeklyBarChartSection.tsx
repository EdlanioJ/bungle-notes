'use client'

import { Bar, BarChart, XAxis } from 'recharts'

const data = [
  { name: 'Dom', value: 30 },
  { name: 'Seg', value: 25 },
  { name: 'Ter', value: 3 },
  { name: 'Qua', value: 15 },
  { name: 'Qui', value: 12 },
  { name: 'Sex', value: 7 },
  { name: 'Sab', value: 45 },
]

export function WeeklyBarChartSection() {
  return (
    <section className="flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
      <p className="text-xs font-bold text-zinc-700">Últimos 7 dias</p>
      <div className="flex items-center justify-center">
        <BarChart width={360} height={240} data={data}>
          <Bar dataKey="value" className="fill-blue-500" background />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            className="text-xs font-bold text-zinc-500"
          />
        </BarChart>
      </div>
    </section>
  )
}
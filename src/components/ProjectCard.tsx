import clsx from 'clsx'

type CountCardProps = {
  data: {
    value: number
    title: string
  }
  variant?: 'default' | 'todo' | 'done' | 'inProgress'
}
function CountCard({ data, variant = 'default' }: CountCardProps) {
  return (
    <div
      className={clsx(
        'flex flex-1 flex-col items-center justify-center gap-1 rounded-md border py-1',
        {
          'border-dashed border-zinc-500': variant === 'default',
          'border-red-400 bg-red-500/10': variant === 'todo',
          'border-yellow-400 bg-yellow-500/10': variant === 'inProgress',
          'border-green-400 bg-green-500/10': variant === 'done',
        },
      )}
    >
      <span className="text-sm font-bold leading-tight">{data.value}</span>
      <p className="text-xs leading-tight text-zinc-400">{data.title}</p>
    </div>
  )
}

type Props = {
  data: Project
}

export function ProjectCard({ data }: Props) {
  const totalTask = Object.values(data.statusCount).reduce(
    (acc, total) => acc + total,
    0,
  )

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-4 shadow-custom">
      <h3 className="text-lg font-medium">{data.name}</h3>
      {data.description && (
        <p className="text-sm text-zinc-600">{data.description}</p>
      )}
      <div className="flex items-center gap-4 text-xs">
        <CountCard data={{ value: totalTask, title: 'Total' }} />
        <CountCard data={{ value: data.statusCount.todo, title: 'A Fazer' }} />
        <CountCard
          data={{ value: data.statusCount.inProgress, title: 'Fazendo' }}
        />
        <CountCard data={{ value: data.statusCount.done, title: 'Feito' }} />
      </div>
    </div>
  )
}

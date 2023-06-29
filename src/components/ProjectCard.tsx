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
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-zinc-500 py-1">
          <span className="text-sm font-bold leading-3">{totalTask}</span>
          <p className="text-xs font-medium uppercase leading-tight text-zinc-600">
            Total
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 rounded-md border border-red-500 bg-red-500/10 p-1">
          <span className="text-sm font-bold leading-3">
            {data.statusCount.todo}
          </span>
          <p className="text-xs font-medium uppercase leading-tight text-zinc-600">
            A Fazer
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 rounded-md border border-yellow-500 bg-yellow-500/10 p-1">
          <span className="text-sm font-bold leading-3">
            {data.statusCount.inProgress}
          </span>
          <p className="text-xs font-medium uppercase leading-tight text-zinc-600">
            Fazendo
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 rounded-md border border-green-500 bg-green-500/10 p-1">
          <span className="text-sm font-bold leading-3">
            {data.statusCount.done}
          </span>
          <p className="text-xs font-medium uppercase leading-tight text-zinc-600">
            Feito
          </p>
        </div>
      </div>
    </div>
  )
}

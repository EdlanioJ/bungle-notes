import { cn } from '@/utils/cn'

type Props = {
  size?: number
  data: { projectCount: number; taskStatusCount: StatusCount }
}

const getPercentages = (statusCount: StatusCount): StatusCount => {
  const totalCount = Object.values(statusCount).reduce(
    (total, count) => total + count,
    0,
  )
  const percentages: StatusCount = Object.entries(statusCount).reduce(
    (acc, [status, count]) => ({
      ...acc,
      [status]: (count / totalCount) * 100,
    }),
    { todo: 0, inProgress: 0, done: 0 },
  )
  return percentages
}

export function ProgressCircle({ size = 150, data }: Props) {
  const STROKE_WIDTH = 10
  const radius = (size - STROKE_WIDTH) / 2
  const percentages = getPercentages(data.taskStatusCount)
  const totalPercentage = Object.values(percentages).reduce(
    (total, percentage) => total + percentage,
    0,
  )

  let startAngle = 0
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {totalPercentage === 0 ? (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - STROKE_WIDTH) / 2}
          className="fill-none stroke-zinc-200"
          strokeWidth={STROKE_WIDTH}
        />
      ) : (
        Object.entries(percentages).map(([status, percentage]) => {
          if (percentage === 0) return null
          if (percentage === 100)
            return (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={(size - STROKE_WIDTH) / 2}
                className={cn('fill-none', {
                  'stroke-green-600': status === 'done',
                  'stroke-red-500': status === 'todo',
                  'stroke-amber-500': status === 'inProgress',
                })}
                strokeWidth={STROKE_WIDTH}
              />
            )

          const endAngle = startAngle + percentage * 3.6
          const largeArcFlag = percentage >= 100 ? 1 : percentage > 50 ? 1 : 0
          const x1 =
            size / 2 + radius * Math.cos((startAngle - 90) * (Math.PI / 180))
          const y1 =
            size / 2 + radius * Math.sin((startAngle - 90) * (Math.PI / 180))
          const x2 =
            size / 2 + radius * Math.cos((endAngle - 90) * (Math.PI / 180))
          const y2 =
            size / 2 + radius * Math.sin((endAngle - 90) * (Math.PI / 180))

          startAngle = endAngle - 0.1
          return (
            <path
              key={status}
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
              fill="none"
              strokeWidth={STROKE_WIDTH}
              className={cn({
                'stroke-green-600': status === 'done',
                'stroke-red-500': status === 'todo',
                'stroke-amber-500': status === 'inProgress',
              })}
            />
          )
        })
      )}

      <g transform={`translate(${size / 2},${size / 2})`}>
        <text
          textAnchor="middle"
          fontSize="48"
          className="fill-zinc-700 font-bold"
        >
          {data.projectCount}
        </text>
        <text
          y="30"
          textAnchor="middle"
          fontSize="16"
          className="fill-zinc-400 font-semibold"
        >
          {data.projectCount <= 1 ? 'Projeto' : 'Projetos'}
        </text>
      </g>
    </svg>
  )
}

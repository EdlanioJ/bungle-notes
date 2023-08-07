import { cn } from '@/utils/cn'

type Props = {
  size?: number
  data: StatusCount
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

export function TaskProgressCircle({ size = 150, data }: Props) {
  const STROKE_WIDTH = 10
  const radius = (size - STROKE_WIDTH) / 2
  const percentages = getPercentages(data)
  let startAngle = 0
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Object.entries(percentages).map(([status, percentage]) => {
        const endAngle = startAngle + percentage * 3.6 // 3.6 degrees per percentage
        const largeArcFlag = percentage > 50 ? 1 : 0 // Use a large arc if percentage is greater than 50
        const x1 = 100 + radius * Math.cos((startAngle - 90) * (Math.PI / 180))
        const y1 = 100 + radius * Math.sin((startAngle - 90) * (Math.PI / 180))
        const x2 = 100 + radius * Math.cos((endAngle - 90) * (Math.PI / 180))
        const y2 = 100 + radius * Math.sin((endAngle - 90) * (Math.PI / 180))

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
      })}
    </svg>
  )
}

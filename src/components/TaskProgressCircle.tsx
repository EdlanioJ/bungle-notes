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

type PathProps = {
  size: number
  percentage: number
  percentages: StatusCount
  index: number
  status: string
}

function Path({ size, percentage, index, percentages, status }: PathProps) {
  const STROKE_WIDTH = 10
  const radius = (size - STROKE_WIDTH) / 2
  const endAngle =
    (index > 0 ? Object.values(percentages)[index - 1] : 0) ??
    0 + percentage * 3.6
  const largeArcFlag = percentage > 50 ? 1 : 0
  const startAngle = endAngle - percentage * 3.6
  const x1 = size / 2 + radius * Math.cos((startAngle - 90) * (Math.PI / 180))
  const y1 = size / 2 + radius * Math.sin((startAngle - 90) * (Math.PI / 180))
  const x2 = size / 2 + radius * Math.cos((endAngle - 90) * (Math.PI / 180))
  const y2 = size / 2 + radius * Math.sin((endAngle - 90) * (Math.PI / 180))

  return (
    <path
      key={status}
      d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
      fill="none"
      className={cn({
        'stroke-green-600': status === 'done',
        'stroke-red-500': status === 'todo',
        'stroke-amber-500': status === 'inProgress',
      })}
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="round"
    />
  )
}

export function TaskProgressCircle({ size = 150, data }: Props) {
  const percentages = getPercentages(data)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Object.entries(percentages).map(([status, percentage], index) => (
        <Path
          index={index}
          percentage={percentage}
          percentages={percentages}
          size={size}
          status={status}
          key={status}
        />
      ))}
    </svg>
  )
}

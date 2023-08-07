import { Heading } from '@/components/Heading'
import { TaskProgressCircle } from '@/components/TaskProgressCircle'

export const metadata = {
  title: 'Relatórios',
}
export default function Analytics() {
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <Heading>Relatórios</Heading>
      <TaskProgressCircle data={{ done: 100, todo: 24, inProgress: 51 }} />
    </div>
  )
}

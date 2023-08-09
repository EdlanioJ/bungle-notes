import { Heading } from '@/components/Heading'
import { ProgressCircle } from '@/components/ProgressCircle'
import { ssgHelper } from '@/server/helpers/ssgHelper'
import { cn } from '@/utils/cn'

async function getData() {
  const ssg = await ssgHelper()
  const data = await ssg.stats.projectAndTaskStatusCount.fetch()
  return data
}

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Relatórios',
}

const statusToText: {
  [key in TaskStatus]: string
} = {
  todo: 'A fazer',
  inProgress: 'Fazendo',
  done: 'Feito',
}

export default async function Analytics() {
  const projectAndTaskStatusCount = await getData()
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <Heading>Relatórios</Heading>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
        <div className="flex w-full items-center justify-center">
          <ProgressCircle data={projectAndTaskStatusCount} />
        </div>
        <div className="flex justify-around gap-2">
          {Object.entries(projectAndTaskStatusCount.taskStatusCount).map(
            ([status, count]) => (
              <div
                key={status}
                className="flex flex-1 flex-col items-center justify-center gap-1"
              >
                <span className="text-xl font-bold text-zinc-700">{count}</span>
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
            ),
          )}
        </div>
      </div>
    </div>
  )
}

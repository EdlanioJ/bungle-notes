import { Heading } from '@/components/Heading'
import { ProgressCircle } from '@/components/ProgressCircle'
import { ssgHelper } from '@/server/helpers/ssgHelper'

async function getData() {
  const ssg = await ssgHelper()
  const data = await ssg.stats.projectAndTaskStatusCount.fetch()
  return data
}

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Relatórios',
}
export default async function Analytics() {
  const projectAndTaskStatusCount = await getData()
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <Heading>Relatórios</Heading>
      <ProgressCircle data={projectAndTaskStatusCount} />
    </div>
  )
}

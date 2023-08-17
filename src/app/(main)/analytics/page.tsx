import { Heading } from '@/components/Heading'
import { ProgressCircleSection } from '@/components/ProgressCircleSection'
import { WeeklyBarChartSection } from '@/components/WeeklyBarChartSection'
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

      <div className="flex flex-col gap-6 lg:flex-row">
        <ProgressCircleSection data={projectAndTaskStatusCount} />
        <WeeklyBarChartSection />
      </div>
    </div>
  )
}

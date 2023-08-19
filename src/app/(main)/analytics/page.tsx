import { Heading } from '@/components/Heading'
import { LastTaskTable } from '@/components/LastTaskTable'
import { ProgressCircleSection } from '@/components/ProgressCircleSection'
import { WeeklyBarChartSection } from '@/components/WeeklyBarChartSection'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Relatórios',
}

export default function Analytics() {
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <Heading>Relatórios</Heading>

      <div className="flex flex-col gap-6 2xl:flex-row">
        <ProgressCircleSection />
        <WeeklyBarChartSection />
      </div>
      <LastTaskTable />
    </div>
  )
}

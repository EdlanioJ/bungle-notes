import { Heading } from '@/components/Heading'
import { LastTaskSection } from '@/components/LastTaskSection'
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

      <div className="grid grid-cols-2 grid-rows-1 gap-6 2xl:grid-cols-1 2xl:grid-rows-2">
        <ProgressCircleSection />
        <WeeklyBarChartSection />
      </div>
      <LastTaskSection />
    </div>
  )
}

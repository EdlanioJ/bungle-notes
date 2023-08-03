import { CreateProjectModal } from '@/components/CreateProjectModal'
import { ProjectHeader } from '@/components/ProjectHeader'
import { ProjectList } from '@/components/ProjectList'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Projetos',
}

export default function Projects() {
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <ProjectHeader />
      <ProjectList />
      <CreateProjectModal />
    </div>
  )
}

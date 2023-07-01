import { CreateProjectModal } from '@/components/CreateProjectModal'
import { ProjectHeader } from '@/components/ProjectHeader'
import { ProjectList } from '@/components/ProjectList'

export const metadata = {
  title: 'Projetos',
}

export default function Projects() {
  return (
    <div className="space-y-8 px-10 py-12 text-zinc-700 transition-all">
      <ProjectHeader />
      <ProjectList />
      <CreateProjectModal />
    </div>
  )
}

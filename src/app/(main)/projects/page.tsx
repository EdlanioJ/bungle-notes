import { CreateProjectModal } from '@/components/CreateProjectModal'
import { ProjectList } from '@/components/ProjectList'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Projetos',
}

export default function Projects() {
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <h1 className="text-xl font-bold text-zinc-800">Projetos</h1>
      <ProjectList />
      <CreateProjectModal />
    </div>
  )
}

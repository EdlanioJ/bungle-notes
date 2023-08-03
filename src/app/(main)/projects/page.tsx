import { Button } from '@/components/Button'
import { CreateProjectModal } from '@/components/CreateProjectModal'
import { ProjectList } from '@/components/ProjectList'
import { PlusIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Projetos',
}

export default function Projects() {
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-zinc-800">Projetos</h1>
        <Button
          className="h-8 w-auto px-2 text-xs font-bold"
          variant="secondary"
          icon={PlusIcon}
        >
          Novo Projeto
        </Button>
      </div>
      <ProjectList />
      <CreateProjectModal />
    </div>
  )
}

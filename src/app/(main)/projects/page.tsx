import { ProjectList } from '@/components/ProjectList'
import { PlusIcon } from 'lucide-react'

export const metadata = {
  title: 'Projetos',
}

export default function Projects() {
  return (
    <div className="space-y-8 px-10 py-12 text-zinc-700 transition-all">
      <section className="flex w-full items-center justify-between overflow-hidden rounded-lg bg-white pl-4 shadow-custom">
        <h2 className="text-center text-xl font-bold text-zinc-700 xl:text-3xl">
          Projetos
        </h2>
        <button
          type="button"
          className="flex items-center gap-2 bg-violet-600 px-4 py-3 text-white transition-colors hover:bg-violet-600/95"
        >
          <PlusIcon />
          <span>Novo</span>
        </button>
      </section>
      <ProjectList />
    </div>
  )
}

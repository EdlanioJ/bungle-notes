'use client'

import { PlusIcon } from 'lucide-react'
import { Button } from './Button'

export function ProjectHeader() {
  return (
    <section className="flex w-full items-center justify-between overflow-hidden rounded-lg bg-white pl-4 shadow-custom">
      <h2 className="text-center text-xl font-bold text-zinc-700 xl:text-3xl">
        Projetos
      </h2>
      <Button icon={PlusIcon}>Novo</Button>
    </section>
  )
}

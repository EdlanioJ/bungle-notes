'use client'

import { PlusIcon } from 'lucide-react'
import { Button } from './Button'
import { useModalStore } from '@/store/modal'
import { Heading } from './Heading'

export function ProjectHeader() {
  const handleOpenModal = useModalStore((store) => store.openCreateProjectModal)
  return (
    <div className="flex justify-between">
      <Heading>Projetos</Heading>
      <Button
        onClick={handleOpenModal}
        className="h-8 w-auto gap-1 px-2 text-xs font-bold"
        variant="secondary"
        icon={PlusIcon}
      >
        Novo Projeto
      </Button>
    </div>
  )
}

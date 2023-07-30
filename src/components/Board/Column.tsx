'use client'

import { MoreHorizontal, PlusIcon } from 'lucide-react'
import { Droppable } from 'react-beautiful-dnd'
import { Card } from './Card'
import { useModalStore } from '@/store/modal'
import { useDefaultCreateTaskDataStore } from '@/store/create-task'
import { Button } from '../Button'
import clsx from 'clsx'

const idToColumnText: {
  [key in TaskStatus]: string
} = {
  done: 'Feito',
  inProgress: 'Fazendo',
  todo: 'A fazer',
}

type Props = {
  id: TaskStatus
  index: number
  data: Column
}
export function Column({ data, id, index }: Props) {
  const openCreateTaskModal = useModalStore(
    (store) => store.openCreateTaskModal,
  )
  const setStatus = useDefaultCreateTaskDataStore((store) => store.setStatus)

  function handleNewTask() {
    setStatus(id)
    openCreateTaskModal()
  }

  return (
    <Droppable droppableId={index.toString()} type="card">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="h-full space-y-4"
        >
          <header className="flex h-11 items-center justify-between pr-2 text-zinc-600">
            <div className="flex items-center justify-center gap-2 text-center font-semibold text-zinc-500">
              <div
                className={clsx('h-2 w-2 rounded-full shadow-2xl', {
                  'bg-red-400': id === 'todo',
                  'bg-amber-400': id === 'inProgress',
                  'bg-green-600': id === 'done',
                })}
              />
              {idToColumnText[id]}
              <span className="flex">({data.tasks.length})</span>
            </div>

            <button>
              <MoreHorizontal />
            </button>
          </header>

          <Button onClick={handleNewTask} variant="outline" icon={PlusIcon}>
            Adicionar Nova Tarefa
          </Button>
          <div className="space-y-2">
            {data.tasks.map((task, index) => (
              <Card key={task.id} data={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}

'use client'

import { PlusIcon } from 'lucide-react'
import { Droppable } from 'react-beautiful-dnd'
import { TaskCard } from './TaskCard'
import { useModalStore } from '@/store/modal'
import { useDefaultCreateTaskDataStore } from '@/store/create-task'

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
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="mb-4 flex items-center justify-between overflow-hidden rounded-lg bg-white pl-4 shadow-custom">
            <div className="flex items-center justify-center gap-2 text-center text-lg font-bold">
              {idToColumnText[id]}
              <span className="flex h-5 items-center justify-center rounded-md bg-zinc-300 p-1.5 text-center text-xs font-semibold">
                {data.tasks.length}
              </span>
            </div>
            <button
              type="button"
              onClick={handleNewTask}
              className="flex items-center gap-2 bg-violet-600 px-4 py-3 text-violet-200 transition-colors hover:bg-violet-600/95"
            >
              <PlusIcon />
              <span className="hidden md:inline-block">Novo</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.tasks.map((task, index) => (
              <TaskCard key={task.id} data={task} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

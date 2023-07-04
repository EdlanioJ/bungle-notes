'use client'

import { Draggable } from 'react-beautiful-dnd'
import { TaskActions } from './TaskActions'
import { api } from '@/utils/api'
import { toast } from 'react-hot-toast'
import { useProjectStore } from '@/store/project'

type Props = {
  data: Task
  index: number
}
export function TaskCard({ data, index }: Props) {
  const decreaseStateCount = useProjectStore(
    (store) => store.decreaseStateCount,
  )
  const trpcUtils = api.useContext()
  const { mutate, isLoading: isDeleting } = api.task.delete.useMutation({
    onSuccess: (_data, variables) => {
      trpcUtils.task.getUserTasks.setData(undefined, (oldData) => {
        return !oldData
          ? []
          : oldData.filter((task) => task.id !== variables.id)
      })
      decreaseStateCount(data.status, data.project.id)
      toast.success(`Tarefa ${data.name} deletada com sucesso`)
    },
  })

  function handleDelete() {
    mutate({
      id: data.id,
    })
  }

  return (
    <Draggable index={index} draggableId={data.id}>
      {(provided) => (
        <div
          className="relative flex w-full flex-col gap-3 overflow-hidden rounded-lg bg-white p-6 shadow-custom"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex w-full items-center justify-between">
            <span className="truncate rounded-lg border px-2 py-1 text-xs font-semibold text-zinc-500">
              {data.project.name}
            </span>
            <TaskActions isDeleting={isDeleting} onDelete={handleDelete} />
          </div>
          <h3 className="text-xl font-medium">{data.name}</h3>
          <p className="text-sm text-zinc-500">{data.content}</p>

          <div className="flex gap-2">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className="cursor-pointer rounded-lg bg-violet-200 px-2 py-1 text-xs text-violet-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  )
}

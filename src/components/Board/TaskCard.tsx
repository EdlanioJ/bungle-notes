'use client'

import { Draggable } from 'react-beautiful-dnd'

type Props = {
  data: Task
  index: number
}
export function TaskCard({ data, index }: Props) {
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

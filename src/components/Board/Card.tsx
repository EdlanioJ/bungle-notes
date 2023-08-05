'use client'

import { cn } from '@/utils/cn'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  data: Task
  index: number
}
export function Card({ data, index }: Props) {
  return (
    <Draggable index={index} draggableId={data.id}>
      {(provided) => (
        <div
          className="relative flex w-full flex-col gap-3 overflow-hidden rounded-lg bg-white p-4 shadow-2xl hover:shadow-none"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-wrap gap-1">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className={cn(
                  'cursor-pointer rounded-xl px-2 py-1 text-xs font-semibold text-white',
                  tag.color,
                )}
              >
                {tag.value}
              </span>
            ))}
          </div>
          <h3 className="text-sm font-bold">{data.name}</h3>
          <p className="text-xs text-zinc-500">{data.content}</p>
        </div>
      )}
    </Draggable>
  )
}

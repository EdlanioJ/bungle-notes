/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { DragDropContext } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'
import { api } from '@/utils/api'
import { useBoardStore } from '@/store/board'
import { useEffect } from 'react'
import { Column } from './Column'

export function Board() {
  const { data: tasks, isLoading } = api.task.getUserTasks.useQuery()

  const [board, createBoard] = useBoardStore((store) => [
    store.board,
    store.createBoard,
  ])

  useEffect(() => {
    if (tasks) {
      createBoard(tasks)
    }
  }, [tasks])

  if (isLoading) return <h1>Loading...</h1>

  if (!tasks) return null

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <section className="grid w-full grid-cols-1 gap-12 pt-6 xl:grid-cols-3">
        {Array.from(board.columns.entries()).map(([id, column], index) => (
          <Column key={id} id={id} index={index} data={column} />
        ))}
      </section>
    </DragDropContext>
  )
}

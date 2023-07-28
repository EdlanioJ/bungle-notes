'use client'

import { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'

import { api } from '@/utils/api'
import { useBoardStore } from '@/store/board'
import { useProjectStore } from '@/store/project'
import { Column } from './Column'
import { Spinner } from '../Spinner'
import { BoardUtils } from '@/utils/board'

type Props = {
  data?: Task[]
  isLoading: boolean
}
export function Board({ isLoading, data: tasks }: Props) {
  const { mutate } = api.task.updateStatus.useMutation()

  const [increaseStateCount, decreaseStateCount] = useProjectStore((state) => [
    state.increaseStateCount,
    state.decreaseStateCount,
  ])
  const [board, setBoard] = useBoardStore((store) => [
    store.board,
    store.setBoard,
  ])

  useEffect(() => {
    if (tasks) {
      setBoard(BoardUtils.create(tasks))
    }
  }, [setBoard, tasks])

  if (isLoading) {
    return (
      <Spinner.Container>
        <Spinner size="lg" />
      </Spinner.Container>
    )
  }

  if (!tasks) return null

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) return

    const columns = Array.from(board.columns)
    const startColIndex = columns[Number(source.droppableId)]
    const finishColIndex = columns[Number(destination.droppableId)]

    if (!startColIndex || !finishColIndex) return

    const startCol: Column = {
      id: startColIndex[0],
      tasks: startColIndex[1].tasks,
    }

    const finishCol: Column = {
      id: finishColIndex[0],
      tasks: finishColIndex[1].tasks,
    }

    if (!startCol && !finishCol) return
    if (source.index === destination.index && startCol === finishCol) return

    const newTasks = startCol.tasks
    const [movedTask] = newTasks.splice(source.index, 1)

    if (!movedTask) return

    if (startCol.id === finishCol.id) {
      // Same column task drag
      newTasks.splice(destination.index, 0, movedTask)
      const newCol = {
        id: startCol.id,
        tasks: newTasks,
      }

      const newColumns = new Map(board.columns)
      newColumns.set(startCol.id, newCol)

      setBoard({ ...board, columns: newColumns })
    } else {
      // dragging to another column
      const finishTasks = Array.from(finishCol.tasks)
      finishTasks.splice(destination.index, 0, movedTask)

      const newColumns = new Map(board.columns)
      const newCol = {
        id: startCol.id,
        tasks: newTasks,
      }

      newColumns.set(startCol.id, newCol)
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        tasks: finishTasks,
      })

      mutate({ id: movedTask.id, status: finishCol.id })
      increaseStateCount(finishCol.id, movedTask.project.id)
      decreaseStateCount(startCol.id, movedTask.project.id)
      setBoard({ ...board, columns: newColumns })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="grid w-full grid-cols-1 gap-12 pt-6 xl:grid-cols-3">
        {Array.from(board.columns.entries()).map(([id, column], index) => (
          <Column key={id} id={id} index={index} data={column} />
        ))}
      </section>
    </DragDropContext>
  )
}

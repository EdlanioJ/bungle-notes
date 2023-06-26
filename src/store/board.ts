import { create } from 'zustand'
import { CreateBoard } from '@/utils/board'

type State = {
  board: Board
}

type Actions = {
  createBoard: (tasks: Task[]) => void
  setBoard: (board: Board) => void
}

export const useBoardStore = create<State & Actions>((set) => ({
  board: { columns: new Map<TaskStatus, Column>() },
  createBoard: (tasks) => {
    const board = CreateBoard.run(tasks)
    set({ board })
  },
  setBoard: (board) => {
    set({ board })
  },
}))

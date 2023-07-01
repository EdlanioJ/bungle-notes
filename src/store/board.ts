import { create } from 'zustand'

type State = {
  board: Board
}

type Actions = {
  setBoard: (board: Board) => void
}

export const useBoardStore = create<State & Actions>((set) => ({
  board: { columns: new Map<TaskStatus, Column>() },

  setBoard: (board) => {
    set({ board })
  },
}))

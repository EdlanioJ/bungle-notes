import { create } from 'zustand'

type State = {
  status: TaskStatus
}

type Actions = {
  setStatus: (status: TaskStatus) => void
}

export const useDefaultCreateTaskDataStore = create<State & Actions>((set) => ({
  status: 'todo',

  setStatus: (status) => {
    set({ status })
  },
}))

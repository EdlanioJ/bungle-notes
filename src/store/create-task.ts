import { create } from 'zustand'

type State = {
  status: TaskStatus
  projectId: string
}

type Actions = {
  setStatus: (status: TaskStatus) => void
  setProjectId: (projectId: string) => void
}

export const useDefaultCreateTaskDataStore = create<State & Actions>((set) => ({
  status: 'todo',
  projectId: '',

  setStatus: (status) => {
    set({ status })
  },
  setProjectId: (projectId) => {
    set({ projectId })
  },
}))

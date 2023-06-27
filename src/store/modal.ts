import { create } from 'zustand'

type State = {
  isCreateTaskModalOpen: boolean
}

type Actions = {
  openCreateTaskModal: () => void
  closeCreateTaskModal: () => void
}

export const useModalStore = create<State & Actions>((set) => ({
  isCreateTaskModalOpen: false,

  closeCreateTaskModal: () => {
    set({ isCreateTaskModalOpen: false })
  },

  openCreateTaskModal: () => {
    set({ isCreateTaskModalOpen: true })
  },
}))

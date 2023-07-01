import { create } from 'zustand'

type State = {
  isCreateTaskModalOpen: boolean
  isCreateProjectModalOpen: boolean
}

type Actions = {
  openCreateTaskModal: () => void
  closeCreateTaskModal: () => void
  closeCreateProjectModal: () => void
  openCreateProjectModal: () => void
}

export const useModalStore = create<State & Actions>((set) => ({
  isCreateTaskModalOpen: false,
  isCreateProjectModalOpen: false,

  closeCreateTaskModal: () => set({ isCreateTaskModalOpen: false }),
  openCreateTaskModal: () => set({ isCreateTaskModalOpen: true }),
  closeCreateProjectModal: () => set({ isCreateProjectModalOpen: false }),
  openCreateProjectModal: () => set({ isCreateProjectModalOpen: true }),
}))

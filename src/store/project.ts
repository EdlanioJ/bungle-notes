import { create } from 'zustand'

type ProjectState = {
  project: Project | null
}

type ProjectActions = {
  setProject: (project: Project | null) => void
  increaseStateCount: (status: TaskStatus, projectId: string) => void
  decreaseStateCount: (status: TaskStatus, projectId: string) => void
}

export const useProjectStore = create<ProjectState & ProjectActions>((set) => ({
  project: null,
  setProject: (project) => {
    set({ project })
  },

  increaseStateCount(status, projectId) {
    set((state) => {
      const { project } = state
      if (project === null || project.id !== projectId) return state

      const statusCount = {
        ...project.statusCount,
        [status]: project.statusCount[status] + 1,
      }

      const newProject: Project = {
        ...project,
        statusCount,
      }
      return { ...state, project: newProject }
    })
  },

  decreaseStateCount(status, projectId) {
    set((state) => {
      const { project } = state
      if (project === null || project.id !== projectId) return state

      const statusCount = {
        ...project.statusCount,
        [status]: project.statusCount[status] - 1,
      }

      const newProject: Project = {
        ...project,
        statusCount,
      }
      return { ...state, project: newProject }
    })
  },
}))

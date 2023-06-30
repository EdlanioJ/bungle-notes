import { create } from 'zustand'

type ProjectState = {
  project: Project | null
}

type ProjectActions = {
  setProject: (project: Project | null) => void
}

export const useProjectStore = create<ProjectState & ProjectActions>((set) => ({
  project: null,
  setProject: (project) => {
    set({ project })
  },
}))

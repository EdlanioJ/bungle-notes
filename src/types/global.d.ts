export {}

declare global {
  type TaskStatus = 'done' | 'inProgress' | 'todo'

  interface Task {
    id: string
    name: string
    project: { id: string; name: string }
    content: string
    tags: string[]
    status: TaskStatus
  }
}

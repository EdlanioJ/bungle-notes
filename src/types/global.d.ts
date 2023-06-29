export {}

declare global {
  type TaskStatus = 'done' | 'inProgress' | 'todo'

  type StatusCount = { [status in TaskStatus]: number }

  interface Project {
    id: string
    name: string
    slug: string
    description?: string
    language?: string
    statusCount: StatusCount
  }

  interface Task {
    id: string
    name: string
    project: { id: string; name: string }
    content: string
    tags: string[]
    status: TaskStatus
  }

  interface Column {
    id: TaskStatus
    tasks: Task[]
  }

  interface Board {
    columns: Map<TaskStatus, Column>
  }
}

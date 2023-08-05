import type { Task as DBTask } from '@prisma/client'

type TaskWithProject = DBTask & {
  project: {
    name: string
  }
}

export class TaskMapper {
  public static map(task: TaskWithProject): Task {
    let tags: Tag[] = []
    if (typeof task.tags === 'object' && Array.isArray(task.tags)) {
      const tagsObj = task.tags as Tag[]
      tags = [...tagsObj]
    }

    return {
      id: task.id,
      content: task.content,
      status: task.status,
      name: task.name,
      project: { id: task.projectId, name: task.project.name },
      tags,
    }
  }

  public static mapCollection(tasks: TaskWithProject[]): Task[] {
    return tasks.map(TaskMapper.map)
  }
}

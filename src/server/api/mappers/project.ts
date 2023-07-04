import type { Project as DBProject, Prisma } from '@prisma/client'

type CountType = (Prisma.PickArray<
  Prisma.TaskGroupByOutputType,
  ('status' | 'projectId')[]
> & {
  _count: {
    status: number
  }
})[]
export class ProjectMapper {
  static map(project: DBProject, count?: CountType): Project {
    const statusCount = count
      ? count.reduce(
          (result, response) => {
            result[response.status] = response._count.status
            return result
          },
          { done: 0, inProgress: 0, todo: 0 },
        )
      : { done: 0, inProgress: 0, todo: 0 }
    return {
      id: project.id,
      name: project.name,
      slug: project.slug,
      description: project.description ?? undefined,
      language: project.language ?? undefined,
      statusCount,
    }
  }

  static mapCollection(
    projects: DBProject[],
    statusesCount: CountType[],
  ): Project[] {
    return projects.reduce((result: Project[], project: DBProject) => {
      const count = statusesCount.find(
        (response) => response[0]?.projectId === project.id,
      )
      result.push(ProjectMapper.map(project, count))
      return result
    }, [])
  }
}

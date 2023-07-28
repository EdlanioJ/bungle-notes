import type { Project as DBProject, Prisma } from '@prisma/client'

type CountType = (Prisma.PickEnumerable<
  Prisma.TaskGroupByOutputType,
  ('status' | 'projectId')[]
> & {
  _count: {
    status: number
  }
})[]
export class ProjectMapper {
  static map(project: DBProject, count?: CountType): Project {
    const statusCount: StatusCount = {
      done: 0,
      inProgress: 0,
      todo: 0,
    }

    if (count) {
      count.forEach((result) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        statusCount[result.status] = result._count.status
      })
    }

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (response) => response[0]?.projectId === project.id,
      )
      result.push(ProjectMapper.map(project, count))
      return result
    }, [])
  }
}

import { ProjectBoard } from '@/components/ProjectBoard'
import { ProjectCover } from '@/components/ProjectCover'
import { ssgHelper } from '@/server/helpers/ssgHelper'

async function getData(id: string) {
  const ssg = await ssgHelper()
  const project = await ssg.project.getProject.fetch({ id })
  return project
}

type Props = {
  params: {
    id: string
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props) {
  const project = await getData(params.id)
  return { title: `Projeto ${project.name}` }
}

export default async function ProjectDetails({ params }: Props) {
  const project = await getData(params.id)

  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <ProjectCover data={project} />
      <ProjectBoard id={params.id} />
    </div>
  )
}

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

export async function generateMetadata({ params }: Props) {
  const project = await getData(params.id)
  return { title: `Projeto ${project.name}` }
}

export default async function ProjectDetails({ params }: Props) {
  const project = await getData(params.id)

  return (
    <div className="space-y-8 px-10 py-12 text-[#403937] transition-all">
      <ProjectCover data={project} />
      <ProjectBoard id={params.id} />
    </div>
  )
}

import { ProjectCard } from './ProjectCard'

type Props = {
  data: Project
}
export function ProjectCover({ data }: Props) {
  return <ProjectCard data={data} />
}

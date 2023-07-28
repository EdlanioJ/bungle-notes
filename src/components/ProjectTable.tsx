import { api } from '@/utils/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Spinner } from './Spinner'
import Link from 'next/link'

export function ProjectTable() {
  const { data: projects, isLoading } =
    api.project.getUserFullProjects.useQuery()

  if (isLoading) {
    return (
      <Spinner.Container>
        <Spinner size="lg" />
      </Spinner.Container>
    )
  }

  if (!projects) return null
  return (
    <Table className="rounded-lg bg-white shadow-custom">
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Projeto</TableHead>
          <TableHead>Total de tarefas</TableHead>
          <TableHead>A Fazer</TableHead>
          <TableHead>Fazendo</TableHead>
          <TableHead>Feito</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => {
          const totalTask = Object.values(project.statusCount).reduce(
            (acc, total) => acc + total,
            0,
          )
          const href = `/projects/${project.id}`
          return (
            <Link key={project.id} href={href} passHref legacyBehavior>
              <TableRow className="cursor-pointer">
                <TableCell className="font-semibold">{project.name}</TableCell>
                <TableCell>{totalTask}</TableCell>
                <TableCell>{project.statusCount.todo}</TableCell>
                <TableCell>{project.statusCount.inProgress}</TableCell>
                <TableCell>{project.statusCount.done}</TableCell>
              </TableRow>
            </Link>
          )
        })}
      </TableBody>
    </Table>
  )
}

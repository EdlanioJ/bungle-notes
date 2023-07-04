'use client'

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

          return (
            <TableRow key={project.id}>
              <TableCell className="font-semibold">
                <Link
                  className="hover:underline hover:decoration-2 hover:underline-offset-4"
                  href={`/projects/${project.id}`}
                >
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>{totalTask}</TableCell>
              <TableCell>{project.statusCount.todo}</TableCell>
              <TableCell>{project.statusCount.inProgress}</TableCell>
              <TableCell>{project.statusCount.done}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

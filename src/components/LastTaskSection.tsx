'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export function LastTaskSection() {
  return (
    <section className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
      <p className="text-xs font-bold text-zinc-700">Últimas Tarefas</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tarefa</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-xs">
            <TableCell className="font-semibold">Bem Vindo</TableCell>
            <TableCell>Default</TableCell>
            <TableCell>Feito</TableCell>
            <TableCell>11/07/2023</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  )
}

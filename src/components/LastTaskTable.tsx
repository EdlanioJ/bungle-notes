'use client'

import { Table, TableHead, TableHeader, TableRow } from './ui/table'

export function LastTaskTable() {
  return (
    <Table className="rounded-lg bg-white shadow-2xl transition-all duration-300 hover:shadow-none">
      <TableHeader>
        <TableRow>
          <TableHead>Tarefa</TableHead>
          <TableHead>Projeto</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  )
}

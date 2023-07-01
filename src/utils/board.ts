const columnTypes: TaskStatus[] = ['todo', 'inProgress', 'done']

export class BoardUtils {
  public static create(tasks: Task[]): Board {
    const columns = tasks.reduce((acc, task) => {
      if (!acc.get(task.status)) {
        acc.set(task.status, {
          id: task.status,
          tasks: [],
        })
      }

      acc.get(task.status)?.tasks.push({ ...task })

      return acc
    }, new Map<TaskStatus, Column>())

    for (const columnType of columnTypes) {
      if (!columns.get(columnType)) {
        columns.set(columnType, {
          id: columnType,
          tasks: [],
        })
      }
    }

    const sortedColumns = new Map(
      [...columns.entries()].sort(
        (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]),
      ),
    )

    const board: Board = {
      columns: sortedColumns,
    }
    return board
  }
}

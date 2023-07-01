import { ListFilter, Search } from 'lucide-react'
import { Button } from './Button'

export function SearchFilter() {
  return (
    <section className="flex overflow-hidden rounded-md bg-white text-zinc-900 shadow-custom">
      <Button icon={ListFilter}>Filtrar</Button>
      <label
        htmlFor="search"
        className="flex w-full items-center gap-2 rounded-r-md bg-white px-4 ring-2"
      >
        <Search className="text-2xl" />
        <input
          type="text"
          name="search"
          id="search"
          className="w-full text-sm placeholder:text-zinc-400 focus:outline-0"
          placeholder="Busque por cards, assuntos ou responsáveis..."
        />
      </label>
    </section>
  )
}

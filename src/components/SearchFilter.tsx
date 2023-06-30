import { ListFilter, Search } from 'lucide-react'

export function SearchFilter() {
  return (
    <section className="flex overflow-hidden rounded-md bg-white text-zinc-900 shadow-custom">
      <button
        type="button"
        className="flex items-center gap-2 bg-violet-600 px-4 py-3 text-violet-100 transition-colors hover:bg-violet-600/95"
      >
        <ListFilter />
        <span className="hidden md:inline-block">Filtrar</span>
      </button>
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

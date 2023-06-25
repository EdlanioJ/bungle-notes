import { Logo } from '../Logo'
import { Nav } from './Nav'

export function Sidebar() {
  return (
    <aside className="bg-violet-600 px-3 pt-4 text-violet-300 md:pl-9 md:pr-7">
      <div className="flex items-center gap-2 text-white">
        <Logo className="w-8" />
        <h1 className="hidden text-xl font-bold uppercase md:inline-block">
          Bungle
        </h1>
      </div>

      <Nav />
    </aside>
  )
}

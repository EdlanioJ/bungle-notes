import { X } from 'lucide-react'
import { Nav } from './Nav'

export function Sidebar() {
  return (
    <aside className="animate-show-menu fixed -left-full z-20 hidden h-screen w-60 bg-white shadow-2xl md:sticky md:left-0 md:top-0 md:z-0 md:block md:w-auto md:bg-inherit md:shadow-none">
      <div className="mt-6 flex items-center justify-between">
        <div className="ml-6 md:ml-0">
          <h2 className="font-code text-lg font-bold leading-none text-zinc-600">
            {'<'}
            <span className="text-pink-600">
              K<span className="md:hidden lg:inline">ANBAN</span>
            </span>
            4
            <span className="text-teal-600">
              D<span className="md:hidden lg:inline">EV</span>
            </span>
            {' />'}
          </h2>

          <button type="button" className="pr-4 md:hidden">
            <X />
          </button>
        </div>

        <Nav />
      </div>
    </aside>
  )
}

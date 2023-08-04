import { cn } from '@/utils/cn'
import type { Icon as LucidIcon } from 'lucide-react'

type Props = {
  icon: LucidIcon
  text: string
  active?: boolean
}
export function NavItem({ icon: Icon, text, active = false }: Props) {
  return (
    <div
      className={cn(
        'group relative ml-8 flex h-14 items-center gap-4 text-zinc-600 transition-all',
        {
          'ml-0 bg-zinc-200 text-blue-500 before:h-8 before:w-1 before:bg-blue-500 before:content-[""]':
            active,
        },
      )}
    >
      <Icon
        size={24}
        className="transition-all duration-300 group-hover:ml-2"
      />
      <span className="inline text-sm font-medium md:hidden lg:inline">
        {text}
      </span>
    </div>
  )
}

import { cn } from '@/utils/cn'
import { type LucideIcon } from 'lucide-react'
import { type HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  variant?: 'default' | 'outline'
}
export function Button({
  icon: Icon,
  variant = 'default',
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      type="button"
      className={cn(
        'flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm shadow-2xl transition-all duration-300 hover:shadow-none',
        {
          'bg-violet-600 text-violet-200 hover:bg-violet-600/95':
            variant === 'default',
          'border-2 border-dashed border-blue-500 bg-white text-zinc-400 hover:bg-blue-500 hover:text-white':
            variant === 'outline',
        },
      )}
    >
      <Icon size={18} />
      {children}
    </button>
  )
}

import { cn } from '@/utils/cn'

type Props = {
  children: React.ReactNode
  className?: string
}

export function Heading({ children, className }: Props) {
  return (
    <h1 className={cn('text-xl font-bold text-zinc-800', className)}>
      {children}
    </h1>
  )
}

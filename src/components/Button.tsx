import { type Icon } from 'lucide-react'
import { type HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  icon: Icon
}
export function Button({ icon: IconComp, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      type="button"
      className="flex items-center gap-2 bg-violet-600 px-4 py-3 text-violet-200 transition-colors hover:bg-violet-600/95"
    >
      <IconComp />
      <span className="hidden md:inline-block">{children}</span>
    </button>
  )
}

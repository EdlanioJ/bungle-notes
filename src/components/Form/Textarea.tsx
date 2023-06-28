import clsx from 'clsx'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => {
  const { className, ...rest } = props
  return (
    <textarea
      rows={4}
      className={clsx(' w-full resize-none rounded-md border p-2', className)}
      ref={ref}
      {...rest}
    />
  )
})

Textarea.displayName = 'Textarea'
export { Textarea }

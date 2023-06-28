import clsx from 'clsx'
import { forwardRef, type InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, ...rest } = props
  return (
    <input
      className={clsx('w-full rounded-md border p-2', className)}
      ref={ref}
      {...rest}
    />
  )
})

Input.displayName = 'Input'

export { Input }

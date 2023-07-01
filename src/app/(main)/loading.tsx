import { Spinner } from '@/components/Spinner'

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-100">
      <Spinner size="lg" />
    </div>
  )
}

import { Spinner } from '@/components/Spinner'

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-100">
      <Spinner size="lg" />
    </div>
  )
}

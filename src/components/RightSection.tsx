import { Bell, Menu, MoreVertical, Plus, Volume2 } from 'lucide-react'
import type { Session } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

function getInitialsNames(fullname: string) {
  const names = fullname.split(' ')

  return names.reduce((initials, name, index) => {
    if (index === 0 || index === names.length - 1) {
      return initials + name[0]
    }
    return initials
  }, '')
}

type Props = {
  user: Session['user']
}
export function RightSection({ user }: Props) {
  return (
    <div className="mx-auto mb-16 w-11/12 md:sticky md:top-0 md:mx-0 md:mb-0 md:w-auto md:pt-5">
      <div className="fixed left-0 top-0 z-10 flex h-16 w-full items-center justify-between gap-2 bg-white px-4 shadow-lg md:relative md:h-auto md:w-auto md:justify-end md:gap-8 md:bg-inherit md:px-0 md:shadow-none">
        <button type="button" className="md:hidden">
          <Menu size={24} className="transition-all duration-300" />
        </button>

        <div className="flex gap-4 text-right md:gap-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-zinc-500">
              Olá, <b className="text-zinc-800">{user.name}</b>
            </p>
            <small className="text-xs font-medium text-zinc-500">Dev</small>
          </div>
          <Avatar className="h-11 w-11">
            <AvatarImage src={user.image} />
            <AvatarFallback>{getInitialsNames(user.name)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Lembretes</h2>
          <div className="rounded-full bg-white p-3 shadow-2xl">
            <Bell size={24} className="text-zinc-600" />
          </div>
        </div>

        <div className="mb-3 flex cursor-pointer items-center gap-4 rounded-lg bg-white px-6 py-3 shadow-2xl transition-all duration-300 hover:shadow-none">
          <div className="flex rounded-md bg-teal-600 p-3 text-white">
            <Volume2 />
          </div>
          <div className="m-0 flex w-full items-center justify-between">
            <div className="info">
              <h3 className="leading-tight">Workshop</h3>
              <small className="text_muted">03:00 - 12:00</small>
            </div>
            <MoreVertical />
          </div>
        </div>

        <div className="flex h-11 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-blue-500 bg-white px-4 text-zinc-400 shadow-2xl transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-none">
          <div className="flex items-center gap-2">
            <Plus />
            <h3>Add Reminder</h3>
          </div>
        </div>
      </div>
      Right Section
    </div>
  )
}

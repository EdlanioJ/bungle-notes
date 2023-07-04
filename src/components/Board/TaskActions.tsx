'use client'

import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { MoreVertical, Trash } from 'lucide-react'
import { Fragment } from 'react'

type Props = {
  onDelete: () => void
  isDeleting: boolean
}
export function TaskActions({ onDelete, isDeleting }: Props) {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-all hover:bg-black/5">
          <MoreVertical className="w-4" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 ">
            <Menu.Item disabled={isDeleting}>
              {({ active }) => (
                <button
                  onClick={onDelete}
                  className={clsx(
                    'flex w-full items-center gap-2 px-2 py-2 text-sm font-medium',
                    {
                      'bg-red-400 text-white': active,
                      'text-[#403937]': !active,
                    },
                  )}
                >
                  <Trash />
                  Deletar
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

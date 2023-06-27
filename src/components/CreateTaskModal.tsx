'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/modal'

export function CreateTaskModal() {
  const [isCreateTaskModalOpen, closeCreateTaskModal] = useModalStore(
    (store) => [store.isCreateTaskModalOpen, store.closeCreateTaskModal],
  )

  function handleCloseModal() {
    closeCreateTaskModal()
  }

  return (
    <Transition appear show={isCreateTaskModalOpen} as={Fragment}>
      <Dialog as="form" className="relative z-50" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="grid w-full max-w-2xl transform grid-cols-2 gap-4 space-y-2 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-custom transition-all">
                <Dialog.Title
                  as="h3"
                  className="col-span-2 pb-2 text-lg font-medium leading-6 text-zinc-800"
                >
                  Adicionar Bungle
                </Dialog.Title>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

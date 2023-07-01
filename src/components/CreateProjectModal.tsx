'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/modal'

import { Form } from './Form'

export function CreateProjectModal() {
  const [isOpen, closeModal] = useModalStore((store) => [
    store.isCreateProjectModalOpen,
    store.closeCreateProjectModal,
  ])

  function handleCloseModal() {
    closeModal()
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
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
              <Dialog.Panel className="grid w-full max-w-2xl transform grid-rows-2 gap-4 space-y-2 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-custom transition-all md:grid-cols-2 md:grid-rows-1">
                <Dialog.Title
                  as="h3"
                  className="col-span-2 pb-2 text-lg font-medium leading-6 text-zinc-800"
                >
                  Novo Projeto
                </Dialog.Title>
                <div>
                  <Form.GithubRepoCombobox />
                </div>
                <div />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

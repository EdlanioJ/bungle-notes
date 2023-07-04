/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { z } from 'zod'
import { Fragment, useEffect, useState } from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/modal'

import { Form } from './Form'
import { toast } from 'react-hot-toast'
import { api, type RouterOutputs } from '@/utils/api'

const createProjectFormSchema = z.object({
  language: z.string(),
  repoId: z.number().nullable(),
  description: z.string().nonempty('A descrição é obrigatória'),
  github: z.string().nonempty('O github é obrigatório'),
  name: z.string().nonempty('O nome é obrigatório'),
})

type CreateProjectFormData = z.infer<typeof createProjectFormSchema>
type GithubRepo = RouterOutputs['project']['getUserGithubRepos'][0]

export function CreateProjectModal() {
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | undefined>()
  const [isOpen, closeModal] = useModalStore((store) => [
    store.isCreateProjectModalOpen,
    store.closeCreateProjectModal,
  ])

  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitting },
  } = useForm<CreateProjectFormData>({
    defaultValues: {
      description: '',
      language: '',
      name: '',
      github: '',
    },
    resolver: zodResolver(createProjectFormSchema),
  })

  const trpcUtils = api.useContext()
  const { mutate, isLoading } = api.project.create.useMutation({
    onSuccess: (data) => {
      trpcUtils.project.getUserFullProjects.setData(undefined, (oldData) => {
        return oldData ? [data, ...oldData] : [data]
      })
      trpcUtils.project.getUserProjects.setData(undefined, (oldData) => {
        return oldData
          ? [{ id: data.id, name: data.name }, ...oldData]
          : [{ id: data.id, name: data.name }]
      })

      toast.success(`Projeto ${data.name} adicionado com sucesso`)
      handleCloseModal()
    },
  })

  useEffect(() => {
    if (selectedRepo) {
      reset({
        description: selectedRepo.description ?? '',
        github: selectedRepo.slug,
        language: selectedRepo.language ?? '',
        name: selectedRepo.name,
        repoId: selectedRepo.id,
      })
    }
  }, [reset, selectedRepo])

  const onSubmit = (data: CreateProjectFormData) => {
    mutate({
      description: data.description,
      language: data.language,
      name: data.name,
      repoId: data.repoId,
      slug: data.github,
    })
  }

  function onError(errors: FieldErrors<CreateProjectFormData>) {
    Object.values(errors).forEach((error) => {
      error.message && toast.error(error.message)
    })
  }

  function handleCloseModal() {
    reset()
    closeModal()
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        className="relative z-50"
        onClose={handleCloseModal}
      >
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
              <Dialog.Panel className="w-full max-w-2xl transform gap-2 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-custom transition-all sm:flex sm:flex-col md:grid md:grid-cols-2 md:gap-4">
                <Dialog.Title
                  as="h3"
                  className="pb-2 text-lg font-medium leading-6 text-zinc-800 md:col-span-2"
                >
                  Novo Projeto
                </Dialog.Title>
                <div>
                  <Form.GithubRepoCombobox
                    onChange={setSelectedRepo}
                    value={selectedRepo}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Form.Input
                    placeholder="Nome do Projeto"
                    {...register('name')}
                  />

                  <Form.Input
                    placeholder="Github do Projeto"
                    {...register('github')}
                  />

                  <Form.Input
                    placeholder="Linguagem do Projeto"
                    {...register('language')}
                  />

                  <Form.Textarea
                    placeholder="Descrição do Projeto"
                    {...register('description')}
                  />
                  <input
                    type="hidden"
                    className="hidden"
                    {...register('repoId')}
                  />
                </div>
                <div className="col-span-2 flex items-end justify-end gap-2">
                  <button
                    className="flex w-24 items-center justify-center rounded-lg border py-2 font-medium transition-colors"
                    type="button"
                    disabled={isSubmitting || isLoading}
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button
                    disabled={isSubmitting || isLoading}
                    className="flex w-24 items-center justify-center rounded-lg bg-[#7C3AED] py-2 font-medium text-[#CAB3FF] transition-colors hover:bg-[#7C3AED]/95"
                    type="submit"
                  >
                    Salvar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

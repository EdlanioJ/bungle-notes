/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { z } from 'zod'
import { Controller, type FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { useModalStore } from '@/store/modal'
import { useDefaultCreateTaskDataStore } from '@/store/create-task'
import { api } from '@/utils/api'
import { Form } from './Form'
import { useProjectStore } from '@/store/project'

const createTaskFormSchema = z.object({
  date: z.date(),
  projectId: z.string().nonempty('O projeto é obrigatório'),
  status: z.enum(['todo', 'inProgress', 'done'], {
    required_error: 'O status é obrigatório',
  }),
  tags: z.array(z.string()),
  content: z.string().nonempty('O detalhe é obrigatório'),
  name: z.string().nonempty('O nome é obrigatório'),
})

type CreateTaskFormData = z.infer<typeof createTaskFormSchema>

export function CreateTaskModal() {
  const [isCreateTaskModalOpen, closeCreateTaskModal] = useModalStore(
    (store) => [store.isCreateTaskModalOpen, store.closeCreateTaskModal],
  )
  const [status, projectId] = useDefaultCreateTaskDataStore((store) => [
    store.status,
    store.projectId,
  ])

  const increaseStateCount = useProjectStore(
    (state) => state.increaseStateCount,
  )

  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm<CreateTaskFormData>({
    defaultValues: {
      date: new Date(),
      tags: [],
      name: '',
      projectId: '',
      content: '',
      status,
    },
    resolver: zodResolver(createTaskFormSchema),
  })

  useEffect(() => {
    setValue('status', status)
  }, [status])

  useEffect(() => {
    setValue('projectId', projectId)
  }, [projectId])

  function handleCloseModal() {
    reset()
    closeCreateTaskModal()
  }

  const apiUtils = api.useContext()
  const { mutate, isLoading } = api.task.create.useMutation({
    onSuccess: (data) => {
      apiUtils.task.getUserTasks.setData(undefined, (oldData) => {
        if (!oldData) return [data]
        return [data, ...oldData]
      })

      increaseStateCount(data.status, data.project.id)
      toast.success(`Tarefa ${data.name} criada com sucesso`)
      handleCloseModal()
    },
  })

  const onSubmit = (data: CreateTaskFormData) => {
    mutate({
      content: data.content,
      date: data.date,
      name: data.name,
      projectId: data.projectId,
      status: data.status,
      tags: data.tags,
    })
  }

  const onError = (errors: FieldErrors<CreateTaskFormData>) => {
    Object.values(errors).forEach((error) => {
      error.message && toast.error(error.message)
    })
  }

  return (
    <Transition appear show={isCreateTaskModalOpen} as={Fragment}>
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
              <Dialog.Panel className="grid w-full max-w-2xl transform grid-cols-2 gap-4 space-y-2 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-custom transition-all">
                <Dialog.Title
                  as="h3"
                  className="col-span-2 pb-2 text-lg font-medium leading-6 text-zinc-800"
                >
                  Adicionar Bungle
                </Dialog.Title>
                <div className="space-y-2">
                  <Form.Input
                    placeholder="Titulo da tarefa"
                    {...register('name')}
                  />

                  <Form.Textarea
                    placeholder="Detalhes de tarefa"
                    {...register('content')}
                  />

                  <Controller
                    control={control}
                    name="status"
                    render={({ field: { value, onChange } }) => (
                      <Form.StatusRadio value={value} onChange={onChange} />
                    )}
                  />

                  <Controller
                    control={control}
                    name="tags"
                    render={({ field: { value, onChange } }) => (
                      <Form.TagInput onChange={onChange} value={value} />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Controller
                    control={control}
                    name="projectId"
                    render={({ field: { value, onChange } }) => (
                      <Form.ProjectCombobox value={value} onChange={onChange} />
                    )}
                  />
                  <Controller
                    name="date"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Form.DateInput value={value} onChange={onChange} />
                    )}
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
                    className="flex w-24 items-center justify-center rounded-lg bg-violet-600 py-2 font-medium text-white transition-colors hover:bg-violet-600/95"
                    type="submit"
                    disabled={isSubmitting || isLoading}
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

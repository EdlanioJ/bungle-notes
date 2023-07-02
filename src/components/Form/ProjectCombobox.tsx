'use client'

import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Combobox, Transition } from '@headlessui/react'
import { api } from '@/utils/api'
import { Spinner } from '../Spinner'

type Props = {
  value: string
  onChange: (project: string) => void
}
export function ProjectCombobox({ onChange, value }: Props) {
  const [query, setQuery] = useState('')
  const { data: projects, isLoading } = api.project.getUserProjects.useQuery()

  if (isLoading) {
    return (
      <div className="flex w-full cursor-default items-center justify-between overflow-hidden rounded-lg border bg-white px-3 py-2 text-left">
        <span>A Carregar</span>
        <Spinner size="md" />
      </div>
    )
  }

  if (!projects) {
    return (
      <div className="w-full cursor-default overflow-hidden rounded-lg border bg-white py-2 pl-3 pr-10 text-left">
        <span>Sem Projetos</span>
      </div>
    )
  }
  const filteredProjects =
    query === ''
      ? projects
      : projects.filter((project) =>
          project.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg border bg-white py-2 pl-3 pr-10 text-left focus-within:outline focus-within:outline-2">
          <Combobox.Input
            className="w-full border-none text-gray-900 focus:outline-none focus:ring-0"
            placeholder="Seleciona o Projeto"
            displayValue={(id) =>
              projects.find((project) => project.id === id)?.name ?? ''
            }
            onChange={(event) => setQuery(event.target.value)}
          />

          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="scrollbar absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-zinc-100 py-1 text-base sm:text-sm">
            {filteredProjects.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Projeto não encontrado
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      {
                        'bg-violet-600 text-white': active,
                        'text-gray-900': !active,
                      },
                    )
                  }
                  value={project.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx('block truncate', {
                          'font-medium': selected,
                          'font-normal': !selected,
                        })}
                      >
                        {project.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

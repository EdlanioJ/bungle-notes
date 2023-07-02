'use client'

import { Fragment, useState } from 'react'
import { type RouterOutputs, api } from '@/utils/api'
import { Spinner } from '../Spinner'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import clsx from 'clsx'

type GithubRepo = RouterOutputs['project']['getUserGithubRepos'][0]

type Props = {
  value?: GithubRepo
  onChange: (githubRepo: GithubRepo) => void
}

export function GithubRepoCombobox({ onChange, value }: Props) {
  const [query, setQuery] = useState('')
  const { data: githubRepos, isLoading } =
    api.project.getUserGithubRepos.useQuery()

  if (isLoading) {
    return (
      <div className="flex w-full cursor-default items-center justify-between overflow-hidden rounded-lg border bg-white px-3 py-2 text-left">
        <span>A Carregar</span>
        <Spinner size="md" />
      </div>
    )
  }

  if (!githubRepos) {
    return (
      <div className="w-full cursor-default overflow-hidden rounded-lg border bg-white py-2 pl-3 pr-10 text-left">
        <span>Sem Repositórios</span>
      </div>
    )
  }

  const filteredRepos =
    query === ''
      ? githubRepos
      : githubRepos.filter((repo) =>
          repo.name
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
            placeholder="Seleciona o Repositório"
            displayValue={(id) =>
              githubRepos.find((repo) => repo.id === id)?.name ?? ''
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
          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-zinc-200 py-1 text-base sm:text-sm">
            {filteredRepos.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Repositório não encontrado.
              </div>
            ) : (
              filteredRepos.map((repo, index) => (
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
                  value={repo.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx('block truncate', {
                          'font-medium': selected,
                          'font-normal': !selected,
                        })}
                      >
                        {repo.name}
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

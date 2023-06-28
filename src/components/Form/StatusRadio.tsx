'use client'

import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { CheckCircleIcon } from 'lucide-react'

const types = [
  {
    id: 'todo',
    name: 'A fazer',
    description: 'Nova tarefa a ser concluída',
    color: 'bg-red-500',
  },
  {
    id: 'inProgress',
    name: 'Fazendo',
    description: 'Tarefa que está a ser feita agora',
    color: 'bg-yellow-500',
  },
  {
    id: 'done',
    name: 'Feito',
    description: 'Tarefa concluída',
    color: 'bg-green-500',
  },
]

type Props = {
  value: TaskStatus
  onChange: (status: TaskStatus) => void
}
export function StatusRadio({ value, onChange }: Props) {
  return (
    <div className="w-full">
      <RadioGroup value={value} onChange={(e) => onChange(e)}>
        <div className="space-y-2">
          {types.map((type) => (
            <RadioGroup.Option
              key={type.id}
              value={type.id}
              className={({ active, checked }) =>
                clsx(
                  'relative flex cursor-pointer rounded-lg border px-4 py-1',
                  checked && `${type.color} bg-opacity-75 text-white`,
                  {
                    'ring-2 ring-white ring-opacity-60 ring-offset-sky-300':
                      active,
                    'bg-white': !checked,
                  },
                )
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={clsx('font-medium', {
                            'text-white': checked,
                            'text-gray-900': !checked,
                          })}
                        >
                          {type.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={clsx('inline', {
                            'text-white': checked,
                            'text-gray-900': !checked,
                          })}
                        >
                          {type.description}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckCircleIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

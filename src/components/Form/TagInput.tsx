'use client'

import { X } from 'lucide-react'
import { type KeyboardEvent, useState } from 'react'
import { Input } from './Input'

type Props = {
  value: string[]
  onChange: (tags: string[]) => void
}
export function TagInput({ value, onChange }: Props) {
  const [tag, setTag] = useState('')

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tag !== '') {
      event.preventDefault()
      onChange([...value, tag])
      setTag('')
    }
  }

  const handleDeleteTag = (index: number) => {
    const filteredTags = value.filter((_, tagIndex) => index !== tagIndex)

    onChange(filteredTags)
  }

  return (
    <div className="w-full space-y-2">
      <Input
        placeholder="Adicionar tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-wrap gap-2">
        {value.length === 0 ? (
          <span className="flex gap-1 py-1 text-xs font-semibold uppercase">
            Sem tag
          </span>
        ) : (
          value.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 rounded-lg bg-violet-200 px-2 py-1 text-center text-xs text-violet-600"
            >
              {tag}
              <X
                onClick={() => handleDeleteTag(index)}
                className="w-4 cursor-pointer"
              />
            </span>
          ))
        )}
      </div>
    </div>
  )
}

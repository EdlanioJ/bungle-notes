'use client'

import { X } from 'lucide-react'
import { type KeyboardEvent, useState } from 'react'
import { Input } from './Input'
import { cn } from '@/utils/cn'

const COLORS = [
  'bg-blue-500',
  'bg-orange-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-pink-500',
]

type Props = {
  value: Tag[]
  onChange: (tags: Tag[]) => void
}
export function TagInput({ value, onChange }: Props) {
  // const [tag, setTag] = useState<Tag>()
  const [tag, setTag] = useState('')
  const [usedColors, setUsedColors] = useState<string[]>([])

  const addTag = () => {
    if (tag.trim() !== '' && !value.some((res) => res.value === tag)) {
      let randomColor = ''

      if (usedColors.length === COLORS.length) {
        setUsedColors([])
      }

      do {
        randomColor = COLORS[
          Math.floor(Math.random() * COLORS.length)
        ] as string
      } while (usedColors.includes(randomColor))

      setUsedColors([...usedColors, randomColor])

      onChange([...value, { color: randomColor, value: tag }])
      setTag('')
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()

      addTag()
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
              className={cn(
                'flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-semibold text-white',
                tag.color,
              )}
            >
              {tag.value}
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

/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useDefaultCreateTaskDataStore } from '@/store/create-task'
import { useParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function DefaultCreateTask() {
  const setProjectId = useDefaultCreateTaskDataStore(
    (store) => store.setProjectId,
  )
  const pathname = usePathname()
  const { id } = useParams()

  useEffect(() => {
    if (pathname.includes('/projects/') && id) {
      setProjectId(id)
    } else {
      setProjectId('')
    }
  }, [pathname, id])

  return null
}

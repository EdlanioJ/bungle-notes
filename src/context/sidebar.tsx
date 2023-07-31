'use client'

import { type RefObject, createContext, useRef, useContext } from 'react'

type SidebarProps = {
  handleOpenSidebar: () => void
  handleCloseSidebar: () => void
  sidebar: RefObject<HTMLElement>
}

const SidebarContext = createContext({} as SidebarProps)

type ProviderProps = {
  children: React.ReactNode
}

export function SidebarProvider({ children }: ProviderProps) {
  const sidebar = useRef<HTMLElement>(null)

  function handleOpenSidebar() {
    if (sidebar.current) {
      sidebar.current.classList.remove('hidden')
      sidebar.current.classList.add('block')
    }
  }

  function handleCloseSidebar() {
    if (sidebar.current) {
      sidebar.current.classList.remove('block')
      sidebar.current.classList.add('hidden')
    }
  }

  return (
    <SidebarContext.Provider
      value={{ sidebar, handleCloseSidebar, handleOpenSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const ctx = useContext(SidebarContext)

  return ctx
}

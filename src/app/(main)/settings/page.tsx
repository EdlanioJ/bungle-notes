import { Heading } from '@/components/Heading'
import { getServerAuthSession } from '@/server/auth'
import { Pencil } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: 'Ajustes',
}

export default async function Settings() {
  const session = await getServerAuthSession()
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <Heading>Configurações de Conta</Heading>
      <section className="flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
        <strong className="text-xs text-zinc-700">Meu Perfil</strong>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Image
              alt="Profiles Pic"
              width={126}
              height={126}
              src={session?.user.image as string}
              className="rounded-full"
            />
            <div>
              <strong>{session?.user.name}</strong>
              <span>DEV</span>
            </div>
          </div>

          <button className="flex gap-1 border border-zinc-500 px-2 py-1">
            Editar
            <Pencil />
          </button>
        </div>
      </section>
    </div>
  )
}

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
          <div className="flex items-center gap-2">
            <Image
              alt="Profiles Pic"
              width={126}
              height={126}
              src={session?.user.image as string}
              className="rounded-full"
            />
            <div>
              <strong>{session?.user.name}</strong>
              <p>DEV</p>
            </div>
          </div>

          <button className="flex gap-1 rounded-full border-2 border-zinc-500 px-2 py-1 text-xs font-semibold text-zinc-600">
            Editar
            <Pencil size={10} />
          </button>
        </div>
      </section>
    </div>
  )
}

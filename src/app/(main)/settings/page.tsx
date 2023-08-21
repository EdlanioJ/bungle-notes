import { Heading } from '@/components/Heading'

export const metadata = {
  title: 'Ajustes',
}

export default function Settings() {
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <Heading>Configurações de Conta</Heading>
      <section className="flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 hover:shadow-none">
        <strong className="text-xs text-zinc-700">Meu Perfil</strong>
      </section>
    </div>
  )
}

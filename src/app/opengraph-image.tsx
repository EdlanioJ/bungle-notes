import { ImageResponse } from 'next/server'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Bungle'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          backgroundColor: '#f4f4f5',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          fontWeight: '700',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <span tw="mb-2 self-center font-code text-9xl font-bold leading-none text-zinc-600 antialiased">
          {'<'}
          <span tw="text-pink-600">KANBAN</span>4
          <span tw="text-teal-600">DEV</span>
          {' />'}
        </span>
      </div>
    ),
    {
      ...size,
    },
  )
}

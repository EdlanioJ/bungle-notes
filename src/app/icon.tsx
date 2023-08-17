import { ImageResponse } from 'next/server'

export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700',
          textAlign: 'center',
          fontSize: 18,
        }}
      >
        <span tw="antialiased font-code uppercase">
          <span tw="text-pink-600">K</span>
          <span tw="text-zinc-600 dark:font-zinc-50">4</span>
          <span tw="text-teal-600">D</span>
        </span>
      </div>
    ),
    {
      ...size,
    },
  )
}

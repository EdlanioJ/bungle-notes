/* eslint-disable react/no-unknown-property */
import { Logo } from '@/components/Logo'
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
          backgroundColor: '#7C3AED',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <Logo height={128} width={120} />
        <span tw="text-white uppercase font-black text-9xl">Bungle</span>
      </div>
    ),
    {
      ...size,
    },
  )
}

import { Logo } from '@/components/Logo'
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
          background: '#7C3AED',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 8,
        }}
      >
        <Logo width={20} height={24} />
      </div>
    ),
    {
      ...size,
    },
  )
}

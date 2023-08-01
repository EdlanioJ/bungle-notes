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
          background:
            'linear-gradient(180deg, rgba(219,39,119,1) 50%, rgba(13,148,136,1) 50%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f4f4f5',
          borderRadius: 8,
        }}
      >
        <span tw="font-code">K</span>
      </div>
    ),
    {
      ...size,
    },
  )
}

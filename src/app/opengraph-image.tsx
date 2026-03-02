import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'LUMA3 — Portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span
            style={{
              fontSize: 72,
              fontWeight: 600,
              color: '#fafafa',
              letterSpacing: '-0.02em',
            }}
          >
            luma3
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 600,
              color: '#1978e5',
            }}
          >
            .
          </span>
        </div>

        {/* Tagline */}
        <span
          style={{
            marginTop: 20,
            fontSize: 22,
            color: '#a3a3a3',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
          }}
        >
          I think in systems, create in layers.
        </span>

        {/* Subtle divider line */}
        <div
          style={{
            marginTop: 40,
            width: 60,
            height: 2,
            backgroundColor: '#1978e5',
            borderRadius: 1,
          }}
        />
      </div>
    ),
    { ...size }
  )
}

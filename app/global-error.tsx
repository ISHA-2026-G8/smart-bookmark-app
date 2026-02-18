'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '24px',
          background: '#0f172a',
          color: '#e2e8f0',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            background: '#111827',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ marginTop: 0, marginBottom: '10px' }}>Application error</h1>
          <p style={{ color: '#94a3b8', marginBottom: '18px' }}>
            The app hit an unexpected error. Please retry.
          </p>
          <button
            onClick={reset}
            style={{
              border: 'none',
              borderRadius: '999px',
              padding: '10px 18px',
              background: '#3b82f6',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Reload app
          </button>
          <pre
            style={{
              marginTop: '14px',
              color: '#64748b',
              fontSize: '12px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {error?.message || 'Unknown error'}
          </pre>
        </div>
      </body>
    </html>
  )
}

'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          background: 'var(--surface)',
          border: '1px solid var(--input-border)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow)',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Something went wrong</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          Please try again. If this persists, refresh the page.
        </p>
        <button
          onClick={reset}
          style={{
            border: 'none',
            borderRadius: '999px',
            padding: '10px 18px',
            background: 'var(--primary)',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </div>
    </main>
  )
}

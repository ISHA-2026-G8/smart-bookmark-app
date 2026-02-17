'use client'

import { useEffect, useRef, useState } from 'react'

type ToastEventDetail = {
  message?: string
}

export default function CenterToast() {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent<ToastEventDetail>).detail
      const nextMessage = detail?.message
      if (!nextMessage) return

      setMessage(nextMessage)
      setVisible(true)

      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }

      timerRef.current = window.setTimeout(() => {
        setVisible(false)
      }, 2000)
    }

    window.addEventListener('app-toast', onToast)

    return () => {
      window.removeEventListener('app-toast', onToast)
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: 'var(--surface)',
          color: 'var(--text)',
          border: '1px solid var(--input-border)',
          borderRadius: '14px',
          boxShadow: 'var(--shadow)',
          padding: '14px 18px',
          maxWidth: '460px',
          width: 'calc(100% - 32px)',
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        {message}
      </div>
    </div>
  )
}

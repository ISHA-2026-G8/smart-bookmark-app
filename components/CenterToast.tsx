'use client'

import { useEffect, useRef, useState } from 'react'

type ToastEventDetail = {
  message?: string
  tone?: 'success' | 'danger'
}

export default function CenterToast() {
  const [message, setMessage] = useState('')
  const [tone, setTone] = useState<'success' | 'danger'>('success')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent<ToastEventDetail>).detail
      const nextMessage = detail?.message
      if (!nextMessage) return

      setMessage(nextMessage)
      setTone(detail?.tone === 'danger' ? 'danger' : 'success')
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
          background: tone === 'success' ? '#e8f9ef' : '#fdecec',
          color: tone === 'success' ? '#0f5132' : '#842029',
          border: tone === 'success' ? '1px solid #9ad8b0' : '1px solid #f1aeb5',
          borderRadius: '14px',
          boxShadow:
            tone === 'success'
              ? '0 10px 24px rgba(32, 132, 80, 0.25)'
              : '0 10px 24px rgba(180, 50, 65, 0.25)',
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

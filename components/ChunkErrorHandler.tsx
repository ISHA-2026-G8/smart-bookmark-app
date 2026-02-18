'use client'

import { useEffect } from 'react'

const RELOAD_KEY = 'chunk-reload-attempted'

function isChunkErrorMessage(message: string) {
  const text = message.toLowerCase()
  return (
    text.includes('loading chunk') ||
    text.includes('chunkloaderror') ||
    text.includes('failed to fetch dynamically imported module')
  )
}

function reloadOnceForChunkError() {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem(RELOAD_KEY) === '1') return
  sessionStorage.setItem(RELOAD_KEY, '1')
  window.location.reload()
}

export default function ChunkErrorHandler() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const message = event?.message || ''
      if (isChunkErrorMessage(message)) {
        reloadOnceForChunkError()
      }
    }

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const message =
        typeof reason === 'string'
          ? reason
          : reason?.message || reason?.toString?.() || ''

      if (isChunkErrorMessage(message)) {
        reloadOnceForChunkError()
      }
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onUnhandledRejection)

    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onUnhandledRejection)
    }
  }, [])

  return null
}

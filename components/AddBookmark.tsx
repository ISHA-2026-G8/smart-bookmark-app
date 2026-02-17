'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function normalizeUrl(url: string) {
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export default function AddBookmark() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !url) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('You must be logged in')
      setLoading(false)
      return
    }

    const cleanTitle = title.trim()
    const normalizedUrl = normalizeUrl(url)

    const { data, error } = await supabase
      .from('bookmark')
      .insert([
        {
          user_id: user.id,
          title: cleanTitle,
          url: normalizedUrl,
        },
      ])
      .select()
      .single()

    if (error) {
      alert('Failed to add bookmark: ' + error.message)
    } else {
      window.dispatchEvent(
        new CustomEvent('app-toast', {
          detail: { message: `Bookmark "${cleanTitle}" added successfully.` },
        })
      )

      window.dispatchEvent(
        new CustomEvent('bookmark-added', {
          detail: { bookmark: data },
        })
      )

      setTitle('')
      setUrl('')
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderRadius: '20px',
        padding: '28px 32px',
        boxShadow: 'var(--shadow)',
        marginBottom: '24px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <label
              style={{
                fontWeight: 700,
                fontSize: '15px',
                color: 'var(--text)',
                width: '48px',
                flexShrink: 0,
              }}
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My favorite website"
              required
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '12px',
                border: '1.5px solid var(--input-border)',
                fontSize: '15px',
                color: 'var(--text)',
                background: 'var(--surface-soft)',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <label
              style={{
                fontWeight: 700,
                fontSize: '15px',
                color: 'var(--text)',
                width: '48px',
                flexShrink: 0,
              }}
            >
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '12px',
                border: '1.5px solid var(--input-border)',
                fontSize: '15px',
                color: 'var(--text)',
                background: 'var(--surface-soft)',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '13px 32px',
                borderRadius: '50px',
                background: loading ? '#a0b4f8' : 'var(--primary)',
                color: 'white',
                fontWeight: 700,
                fontSize: '15px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.01em',
              }}
            >
              {loading ? 'Adding...' : '+ Add Bookmark'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

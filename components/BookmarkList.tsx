'use client'

import { useEffect, useMemo, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

type Bookmark = {
  id: string
  title: string
  url: string
  created_at: string
  user_id: string
}

type BookmarkAddedEventDetail = {
  bookmark?: Bookmark
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function normalizeUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url
  return `https://${url}`
}

export default function BookmarkList({
  initialBookmarks,
  userId,
}: {
  initialBookmarks: Bookmark[]
  userId: string
}) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
  const [pendingDelete, setPendingDelete] = useState<Bookmark | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const bookmarkCount = bookmarks.length

  useEffect(() => {
    let mounted = true

    const fetchBookmarks = async () => {
      const { data } = await supabase
        .from('bookmark')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (mounted && data) setBookmarks(data)
    }

    fetchBookmarks()

    const channel = supabase
      .channel(`bookmark-rt-${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookmark', filter: `user_id=eq.${userId}` },
        (payload) => {
          const inserted = payload.new as Bookmark
          setBookmarks((cur) => {
            if (cur.some((item) => item.id === inserted.id)) return cur
            return [inserted, ...cur]
          })
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'bookmark', filter: `user_id=eq.${userId}` },
        (payload) => {
          const updated = payload.new as Bookmark
          setBookmarks((cur) => cur.map((item) => (item.id === updated.id ? updated : item)))
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'bookmark', filter: `user_id=eq.${userId}` },
        (payload) => {
          const deleted = payload.old as Bookmark
          setBookmarks((cur) => cur.filter((item) => item.id !== deleted.id))
        }
      )
      .subscribe()

    const handleBookmarkAdded = (event: Event) => {
      const { detail } = event as CustomEvent<BookmarkAddedEventDetail>
      const added = detail?.bookmark
      if (!added) return
      if (added.user_id !== userId) return

      setBookmarks((cur) => {
        if (cur.some((item) => item.id === added.id)) return cur
        return [added, ...cur]
      })
    }

    window.addEventListener('bookmark-added', handleBookmarkAdded)

    return () => {
      mounted = false
      supabase.removeChannel(channel)
      window.removeEventListener('bookmark-added', handleBookmarkAdded)
    }
  }, [userId])

  const bookmarkToDeleteTitle = useMemo(() => pendingDelete?.title || 'this task', [pendingDelete])
  const bookmarkTitlesText =
    bookmarks.length > 0
      ? bookmarks.map((bookmark) => bookmark.title).join(', ')
      : 'There are no bookmarks yet—go ahead and add yours.'

  const handleDelete = async () => {
    if (!pendingDelete) return

    setIsDeleting(true)

    const id = pendingDelete.id
    const { error } = await supabase.from('bookmark').delete().eq('id', id)

    if (error) {
      alert('Failed to delete: ' + error.message)
      setIsDeleting(false)
      return
    }

    setBookmarks((cur) => cur.filter((item) => item.id !== id))
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: { message: `Bookmark "${pendingDelete.title}" deleted successfully.` },
      })
    )
    setPendingDelete(null)
    setIsDeleting(false)
  }

  return (
    <>
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: '16px',
          border: '1px solid var(--input-border)',
          boxShadow: 'var(--shadow)',
          padding: '14px 18px',
          marginBottom: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
        }}
      >
        <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 700 }}>
          Bookmark Count: <span style={{ color: 'var(--primary)', fontSize: '18px' }}>{bookmarkCount}</span>
        </span>
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          Titles: <span style={{ fontWeight: 600 }}>{bookmarkTitlesText}</span>
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '70px 32px',
            background: 'var(--surface)',
            borderRadius: '20px',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--input-border)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              color: 'var(--primary)',
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '8px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            ✦ Save links faster ✦
          </div>
          <h3 style={{ fontSize: '34px', marginBottom: '10px', fontWeight: 800, position: 'relative', zIndex: 1 }}>
            Your bookmark collection is empty
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '17px', position: 'relative', zIndex: 1 }}>
            Start saving the corners of the internet that matter to you.
          </p>
        </div>
      ) : (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {bookmarks.map((bookmark) => {
          const href = normalizeUrl(bookmark.url)
          const displayUrl = bookmark.url.replace(/^https?:\/\//i, '')

          return (
            <article
              key={bookmark.id}
              style={{
                background: 'var(--surface)',
                borderRadius: '16px',
                padding: '20px 22px',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: 700,
                    fontSize: '17px',
                    color: 'var(--text)',
                    marginBottom: '8px',
                    display: 'block',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={bookmark.title}
                >
                  {bookmark.title}
                </a>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                    display: 'block',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={href}
                >
                  {displayUrl}
                </a>
              </div>

              <button
                onClick={() => setPendingDelete(bookmark)}
                style={{
                  background: '#fde8e8',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                  color: 'var(--danger)',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
                title="Delete bookmark"
              >
                Delete
              </button>
            </article>
          )
        })}
      </div>
      )}

      {pendingDelete ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--overlay)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              background: 'var(--surface)',
              borderRadius: '14px',
              boxShadow: 'var(--shadow)',
              padding: '22px',
            }}
          >
            <h3 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--text)' }}>
              Confirm delete
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
              Would you like to delete {bookmarkToDeleteTitle}?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                disabled={isDeleting}
                style={{
                  border: '1px solid var(--input-border)',
                  borderRadius: '10px',
                  background: 'transparent',
                  color: 'var(--text)',
                  padding: '10px 14px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                style={{
                  border: 'none',
                  borderRadius: '10px',
                  background: 'var(--danger)',
                  color: 'white',
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                {isDeleting ? 'Deleting...' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}


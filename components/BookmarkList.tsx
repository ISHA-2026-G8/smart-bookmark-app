// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { supabase } from '@/lib/supabaseClient'

// type Bookmark = {
//   id: string
//   title: string
//   url: string
//   created_at: string
//   user_id: string
// }

// export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
//   const [bookmark, setBookmark] = useState<Bookmark[]>(initialBookmarks)
//   const router = useRouter()

//   useEffect(() => {
//     const channel = supabase
//       .channel('bookmark-changes')
//       .on(
//         'postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'bookmark',
//         },
//         (payload) => {
//           if (payload.eventType === 'INSERT') {
//             setBookmark((current) => [payload.new as Bookmark, ...current])
//           } else if (payload.eventType === 'DELETE') {
//             setBookmark((current) =>
//               current.filter((bookmark) => bookmark.id !== payload.old.id)
//             )
//           }
//         }
//       )
//       .subscribe()

//     return () => {
//       supabase.removeChannel(channel)
//     }
//   }, [])

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this bookmark?')) {
//       return
//     }

//     const { error } = await supabase.from('bookmark').delete().eq('id', id)

//     if (error) {
//       console.error('Error deleting bookmark:', error)
//       alert('Failed to delete bookmark')
//     } else {
//       router.refresh()
//     }
//   }

//   if (bookmark.length === 0) {
//     return (
//       <div className="text-center py-12 text-gray-500">
//         <p className="text-xl">No bookmark yet. Add your first one above!</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {bookmark.map((bookmark) => (
//         <div
//           key={bookmark.id}
//           className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//         >
//           <div className="flex justify-between items-start">
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold mb-1">
//                 {bookmark.title}
//               </h3>

//               <a
//                 href={bookmark.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:text-blue-700 break-all"
//               >
//                 {bookmark.url}
//               </a>

//               <p className="text-sm text-gray-500 mt-2">
//                 Added {new Date(bookmark.created_at).toLocaleDateString()}
//               </p>
//             </div>

//             <button
//               onClick={() => handleDelete(bookmark.id)}
//               className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }




// 'use client'

// import { useEffect, useState } from 'react'
// import { createBrowserClient } from '@supabase/ssr'

// type Bookmark = {
//   id: string
//   title: string
//   url: string
//   created_at: string
//   user_id: string
// }

// export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
//   const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)

//   const supabase = createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )

//   useEffect(() => {
//     const channel = supabase
//       .channel('bookmark-realtime')
//       .on(
//         'postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'bookmark',
//         },
//         (payload) => {
//           if (payload.eventType === 'INSERT') {
//             // Add new bookmark to top of list instantly
//             setBookmarks((current) => [payload.new as Bookmark, ...current])
//           } else if (payload.eventType === 'DELETE') {
//             // Remove deleted bookmark instantly
//             setBookmarks((current) =>
//               current.filter((b) => b.id !== (payload.old as Bookmark).id)
//             )
//           } else if (payload.eventType === 'UPDATE') {
//             // Update existing bookmark instantly
//             setBookmarks((current) =>
//               current.map((b) =>
//                 b.id === (payload.new as Bookmark).id ? (payload.new as Bookmark) : b
//               )
//             )
//           }
//         }
//       )
//       .subscribe()

//     return () => {
//       supabase.removeChannel(channel)
//     }
//   }, [])

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this bookmark?')) {
//       return
//     }

//     const { error } = await supabase.from('bookmark').delete().eq('id', id)

//     if (error) {
//       console.error('Error deleting bookmark:', error)
//       alert('Failed to delete bookmark: ' + error.message)
//     }
//     // ✅ No router.refresh() needed — real-time subscription handles UI update
//   }

//   if (bookmarks.length === 0) {
//     return (
//       <div className="text-center py-12 text-gray-500">
//         <p className="text-xl">No bookmarks yet. Add your first one above!</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {bookmarks.map((bookmark) => (
//         <div
//           key={bookmark.id}
//           className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//         >
//           <div className="flex justify-between items-start">
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold mb-1">
//                 {bookmark.title}
//               </h3>

//               <a
//                 href={bookmark.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:text-blue-700 break-all"
//               >
//                 {bookmark.url}
//               </a>

//               <p className="text-sm text-gray-500 mt-2">
//                 Added {new Date(bookmark.created_at).toLocaleDateString()}
//               </p>
//             </div>

//             <button
//               onClick={() => handleDelete(bookmark.id)}
//               className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }



// 'use client'

// import { useEffect, useState } from 'react'
// import { createBrowserClient } from '@supabase/ssr'

// type Bookmark = {
//   id: string
//   title: string
//   url: string
//   created_at: string
//   user_id: string
// }

// // ✅ Client created ONCE outside component — stable reference, won't break subscription
// const supabase = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
//   const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)

//   useEffect(() => {
//     // Fetch latest on mount to stay in sync
//     const fetchBookmarks = async () => {
//       const { data } = await supabase
//         .from('bookmark')
//         .select('*')
//         .order('created_at', { ascending: false })
//       if (data) setBookmarks(data)
//     }
//     fetchBookmarks()

//     // ✅ Real-time subscription
//     const channel = supabase
//       .channel('bookmark-realtime-v2')
//       .on(
//         'postgres_changes',
//         { event: 'INSERT', schema: 'public', table: 'bookmark' },
//         (payload) => {
//           console.log('INSERT received:', payload)
//           setBookmarks((current) => [payload.new as Bookmark, ...current])
//         }
//       )
//       .on(
//         'postgres_changes',
//         { event: 'DELETE', schema: 'public', table: 'bookmark' },
//         (payload) => {
//           console.log('DELETE received:', payload)
//           setBookmarks((current) =>
//             current.filter((b) => b.id !== (payload.old as Bookmark).id)
//           )
//         }
//       )
//       .subscribe((status) => {
//         console.log('Realtime status:', status)
//       })

//     return () => {
//       supabase.removeChannel(channel)
//     }
//   }, [])

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this bookmark?')) return

//     const { error } = await supabase.from('bookmark').delete().eq('id', id)

//     if (error) {
//       console.error('Error deleting bookmark:', error)
//       alert('Failed to delete bookmark: ' + error.message)
//     }
//     // ✅ No router.refresh() — real-time handles UI update
//   }

//   if (bookmarks.length === 0) {
//     return (
//       <div className="text-center py-12 text-gray-500">
//         <p className="text-xl">No bookmarks yet. Add your first one above!</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {bookmarks.map((bookmark) => (
//         <div
//           key={bookmark.id}
//           className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//         >
//           <div className="flex justify-between items-start">
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold mb-1">{bookmark.title}</h3>
//               <a
//                 href={bookmark.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:text-blue-700 break-all"
//               >
//                 {bookmark.url}
//               </a>
//               <p className="text-sm text-gray-500 mt-2">
//                 Added {new Date(bookmark.created_at).toLocaleDateString()}
//               </p>
//             </div>
//             <button
//               onClick={() => handleDelete(bookmark.id)}
//               className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }






// 'use client'

// import { useEffect, useState } from 'react'
// import { createBrowserClient } from '@supabase/ssr'

// type Bookmark = {
//   id: string
//   title: string
//   url: string
//   created_at: string
//   user_id: string
// }

// // Client created once outside component
// const supabase = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
//   const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)

//   useEffect(() => {
//     // Fetch latest on mount
//     const fetchBookmarks = async () => {
//       const { data } = await supabase
//         .from('bookmark')
//         .select('*')
//         .order('created_at', { ascending: false })
//       if (data) setBookmarks(data)
//     }
//     fetchBookmarks()

//     // Delay to avoid React Strict Mode double-invoke killing the WebSocket
//     let channel: ReturnType<typeof supabase.channel>

//     const timer = setTimeout(() => {
//       channel = supabase
//         .channel(`bookmark-rt-${Date.now()}`)
//         .on(
//           'postgres_changes',
//           { event: 'INSERT', schema: 'public', table: 'bookmark' },
//           (payload) => {
//             console.log('INSERT received:', payload)
//             setBookmarks((current) => [payload.new as Bookmark, ...current])
//           }
//         )
//         .on(
//           'postgres_changes',
//           { event: 'DELETE', schema: 'public', table: 'bookmark' },
//           (payload) => {
//             console.log('DELETE received:', payload)
//             setBookmarks((current) =>
//               current.filter((b) => b.id !== (payload.old as Bookmark).id)
//             )
//           }
//         )
//         .subscribe((status) => {
//           console.log('Realtime status:', status)
//         })
//     }, 100)

//     return () => {
//       clearTimeout(timer)
//       if (channel) supabase.removeChannel(channel)
//     }
//   }, [])

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this bookmark?')) return

//     const { error } = await supabase.from('bookmark').delete().eq('id', id)

//     if (error) {
//       console.error('Error deleting bookmark:', error)
//       alert('Failed to delete bookmark: ' + error.message)
//     }
//   }

//   if (bookmarks.length === 0) {
//     return (
//       <div className="text-center py-12 text-gray-500">
//         <p className="text-xl">No bookmarks yet. Add your first one above!</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {bookmarks.map((bookmark) => (
//         <div
//           key={bookmark.id}
//           className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//         >
//           <div className="flex justify-between items-start">
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold mb-1">{bookmark.title}</h3>
//               <a
//                 href={bookmark.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:text-blue-700 break-all"
//               >
//                 {bookmark.url}
//               </a>
//               <p className="text-sm text-gray-500 mt-2">
//                 Added {new Date(bookmark.created_at).toLocaleDateString()}
//               </p>
//             </div>
//             <button
//               onClick={() => handleDelete(bookmark.id)}
//               className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

type Bookmark = {
  id: string
  title: string
  url: string
  created_at: string
  user_id: string
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)

  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data } = await supabase
        .from('bookmark')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setBookmarks(data)
    }
    fetchBookmarks()

    let channel: ReturnType<typeof supabase.channel>
    const timer = setTimeout(() => {
      channel = supabase
        .channel(`bookmark-rt-${Date.now()}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookmark' },
          (payload) => setBookmarks((cur) => [payload.new as Bookmark, ...cur]))
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'bookmark' },
          (payload) => setBookmarks((cur) => cur.filter((b) => b.id !== (payload.old as Bookmark).id)))
        .subscribe((status) => console.log('Realtime:', status))
    }, 100)

    return () => { clearTimeout(timer); if (channel) supabase.removeChannel(channel) }
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this bookmark?')) return
    const { error } = await supabase.from('bookmark').delete().eq('id', id)
    if (error) alert('Failed to delete: ' + error.message)
  }

  if (bookmarks.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '64px 32px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      }}>
        <div style={{ fontSize: '52px', marginBottom: '16px' }}>🔖</div>
        <h3 style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#1a1a2e',
          marginBottom: '8px',
          fontFamily: "'DM Sans', sans-serif",
        }}>Your bookmark collection is empty</h3>
        <p style={{
          color: '#8888aa',
          fontSize: '15px',
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: '320px',
          margin: '0 auto',
          lineHeight: '1.6',
        }}>
          Start saving the corners of the internet that matter to you. Add your first bookmark above! ✨
        </p>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        .bookmark-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .bookmark-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
        .delete-btn { opacity: 0; transition: opacity 0.2s ease; }
        .bookmark-card:hover .delete-btn { opacity: 1; }
        .delete-btn:hover { background: #ff4444 !important; color: white !important; }
      `}</style>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bookmark-card"
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '20px 22px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontWeight: '700',
                fontSize: '16px',
                color: '#1a1a2e',
                marginBottom: '6px',
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{bookmark.title}</h3>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#8888aa',
                  fontSize: '13px',
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                }}
              >
                {bookmark.url.replace(/^https?:\/\//, '')}
              </a>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(bookmark.id)}
              style={{
                background: '#f5f5fa',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                color: '#8888aa',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Delete bookmark"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"></path>
                <path d="M10 11v6M14 11v6"></path>
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
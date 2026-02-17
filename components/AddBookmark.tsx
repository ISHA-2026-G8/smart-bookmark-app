// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { supabase } from '@/lib/supabaseClient'

// export default function AddBookmark() {
//   const [title, setTitle] = useState('')
//   const [url, setUrl] = useState('')
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!title || !url) {
//       alert('Please fill in all fields')
//       return
//     }

//     setLoading(true)

//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       alert('You must be logged in')
//       setLoading(false)
//       return
//     }

//     const { error } = await supabase.from('bookmark').insert([
//       {
//         user_id: user.id,
//         title,
//         url,
//       },
//     ])

//     if (error) {
//       console.error('Error adding bookmark:', error)
//       alert('Failed to add bookmark')
//     } else {
//       setTitle('')
//       setUrl('')
//       router.refresh()
//     }

//     setLoading(false)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Add New Bookmark</h2>
      
//       <div className="mb-4">
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//           Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="My Awesome Website"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
//           URL
//         </label>
//         <input
//           type="url"
//           id="url"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="https://example.com"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
//       >
//         {loading ? 'Adding...' : 'Add Bookmark'}
//       </button>
//     </form>
//   )
// }



// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createBrowserClient } from '@supabase/ssr'

// const supabase = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// export default function AddBookmark() {
//   const [title, setTitle] = useState('')
//   const [url, setUrl] = useState('')
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!title || !url) {
//       alert('Please fill in all fields')
//       return
//     }

//     setLoading(true)

//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       alert('You must be logged in')
//       setLoading(false)
//       return
//     }

//     const { error } = await supabase.from('bookmark').insert([
//       {
//         user_id: user.id,
//         title,
//         url,
//       },
//     ])

//     if (error) {
//       console.error('Error adding bookmark:', error)
//       alert('Failed to add bookmark')
//     } else {
//       setTitle('')
//       setUrl('')
//       router.refresh()
//     }

//     setLoading(false)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4 text-gray-900">Add New Bookmark</h2>

//       <div className="mb-4">
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//           Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
//           placeholder="My Awesome Website"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
//           URL
//         </label>
//         <input
//           type="url"
//           id="url"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
//           placeholder="https://example.com"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
//       >
//         {loading ? 'Adding...' : 'Add Bookmark'}
//       </button>
//     </form>
//   )
// }


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AddBookmark() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url) { alert('Please fill in all fields'); return }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { alert('You must be logged in'); setLoading(false); return }
    const { error } = await supabase.from('bookmark').insert([{ user_id: user.id, title, url }])
    if (error) { alert('Failed to add bookmark') }
    else { setTitle(''); setUrl(''); router.refresh() }
    setLoading(false)
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '28px 32px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      marginBottom: '24px',
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <label style={{
              fontWeight: '700',
              fontSize: '15px',
              color: '#1a1a2e',
              width: '48px',
              flexShrink: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Favorite Website"
              required
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '12px',
                border: '1.5px solid #e8e8f0',
                fontSize: '15px',
                color: '#1a1a2e',
                background: '#f8f8fc',
                outline: 'none',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#4f7ef8'}
              onBlur={e => e.target.style.borderColor = '#e8e8f0'}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <label style={{
              fontWeight: '700',
              fontSize: '15px',
              color: '#1a1a2e',
              width: '48px',
              flexShrink: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}>URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '12px',
                border: '1.5px solid #e8e8f0',
                fontSize: '15px',
                color: '#1a1a2e',
                background: '#f8f8fc',
                outline: 'none',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#4f7ef8'}
              onBlur={e => e.target.style.borderColor = '#e8e8f0'}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '13px 32px',
                borderRadius: '50px',
                background: loading ? '#a0b4f8' : '#4f7ef8',
                color: 'white',
                fontWeight: '700',
                fontSize: '15px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s',
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
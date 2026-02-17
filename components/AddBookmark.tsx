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



'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AddBookmark() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // ✅ Create client inside component using createBrowserClient
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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

    const { error } = await supabase.from('bookmark').insert([
      {
        user_id: user.id,
        title,
        url,
      },
    ])

    if (error) {
      console.error('Error adding bookmark:', error)
      alert('Failed to add bookmark')
    } else {
      setTitle('')
      setUrl('')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Bookmark</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="My Awesome Website"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>

      
    </form>
  ) 
}

// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabaseServer'
// import BookmarkList from '@/components/BookmarkList'
// import AddBookmark from '@/components/AddBookmark'
// import LogoutButton from '@/components/LogoutButton'

// export default async function Dashboard() {
//   const supabase = createClient()
  
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   if (!session) {
//     redirect('/')
//   }

//   const { data: bookmark } = await supabase
//     .from('bookmark')
//     .select('*')
//     .order('created_at', { ascending: false })

//   return (
//     <main className="min-h-screen p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold">My Bookmark</h1>
//             <p className="text-gray-600">Welcome, {session.user.email}</p>
//           </div>
//           <LogoutButton />
//         </div>

//         <AddBookmark />
        
//         <div className="mt-8">
//           <BookmarkList initialBookmarks={bookmark || []} />
//         </div>
//       </div>
//     </main>
//   )
// }


import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'
import BookmarkList from '@/components/BookmarkList'
import AddBookmark from '@/components/AddBookmark'
import LogoutButton from '@/components/LogoutButton'

export default async function Dashboard() {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/')

  const { data: bookmarks } = await supabase
    .from('bookmark')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #eef0f7 !important; }
      `}</style>
      <main style={{
        minHeight: '100vh',
        background: '#eef0f7',
        padding: '32px 24px',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '20px 32px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1a1a2e',
                letterSpacing: '-0.5px',
              }}>Smart Bookmarks</h1>
              <p style={{ color: '#8888aa', fontSize: '13px', marginTop: '2px' }}>
                {session.user.email}
              </p>
            </div>
            <LogoutButton />
          </div>

          {/* Add Bookmark Form */}
          <AddBookmark />

          {/* Bookmark Grid */}
          <BookmarkList initialBookmarks={bookmarks || []} />

        </div>
      </main>
    </>
  )
}
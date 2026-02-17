import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'
import BookmarkList from '@/components/BookmarkList'
import AddBookmark from '@/components/AddBookmark'
import LogoutButton from '@/components/LogoutButton'

export default async function Dashboard() {
  const supabase = createClient()
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  const { data: bookmark } = await supabase
    .from('bookmark')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Bookmark</h1>
            <p className="text-gray-600">Welcome, {session.user.email}</p>
          </div>
          <LogoutButton />
        </div>

        <AddBookmark />
        
        <div className="mt-8">
          <BookmarkList initialBookmarks={bookmark || []} />
        </div>
      </div>
    </main>
  )
}
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'
import BookmarkList from '@/components/BookmarkList'
import AddBookmark from '@/components/AddBookmark'
import LogoutButton from '@/components/LogoutButton'
import ThemeToggle from '@/components/ThemeToggle'
import CenterToast from '@/components/CenterToast'

type UserLike = {
  email?: string
  user_metadata?: {
    full_name?: string
    name?: string
    preferred_username?: string
  }
}

function getDisplayName(user: UserLike) {
  const metadataName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.user_metadata?.preferred_username

  if (metadataName) return metadataName

  const email = user.email || ''
  const localPart = email.split('@')[0]
  return localPart || 'there'
}

export default async function Dashboard() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) redirect('/')

  const { data: bookmarks } = await supabase
    .from('bookmark')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  const displayName = getDisplayName(session.user)

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: 'clamp(16px, 3vw, 32px) clamp(12px, 3vw, 24px)',
      }}
    >
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <p
          style={{
            color: 'var(--text)',
            fontSize: 'clamp(18px, 2.6vw, 22px)',
            fontWeight: 700,
            marginBottom: '14px',
          }}
        >
          👋 Hi, Welcome, {displayName}
        </p>

        <header
          className="dashboard-header"
          style={{
            background: 'var(--surface)',
            borderRadius: '20px',
            padding: 'clamp(16px, 2.6vw, 20px) clamp(14px, 2.6vw, 24px)',
            boxShadow: 'var(--shadow)',
            marginBottom: '24px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(26px, 4.2vw, 36px)',
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Smart Bookmarks
            </h1>
            <p
              style={{
                color: 'var(--text-muted)',
                marginTop: '2px',
                fontSize: '13px',
                overflowWrap: 'anywhere',
              }}
            >
              {session.user.email}
            </p>
          </div>

          <div className="dashboard-header-actions">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        <AddBookmark />
        <BookmarkList initialBookmarks={bookmarks || []} userId={session.user.id} />
        <CenterToast />
      </div>
    </main>
  )
}

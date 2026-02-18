import { redirect } from 'next/navigation'
import AuthButton from '@/components/AuthButton'
import ThemeToggle from '@/components/ThemeToggle'
import { createClient } from '@/lib/supabaseServer'

type HomeProps = {
  searchParams?: {
    code?: string | string[]
    next?: string | string[]
  }
}

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function Home({ searchParams }: HomeProps) {
  const code = getParam(searchParams?.code)
  const next = getParam(searchParams?.next)

  // Handle OAuth code on the server to avoid client-side redirect delays.
  if (code) {
    const nextQuery = next && next.startsWith('/') ? `&next=${encodeURIComponent(next)}` : ''
    redirect(`/auth/callback?code=${encodeURIComponent(code)}${nextQuery}`)
  }

  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: 'clamp(12px, 3vw, 24px)',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <header className="home-header" style={{ marginBottom: '28px' }}>
          <div className="home-brand">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 4.5C7 3.67 7.67 3 8.5 3h7A2.5 2.5 0 0 1 18 5.5V20l-6-3-6 3V4.5z"
                stroke="url(#bookmarkGrad)"
                strokeWidth="1.8"
                fill="url(#bookmarkFill)"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="bookmarkGrad" x1="7" y1="3" x2="18" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8ac6ff" />
                  <stop offset="1" stopColor="#4f7ef8" />
                </linearGradient>
                <linearGradient id="bookmarkFill" x1="7" y1="3" x2="18" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="rgba(138,198,255,0.22)" />
                  <stop offset="1" stopColor="rgba(79,126,248,0.18)" />
                </linearGradient>
              </defs>
            </svg>
            <h1
              className="home-title"
              style={{
                fontSize: 'clamp(22px, 6vw, 32px)',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: 'var(--text)',
              }}
            >
              Smart{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #95ccff 0%, #4f7ef8 65%, #3e6de8 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Bookmarks
              </span>
            </h1>
          </div>
          <div className="home-actions">
            <ThemeToggle />
            <AuthButton />
          </div>
        </header>

        <section className="hero-panel" style={{ minHeight: 'auto' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 10vw, 72px)',
              lineHeight: 1.05,
              fontWeight: 800,
              marginBottom: '16px',
              letterSpacing: '-0.8px',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(90deg, #9ad2ff 0%, #61bbff 45%, #3d8dff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Capture what counts
            </span>
            <br />
            <span style={{ color: 'var(--text)' }}>most</span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 4.8vw, 28px)',
              color: 'var(--text-muted)',
              marginBottom: '22px',
              maxWidth: '900px',
              marginInline: 'auto',
            }}
          >
            A clean bookmark manager that syncs instantly across devices and tabs.
          </p>

          <div className="feature-grid">
            <div
              style={{
                background: 'var(--surface-soft)',
                borderRadius: '16px',
                padding: '18px',
                border: '1px solid var(--input-border)',
                boxShadow: '0 10px 22px rgba(0,0,0,0.16)',
              }}
            >
              <h3 style={{ fontSize: 'clamp(24px, 2.4vw, 30px)', marginBottom: '6px' }}>Lightning Fast</h3>
              <h4
                style={{
                  fontSize: 'clamp(22px, 2.4vw, 28px)',
                  marginBottom: '6px',
                  color: 'var(--text)',
                }}
              >
                Real-time
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(16px, 1.8vw, 20px)', lineHeight: 1.3 }}>
                New and deleted bookmarks appear instantly.
              </p>
            </div>
            <div
              style={{
                background: 'var(--surface-soft)',
                borderRadius: '16px',
                padding: '18px',
                border: '1px solid var(--input-border)',
                boxShadow: '0 10px 22px rgba(0,0,0,0.16)',
              }}
            >
              <h3 style={{ fontSize: 'clamp(24px, 2.4vw, 30px)', marginBottom: '6px' }}>Secure</h3>
              <h4
                style={{
                  fontSize: 'clamp(22px, 2.4vw, 28px)',
                  marginBottom: '6px',
                  color: 'var(--text)',
                }}
              >
                Private
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(16px, 1.8vw, 20px)', lineHeight: 1.3 }}>
                Your bookmarks are visible only to your account.
              </p>
            </div>
            <div
              style={{
                background: 'var(--surface-soft)',
                borderRadius: '16px',
                padding: '18px',
                border: '1px solid var(--input-border)',
                boxShadow: '0 10px 22px rgba(0,0,0,0.16)',
              }}
            >
              <h3 style={{ fontSize: 'clamp(24px, 2.4vw, 30px)', marginBottom: '6px' }}>No Clutter</h3>
              <h4
                style={{
                  fontSize: 'clamp(22px, 2.4vw, 28px)',
                  marginBottom: '6px',
                  color: 'var(--text)',
                }}
              >
                Simple
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(16px, 1.8vw, 20px)', lineHeight: 1.3 }}>
                Add, open, and remove links with no clutter.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

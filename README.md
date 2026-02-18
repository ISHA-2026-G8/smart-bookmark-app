# 📚 Smart Bookmark App

A full-stack, real-time bookmark manager built with **Next.js 14 + Supabase** where users sign in with Google, save private links, and see updates sync instantly across tabs.

---

## 🔗 Links

| | URL |
|---|---|
| 🌐 **Live App** | _Add your deployed URL_ |
| 💻 **GitHub Repo** | _Add your repository URL_ |

---

## ✅ Core Requirements Met

| Requirement | Status |
|---|---|
| Google OAuth only (no email/password) | ✅ Done |
| Add bookmark (title + URL) | ✅ Done |
| Private bookmarks per user | ✅ Done via RLS-compatible design |
| Real-time sync without refresh | ✅ Done via Supabase Realtime |
| Delete own bookmarks | ✅ Done |
| Next.js App Router | ✅ Done |
| Supabase Auth + DB + Realtime | ✅ Done |
| Deployed-ready for Vercel | ✅ Done |

---

## ✨ Features

- 🔐 **Google OAuth Login** via Supabase Auth
- 📌 **Add Bookmarks** with URL normalization (`https://` auto-handled, typo fixes like `htp://`)
- 🧪 **URL Validation** before insert using `new URL(...)`
- 🔒 **Per-User Privacy** with `user_id` filtering and RLS-ready schema
- ⚡ **Realtime Updates** (`INSERT`, `UPDATE`, `DELETE`) using Supabase channels
- 🗑️ **Safe Delete Flow** with confirmation modal
- 🔔 **Centered Toast Notifications** for add/delete success states
- 🌙 **Light/Dark Theme Toggle** persisted in `localStorage`
- 🖼️ **Automatic Favicons** fetched per bookmark domain
- 👋 **Personalized Greeting** based on profile metadata/email
- 📊 **Bookmark Summary Strip** showing total count + titles

---

## 🛠️ Tech Stack

| Technology | Why |
|---|---|
| **Next.js 14 (App Router)** | Server + client component architecture with modern routing |
| **TypeScript** | Strong typing and safer refactors |
| **Supabase Auth** | Secure Google OAuth + session management |
| **Supabase PostgreSQL** | Bookmark persistence with RLS support |
| **Supabase Realtime** | Instant cross-tab synchronization |
| **Tailwind CSS** | Base styling utilities + global setup |
| **Vercel** | Fast deployment for Next.js |

---

## 📁 Project Structure

```text
smart-bookmark-app/
├── app/
│   ├── auth/callback/route.ts     # Exchanges OAuth code for session
│   ├── dashboard/page.tsx         # Protected dashboard (server auth + initial fetch)
│   ├── globals.css                # Theme tokens and global styles
│   ├── layout.tsx                 # App layout and metadata
│   └── page.tsx                   # Landing page + auth/session redirects
│
├── components/
│   ├── AddBookmark.tsx            # Add form + URL normalization + insert
│   ├── BookmarkList.tsx           # Realtime list + delete confirmation
│   ├── CenterToast.tsx            # Global centered toast listener
│   ├── AuthButton.tsx             # Google sign-in trigger
│   ├── LogoutButton.tsx           # Sign out action
│   ├── ThemeToggle.tsx            # Persistent theme switch
│   └── LoginButton.tsx            # Alternate login button (currently unused)
│
├── lib/
│   ├── supabaseClient.ts          # Browser Supabase client
│   └── supabaseServer.ts          # Server Supabase client (cookie-aware)
│
├── middleware.ts                  # Session refresh middleware
├── .env.local                     # Local environment variables (not committed)
└── README.md
```

---

## 🗄️ Database Schema

> Current app queries table: `bookmark`

```sql
create table if not exists public.bookmark (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamptz not null default now()
);

alter table public.bookmark enable row level security;

create policy "Users can view own bookmarks"
on public.bookmark
for select
using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
on public.bookmark
for insert
with check (auth.uid() = user_id);

create policy "Users can update own bookmarks"
on public.bookmark
for update
using (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
on public.bookmark
for delete
using (auth.uid() = user_id);
```

To ensure realtime events are emitted:

```sql
alter publication supabase_realtime add table public.bookmark;
```

---

## ⚡ Realtime Implementation

`BookmarkList.tsx` subscribes to row changes filtered by current user:

```ts
const channel = supabase
  .channel(`bookmark-rt-${userId}`)
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookmark', filter: `user_id=eq.${userId}` }, ...)
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'bookmark', filter: `user_id=eq.${userId}` }, ...)
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'bookmark', filter: `user_id=eq.${userId}` }, ...)
  .subscribe()
```

Result: bookmark changes appear instantly across open sessions for the same user.

---

## 🔐 Auth and Session Flow

1. User clicks **Sign in with Google**.
2. Supabase redirects to `/auth/callback?code=...&next=/dashboard`.
3. `app/auth/callback/route.ts` exchanges code for session cookie.
4. User is redirected to `/dashboard`.
5. `middleware.ts` refreshes/maintains session cookies.
6. Dashboard server component checks session and redirects unauthenticated users to `/`.

---

## 🚀 Local Development

### 1. Install

```bash
npm install
```

### 2. Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Supabase Setup

- Create a Supabase project
- Run the SQL schema above
- Enable **Google** under Authentication Providers
- Add redirect URL(s):
  - `http://localhost:3000/auth/callback`
  - `https://your-domain.com/auth/callback`

### 4. Run

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## 📜 Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint checks

---

## 🧩 Notable Implementation Details

- Landing page redirects authenticated users directly to dashboard.
- Landing page also forwards `?code=...` to callback route safely.
- Add flow dispatches custom browser events:
  - `bookmark-added` for optimistic UI sync
  - `app-toast` for centered notifications
- Delete flow uses confirmation modal, then emits danger toast.
- Theme preference stored as `smart-bookmark-theme` in `localStorage`.

---

## 🔒 Security Notes

- Authentication handled by Supabase OAuth tokens/cookies.
- Data isolation is enforced by `user_id` + RLS policies at database layer.
- Session checks are server-side on protected routes (`/dashboard`).

---

## 🎯 Future Improvements

- Add edit bookmark support
- Add search, filters, and tags
- Add automated unit/integration tests
- Improve accessibility and keyboard navigation

---

Built with Next.js, Supabase, and TypeScript.

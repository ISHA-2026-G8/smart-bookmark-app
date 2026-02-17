import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabaseServer"
import AuthButton from "@/components/AuthButton"

export default async function Home() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col gap-8 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to Smart Bookmark App
        </h1>
        <p className="text-gray-600">
          Manage your bookmarks efficiently with real-time sync
        </p>
        <AuthButton />
      </div>
    </main>
  )
}

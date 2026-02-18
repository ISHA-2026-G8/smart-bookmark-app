"use client"

import { supabase } from "@/lib/supabaseClient"

export default function LoginButton() {
  const handleLogin = async () => {
    const redirectOrigin =
      process.env.NEXT_PUBLIC_APP_URL || window.location.origin

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${redirectOrigin}/auth/callback?next=/dashboard`
      }
    })
  }

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      Sign in
    </button>
  )
}

"use client"

import { supabase } from "@/lib/supabaseClient"

export default function LoginButton() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback"
      }
    })
  }

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      Sign in with Google
    </button>
  )
}

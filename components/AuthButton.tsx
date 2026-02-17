"use client";

import { createBrowserClient } from "@supabase/ssr";

export default function AuthButton() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async () => {
    const redirectOrigin = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${redirectOrigin}/auth/callback?next=/dashboard`,
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        background: "var(--primary)",
        color: "white",
        fontWeight: "700",
        fontSize: "15px",
        padding: "12px 20px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
        minWidth: "210px",
      }}
    >
      <span style={{ fontWeight: 800 }}>G</span>
      Sign in with Google
    </button>
  );
}

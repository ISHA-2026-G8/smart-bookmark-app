import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // If env vars are missing, skip middleware to avoid 500
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Missing Supabase environment variables")
    return NextResponse.next()
  }

  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            req.cookies.set({ name, value, ...options })
            res = NextResponse.next({ request: { headers: req.headers } })
            res.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            req.cookies.set({ name, value: "", ...options })
            res = NextResponse.next({ request: { headers: req.headers } })
            res.cookies.set({ name, value: "", ...options })
          },
        },
      }
    )

    await supabase.auth.getSession()
  } catch (error) {
    console.error("Middleware error:", error)
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
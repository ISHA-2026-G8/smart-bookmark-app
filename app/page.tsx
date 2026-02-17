// import { redirect } from "next/navigation"
// import { createClient } from "@/lib/supabaseServer"
// import AuthButton from "@/components/AuthButton"

// export default async function Home() {
//   const supabase = createClient()

//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   if (session) {
//     redirect("/dashboard")
//   }

//   return (
    
    
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <div className="flex flex-col gap-8 text-center">
//         <h1 className="text-4xl font-bold">
//           Welcome to Smart Bookmark App
//         </h1>
//         <p className="text-gray-600">
//           Manage your bookmarks efficiently with real-time sync
//         </p>
//         <AuthButton />
//       </div>
//     </main>
    
//   )
// }



// import { redirect } from "next/navigation"
// import { createClient } from "@/lib/supabaseServer"
// import AuthButton from "@/components/AuthButton"

// export default async function Home() {
//   const supabase = createClient()

//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   if (session) {
//     redirect("/dashboard")
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: #eef0f7; font-family: 'DM Sans', sans-serif; }
//       `}</style>
//       <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#eef0f7]">
//         <div className="flex flex-col gap-8 text-center bg-white p-10 rounded-2xl shadow-lg max-w-md">
//           <h1 className="text-3xl font-extrabold text-gray-800">
//             Welcome to Smart Bookmark App
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Manage your bookmarks efficiently with real-time sync
//           </p>
//           <AuthButton />
//         </div>
//       </main>
//     </>
//   )
// }


// import { redirect } from "next/navigation"
// import { createClient } from "@/lib/supabaseServer"
// import AuthButton from "@/components/AuthButton"

// export default async function Home() {
//   const supabase = createClient()

//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   if (session) {
//     redirect("/dashboard")
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: linear-gradient(135deg, #e0f7fa, #e3f2fd); font-family: 'DM Sans', sans-serif; }
//       `}</style>
//       <main className="flex min-h-screen flex-col items-center justify-center p-6">
//         <div className="flex flex-col gap-6 text-center bg-white p-10 rounded-3xl shadow-2xl max-w-lg">
//           {/* Title */}
//           <h1 className="text-3xl font-extrabold text-gray-800">
//             Welcome to Smart Bookmark App
//           </h1>

//           {/* Subtitle */}
//           <p className="text-gray-600 text-lg">
//             Manage your bookmarks efficiently with real-time sync
//           </p>

//           {/* Sign In Button */}
//           <button
//             className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-blue-500 text-white font-semibold text-lg py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
//           >
//             <img
//               src="/google-icon.png"
//               alt="Google Icon"
//               className="w-5 h-5"
//             />
//             Sign in with Google
//           </button>
//         </div>
//       </main>
//     </>
//   )
// }









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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #eef0f7 !important; font-family: 'DM Sans', sans-serif; }
      `}</style>
      <main style={{
        minHeight: '100vh',
        background: '#eef0f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '52px 48px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.09)',
          maxWidth: '460px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
        }}>
          {/* Icon */}
          <div style={{
            width: '64px',
            height: '64px',
            background: '#eef0f7',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            marginBottom: '4px',
          }}>
            🔖
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#1a1a2e',
            letterSpacing: '-0.5px',
            lineHeight: '1.2',
          }}>
            Welcome to Smart Bookmark App
          </h1>

          {/* Subtitle */}
          <p style={{
            color: '#8888aa',
            fontSize: '15px',
            lineHeight: '1.6',
            maxWidth: '320px',
          }}>
            Save, organize and access your favorite links — all in one place with real-time sync.
          </p>

          {/* Sign In Button */}
          <AuthButton />
        </div>
      </main>
    </>
  )
}
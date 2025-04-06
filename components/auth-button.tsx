"use client"

import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"
import { Loader2 } from "lucide-react"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button variant="ghost" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-300 hidden sm:inline-block">{session.user?.name}</span>
        <Button variant="outline" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    )
  }

  return <Button onClick={() => signIn("google")}>Login with Google</Button>
}


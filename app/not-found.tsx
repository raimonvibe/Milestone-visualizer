import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 text-center">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg shadow-lg p-8 border border-zinc-700">
          <h2 className="text-3xl font-bold mb-4 text-zinc-100">Page Not Found</h2>
          <p className="text-zinc-300 mb-6">The page you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


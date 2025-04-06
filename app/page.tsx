import { MilestoneCreator } from "@/components/milestone-creator"
import { AuthButton } from "@/components/auth-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-100">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Milestone Visualizer
        </h1>
        <AuthButton />
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Create Beautiful Milestone Images
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              Celebrate your achievements with custom milestone images. Perfect for social media, newsletters, or your
              website.
            </p>
          </div>

          <MilestoneCreator />
        </section>
      </main>

      <footer className="container mx-auto py-8 px-4 border-t border-zinc-800 mt-12">
        <div className="text-center text-zinc-400">
          <p>© {new Date().getFullYear()} Milestone Visualizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


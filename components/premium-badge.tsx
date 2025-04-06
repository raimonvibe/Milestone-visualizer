import { Crown } from "lucide-react"

export function PremiumBadge() {
  return (
    <div className="bg-gradient-to-br from-zinc-800/95 to-zinc-900/95 rounded-lg p-6 flex flex-col items-center justify-center max-w-xs mx-auto border border-purple-500/50 shadow-lg shadow-purple-500/20">
      <Crown className="h-12 w-12 text-transparent bg-gradient-to-r from-amber-400 to-purple-500 bg-clip-text mb-4" />
      <h3 className="text-xl font-bold text-center mb-2 text-zinc-100">Premium Style</h3>
      <p className="text-zinc-300 text-center mb-4">
        Unlock premium styles for just €3 to download this milestone image.
      </p>
    </div>
  )
}


"use client"

import { useMemo } from "react"

interface StylePreviewProps {
  text: string
  styleId: string
}

export function StylePreview({ text, styleId }: StylePreviewProps) {
  const styleConfig = useMemo(() => {
    switch (styleId) {
      case "minimal":
        return {
          container: "bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 w-full h-full flex items-center justify-center",
          text: "text-4xl md:text-5xl font-bold text-white text-center",
        }
      case "gradient":
        return {
          container:
            "bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 p-12 w-full h-full flex items-center justify-center",
          text: "text-4xl md:text-5xl font-bold text-white text-center drop-shadow-md",
        }
      case "outline":
        return {
          container: "bg-gradient-to-br from-zinc-800 to-zinc-950 p-12 w-full h-full flex items-center justify-center",
          text: "text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-white text-center [text-shadow:_-1px_-1px_0_#6366f1,_1px_-1px_0_#6366f1,_-1px_1px_0_#6366f1,_1px_1px_0_#6366f1]",
        }
      case "neon":
        return {
          container: "bg-gradient-to-br from-zinc-900 to-black p-12 w-full h-full flex items-center justify-center",
          text: "text-4xl md:text-5xl font-bold text-center text-cyan-400 [text-shadow:_0_0_5px_#22d3ee,_0_0_20px_#22d3ee,_0_0_40px_#22d3ee]",
        }
      case "3d":
        return {
          container: "bg-gradient-to-b from-zinc-800 to-zinc-950 p-12 w-full h-full flex items-center justify-center",
          text: "text-4xl md:text-5xl font-extrabold text-center text-zinc-300 [text-shadow:_3px_3px_0_#6366f1,_6px_6px_0_#4f46e5,_9px_9px_0_#4338ca]",
        }
      case "confetti":
        return {
          container:
            "bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 w-full h-full flex items-center justify-center bg-[url('/placeholder.svg?height=600&width=800')] bg-cover",
          text: "text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent px-6 py-4 rounded-lg",
        }
      case "gold":
        return {
          container:
            "bg-gradient-to-b from-zinc-900 via-amber-950 to-zinc-950 p-12 w-full h-full flex items-center justify-center",
          text: "text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-600 [text-shadow:_0_0_10px_rgba(251,191,36,0.5)]",
        }
      default:
        return {
          container: "bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 w-full h-full flex items-center justify-center",
          text: "text-4xl md:text-5xl font-bold text-white text-center",
        }
    }
  }, [styleId])

  return (
    <div className={styleConfig.container}>
      <h2 className={styleConfig.text}>{text}</h2>
    </div>
  )
}


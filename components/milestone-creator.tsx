"use client"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { StylePreview } from "@/components/style-preview"
import { PremiumBadge } from "@/components/premium-badge"
import { Download, Crown } from "lucide-react"
import html2canvas from "html2canvas"

const FREE_STYLES = [
  { id: "minimal", name: "Minimal" },
  { id: "gradient", name: "Gradient" },
  { id: "outline", name: "Outline" },
]

const PREMIUM_STYLES = [
  { id: "neon", name: "Neon Glow" },
  { id: "3d", name: "3D Effect" },
  { id: "confetti", name: "Confetti" },
  { id: "gold", name: "Gold Premium" },
]

export function MilestoneCreator() {
  const { data: session } = useSession()
  const [milestoneText, setMilestoneText] = useState("1000 Subscribers")
  const [selectedStyle, setSelectedStyle] = useState("minimal")
  const [isPremiumSelected, setIsPremiumSelected] = useState(false)
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  // Check if user has premium access (in a real app, this would check the database)
  useEffect(() => {
    if (session) {
      // This is a placeholder. In a real app, you would check if the user has purchased premium access
      // For demo purposes, we'll assume they don't have premium access yet
      setHasPremiumAccess(false)
    } else {
      setHasPremiumAccess(false)
    }
  }, [session])

  // Check if selected style is premium
  useEffect(() => {
    const isPremium = PREMIUM_STYLES.some((style) => style.id === selectedStyle)
    setIsPremiumSelected(isPremium)
  }, [selectedStyle])

  const handleStyleChange = (value: string) => {
    setSelectedStyle(value)
  }

  const handleDownload = async () => {
    if (isPremiumSelected && !hasPremiumAccess) {
      // Redirect to payment
      redirectToCheckout()
      return
    }

    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2, // Higher resolution
      })

      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `milestone-${milestoneText.toLowerCase().replace(/\s+/g, "-")}.png`
      link.click()
    }
  }

  const redirectToCheckout = async () => {
    // In a real app, this would redirect to your Stripe checkout
    // For demo purposes, we'll just log a message
    console.log("Redirecting to Stripe checkout...")

    // This would be your actual implementation:
    // const response = await fetch("/api/create-checkout-session", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     styleId: selectedStyle,
    //   }),
    // });
    // const { url } = await response.json();
    // window.location.href = url;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700">
        <h3 className="text-xl font-semibold mb-4 text-zinc-100">Customize Your Milestone</h3>

        <div className="space-y-6">
          <div>
            <label htmlFor="milestone-text" className="block text-sm font-medium mb-2 text-zinc-300">
              Milestone Text
            </label>
            <Input
              id="milestone-text"
              value={milestoneText}
              onChange={(e) => setMilestoneText(e.target.value)}
              placeholder="e.g., 1000 Subscribers"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="style" className="block text-sm font-medium mb-2 text-zinc-300">
              Style
            </label>
            <Select value={selectedStyle} onValueChange={handleStyleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                <div className="py-2 px-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">Free Styles</div>
                {FREE_STYLES.map((style) => (
                  <SelectItem key={style.id} value={style.id}>
                    {style.name}
                  </SelectItem>
                ))}

                <div className="py-2 px-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2 border-t">
                  Premium Styles
                </div>
                {PREMIUM_STYLES.map((style) => (
                  <SelectItem key={style.id} value={style.id}>
                    <div className="flex items-center">
                      {style.name}
                      <Crown className="ml-2 h-3 w-3 text-amber-500" />
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleDownload}
            className="w-full"
            variant={isPremiumSelected && !hasPremiumAccess ? "default" : "default"}
          >
            {isPremiumSelected && !hasPremiumAccess ? (
              <>
                <Crown className="mr-2 h-4 w-4" />
                Unlock Premium for €3
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </>
            )}
          </Button>
        </div>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-zinc-100">Preview</h3>
        <div className="relative">
          <div
            ref={previewRef}
            className="w-full aspect-video flex items-center justify-center rounded-lg overflow-hidden"
          >
            <StylePreview text={milestoneText} styleId={selectedStyle} />
          </div>

          {isPremiumSelected && !hasPremiumAccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <PremiumBadge />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


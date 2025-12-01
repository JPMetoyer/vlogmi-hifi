"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OnboardingCarousel } from "@/components/onboarding-carousel"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Download, Share2, Sparkles, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleCloseOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem("hasSeenOnboarding", "true")
  }

  const quickStats = [
    { label: "Clips Ready", value: "23", trend: "+12 this week", icon: Sparkles },
    { label: "Total Views", value: "1.2M", trend: "+150K", icon: TrendingUp },
  ]

  const recentClips = [
    {
      id: 1,
      title: "Summer Beach Vlog - Best Moment",
      thumbnail: "/beach.webp",
      duration: "0:34",
      status: "Ready",
      views: "45.2K",
      engagement: "8.3%",
    },
    {
      id: 2,
      title: "Morning Routine Hack",
      thumbnail: "/morning.avif",
      duration: "0:28",
      status: "Ready",
      views: "32.1K",
      engagement: "7.1%",
    },
    {
      id: 3,
      title: "Cooking Adventure Highlight",
      thumbnail: "/cooking.jpg",
      duration: "0:41",
      status: "Processing",
      views: "-",
      engagement: "-",
    },
  ]

  return (
    <DashboardLayout>
      {showOnboarding && <OnboardingCarousel onClose={handleCloseOnboarding} />}

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Your AI Clips 🎬</h1>
          <p className="text-muted-foreground text-lg">Your videos, transformed into viral moments</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="p-6 border-2 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-4xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs text-accent font-medium">{stat.trend}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Clips</h2>
            <Button variant="outline" onClick={() => setShowOnboarding(true)}>
              Show Tutorial
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {recentClips.map((clip) => (
              <Card key={clip.id} className="overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={clip.thumbnail || "/placeholder.svg"}
                    alt={clip.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-14 h-14 p-0">
                      <Play className="w-6 h-6 fill-current" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-background/90 text-foreground border">
                    {clip.duration}
                  </Badge>
                  <Badge
                    className={cn(
                      "absolute top-2 left-2",
                      clip.status === "Ready"
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {clip.status}
                  </Badge>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-semibold line-clamp-2 leading-snug">{clip.title}</h3>

                  {clip.status === "Ready" && (
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>{clip.views} views</span>
                      <span>•</span>
                      <span>{clip.engagement} engagement</span>
                    </div>
                  )}

                  {clip.status === "Ready" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                      <Button size="sm" className="flex-1 gap-2 bg-primary">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-primary rounded-full animate-pulse" />
                      </div>
                      <span>67%</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-dashed">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="text-5xl">🎥</div>
            <h3 className="text-2xl font-bold">Ready to Create More Magic?</h3>
            <p className="text-muted-foreground">Upload a new video and let AI find the best moments for you</p>
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Sparkles className="w-5 h-5" />
              Upload Video
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { TrendingUp, Eye, Heart, Share2 } from "lucide-react"

export default function InsightsPage() {
  const stats = [
    { label: "Total Views", value: "1.2M", change: "+15%", icon: Eye },
    { label: "Engagement", value: "8.3%", change: "+2.1%", icon: Heart },
    { label: "Shares", value: "45K", change: "+22%", icon: Share2 },
    { label: "Trending Clips", value: "12", change: "+5", icon: TrendingUp },
  ]

  const topClips = [
    {
      title: "Summer Beach Sunset",
      views: "456K",
      engagement: "12.3%",
      platform: "TikTok",
    },
    {
      title: "Morning Coffee Hack",
      views: "321K",
      engagement: "9.8%",
      platform: "Instagram",
    },
    {
      title: "Cooking Adventure",
      views: "278K",
      engagement: "8.1%",
      platform: "YouTube",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Performance Insights 📊</h1>
          <p className="text-muted-foreground text-lg">See how your clips are performing across platforms</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="p-6 border-2 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-accent font-medium">{stat.change} from last week</p>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Top Performing Clips 🏆</h3>
            <div className="space-y-4">
              {topClips.map((clip, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium mb-1">{clip.title}</p>
                    <div className="flex gap-3 text-sm text-muted-foreground">
                      <span>{clip.views} views</span>
                      <span>•</span>
                      <span>{clip.engagement} engagement</span>
                    </div>
                  </div>
                  <Badge variant="outline">{clip.platform}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Platform Breakdown 📱</h3>
            <div className="space-y-4">
              {[
                { platform: "TikTok", clips: 15, views: "678K", color: "bg-[#00f2ea]" },
                { platform: "Instagram", clips: 12, views: "432K", color: "bg-[#E4405F]" },
                { platform: "YouTube", clips: 8, views: "321K", color: "bg-[#FF0000]" },
              ].map((item) => (
                <div key={item.platform} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.platform}</span>
                    <span className="text-muted-foreground">
                      {item.clips} clips • {item.views} views
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: "75%" }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Views Over Time 📈</h3>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">[Interactive chart showing view trends]</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function Badge({ children, variant = "default", className = "" }: any) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        variant === "outline" ? "border border-border bg-background" : "bg-primary/10 text-primary"
      } ${className}`}
    >
      {children}
    </span>
  )
}

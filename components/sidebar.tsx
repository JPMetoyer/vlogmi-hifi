"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sparkles, Video, BarChart3 } from "lucide-react"

const navItems = [
  { name: "My Clips", href: "/", icon: Sparkles, desc: "Your AI-generated clips" },
  { name: "Videos", href: "/videos", icon: Video, desc: "Upload & manage videos" },
  { name: "Insights", href: "/insights", icon: BarChart3, desc: "Performance metrics" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Vlogmi ✨
        </h1>
        <p className="text-xs text-muted-foreground mt-1">AI-powered clip creator</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-start gap-3 px-4 py-3 rounded-xl text-sm transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">{item.name}</div>
                <div
                  className={cn("text-xs mt-0.5", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}
                >
                  {item.desc}
                </div>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
          <p className="text-sm font-medium text-secondary-foreground mb-1">💡 Pro Tip</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Upload multiple videos at once to batch create clips faster!
          </p>
        </div>
      </div>
    </aside>
  )
}

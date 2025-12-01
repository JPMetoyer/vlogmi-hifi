"use client"

import { useState, useEffect } from "react"
import { X, ChevronRight, ChevronLeft, Upload, Sparkles, Check, Scissors, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface OnboardingCarouselProps {
  onClose: () => void
}

const steps = [
  {
    title: "Welcome to Vlogmi! 👋",
    description: "Turn your long videos into viral short clips with AI. Let's walk you through it step by step!",
    type: "intro" as const,
  },
  {
    title: "Step 1: Upload Your Video",
    description: "Just drag and drop your video - we support any format, any length",
    type: "upload" as const,
  },
  {
    title: "Step 2: AI Does the Magic ✨",
    description: "Our AI analyzes your video and finds the most viral-worthy moments automatically",
    type: "analyze" as const,
  },
  {
    title: "Step 3: Review Your Clips",
    description: "Edit, customize, and perfect your clips before publishing",
    type: "review" as const,
  },
  {
    title: "Step 4: Publish Everywhere",
    description: "Share directly to TikTok, Instagram, YouTube Shorts, and more with one click",
    type: "publish" as const,
  },
  {
    title: "You're Ready to Go! 🚀",
    description: "Upload your first video and watch the magic happen",
    type: "outro" as const,
  },
]

function StepVisual({ type }: { type: string }) {
  const [progress, setProgress] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    if (type === "upload" && progress < 100) {
      const timer = setTimeout(() => setProgress((prev) => Math.min(prev + 5, 100)), 50)
      return () => clearTimeout(timer)
    }
    if (type === "analyze") {
      setAnalyzing(true)
    }
  }, [type, progress])

  if (type === "intro") {
    return (
      <div className="aspect-video bg-gradient-to-br from-purple-500/20 via-background to-yellow-500/20 rounded-xl flex items-center justify-center overflow-hidden border">
        <div className="text-center p-8">
          <div className="text-6xl mb-6 animate-bounce">🎬</div>
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
            Your videos deserve to go viral
          </p>
        </div>
      </div>
    )
  }

  if (type === "upload") {
    return (
      <div className="aspect-video bg-background rounded-xl border overflow-hidden">
        <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-purple-500/20 flex items-center justify-center">
                <Upload className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">summer-vacation-2024.mp4</p>
                <p className="text-sm text-muted-foreground">24.8 MB • Uploading...</p>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground">{progress}% complete</p>
          </div>
        </div>
      </div>
    )
  }

  if (type === "analyze") {
    return (
      <div className="aspect-video bg-background rounded-xl border flex flex-col items-center justify-center gap-6 p-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-yellow-500 flex items-center justify-center animate-pulse">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-bold">Finding viral moments...</p>
          <p className="text-muted-foreground">Detecting hooks, emotions, and engaging scenes</p>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm text-sm">
          {[
            { label: "Analyzing speech", icon: "🎤", done: true },
            { label: "Detecting emotions", icon: "😊", done: true },
            { label: "Finding hooks", icon: "🎣", done: analyzing },
            { label: "Scoring clips", icon: "⭐", done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
              <span className="text-xl">{item.icon}</span>
              <span className={item.done ? "text-green-400" : "text-muted-foreground"}>{item.label}</span>
              {item.done && <Check className="w-4 h-4 text-green-400 ml-auto" />}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === "review") {
    return (
      <div className="aspect-video bg-background rounded-xl border p-6">
        <div className="grid grid-cols-3 gap-4 h-full">
          {[
            { title: "Beach Sunset 🌅", score: 92, duration: "0:15" },
            { title: "Epic Wave Ride 🌊", score: 88, duration: "0:22" },
            { title: "Sand Castle Time 🏰", score: 85, duration: "0:18" },
          ].map((clip, i) => (
            <Card key={i} className="p-3 bg-muted/50 hover:bg-muted cursor-pointer transition-all">
              <div className="aspect-[9/16] bg-gradient-to-br from-purple-500/20 to-yellow-500/20 rounded-lg mb-2 flex items-center justify-center">
                <Scissors className="w-8 h-8 text-purple-400" />
              </div>
              <p className="font-semibold text-sm truncate">{clip.title}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span className="text-green-400 font-semibold">{clip.score}% Hook</span>
                <span>{clip.duration}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (type === "publish") {
    return (
      <div className="aspect-video bg-background rounded-xl border flex items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center gap-4">
            {["TikTok", "Instagram", "YouTube"].map((platform, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-yellow-500/20 flex items-center justify-center border-2 border-purple-500/50"
              >
                <Share2 className="w-6 h-6 text-purple-400" />
              </div>
            ))}
          </div>
          <div>
            <p className="font-bold text-lg mb-2">Share to all platforms at once</p>
            <p className="text-sm text-muted-foreground">
              We'll optimize each clip for the platform and post automatically
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (type === "outro") {
    return (
      <div className="aspect-video bg-gradient-to-br from-green-500/20 via-background to-purple-500/20 rounded-xl flex items-center justify-center overflow-hidden border">
        <div className="text-center p-8">
          <div className="text-6xl mb-6">🎉</div>
          <p className="text-2xl font-bold mb-3">Ready to create viral content?</p>
          <p className="text-muted-foreground">Upload your first video to get started</p>
        </div>
      </div>
    )
  }

  return null
}

export function OnboardingCarousel({ onClose }: OnboardingCarouselProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = steps[currentStep]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8 relative">
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>

        <div className="space-y-6">
          <StepVisual type={step.type} />

          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
          </div>

          <div className="flex items-center justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <Button onClick={handleNext} className="gap-2 bg-primary hover:bg-primary/90">
              {currentStep === steps.length - 1 ? "Let's Go!" : "Next"}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

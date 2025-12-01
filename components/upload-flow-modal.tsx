"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  CheckCircle,
  Sparkles,
  Film,
  TrendingUp,
  Clock,
  MessageSquare,
  Eye,
  X,
  Zap,
  Brain,
  Scissors,
} from "lucide-react"

type UploadStep = "upload" | "uploading" | "analyzing" | "processing" | "results"

interface GeneratedClip {
  id: number
  title: string
  duration: string
  platform: string
  hookScore: number
  thumbnail: string
  insights: string[]
}

export function UploadFlowModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<UploadStep>("upload")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [generatedClips, setGeneratedClips] = useState<GeneratedClip[]>([])

  const handleFileSelect = () => {
    setSelectedFile("beach-vlog-summer-2024.mp4")
    setStep("uploading")
  }

  useEffect(() => {
    if (step === "uploading") {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setStep("analyzing"), 500)
            return 100
          }
          return prev + 10
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [step])

  useEffect(() => {
    if (step === "analyzing") {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setStep("processing"), 500)
            return 100
          }
          return prev + 8
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [step])

  useEffect(() => {
    if (step === "processing") {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setGeneratedClips([
                {
                  id: 1,
                  title: "Epic Sunset Beach Moment",
                  duration: "0:15",
                  platform: "TikTok",
                  hookScore: 95,
                  thumbnail: "/beautiful-sunset-beach.png",
                  insights: ["Strong visual hook", "Trending audio match", "Peak engagement timing"],
                },
                {
                  id: 2,
                  title: "Surfing Tutorial Snippet",
                  duration: "0:30",
                  platform: "Instagram Reels",
                  hookScore: 88,
                  thumbnail: "/surfing-ocean-waves.jpg",
                  insights: ["Educational content", "Clear action", "Good pacing"],
                },
                {
                  id: 3,
                  title: "Beach Day Highlights",
                  duration: "0:45",
                  platform: "YouTube Shorts",
                  hookScore: 82,
                  thumbnail: "/beach-day-activities.jpg",
                  insights: ["Multiple scenes", "Story arc", "Music sync"],
                },
              ])
              setStep("results")
            }, 500)
            return 100
          }
          return prev + 7
        })
      }, 250)
      return () => clearInterval(interval)
    }
  }, [step])

  const handleReset = () => {
    setStep("upload")
    setUploadProgress(0)
    setAnalysisProgress(0)
    setProcessingProgress(0)
    setSelectedFile(null)
    setGeneratedClips([])
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 z-10" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>

          {/* Upload Step */}
          {step === "upload" && (
            <div className="space-y-6 py-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Upload Your Video</h2>
                <p className="text-muted-foreground text-lg">Let AI find the best moments for you</p>
              </div>

              <Card className="p-16 border-2 border-dashed hover:border-primary/70 transition-all cursor-pointer group">
                <div className="text-center space-y-6" onClick={handleFileSelect}>
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Drop your video here</h3>
                    <p className="text-muted-foreground">or click to browse</p>
                    <p className="text-sm text-muted-foreground mt-4">Supports MP4, MOV, AVI up to 2GB</p>
                  </div>
                  <Button size="lg" className="gap-2">
                    <Upload className="w-5 h-5" />
                    Choose File
                  </Button>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <Card className="p-6 text-center space-y-2 bg-primary/5">
                  <Brain className="w-8 h-8 mx-auto text-primary" />
                  <h4 className="font-semibold">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">Smart content understanding</p>
                </Card>
                <Card className="p-6 text-center space-y-2 bg-accent/5">
                  <Scissors className="w-8 h-8 mx-auto text-accent" />
                  <h4 className="font-semibold">Auto Clipping</h4>
                  <p className="text-sm text-muted-foreground">Perfect moments extracted</p>
                </Card>
                <Card className="p-6 text-center space-y-2 bg-secondary/5">
                  <Zap className="w-8 h-8 mx-auto text-secondary" />
                  <h4 className="font-semibold">Ready to Post</h4>
                  <p className="text-sm text-muted-foreground">Optimized for each platform</p>
                </Card>
              </div>
            </div>
          )}

          {/* Uploading Step */}
          {step === "uploading" && (
            <div className="space-y-8 py-12">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Uploading Your Video</h2>
                <p className="text-muted-foreground text-lg">{selectedFile}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Upload progress</span>
                  <span className="font-semibold">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-3" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Estimated time: {Math.max(0, 10 - Math.floor(uploadProgress / 10))} seconds</span>
                </div>
              </div>
            </div>
          )}

          {/* Analyzing Step */}
          {step === "analyzing" && (
            <div className="space-y-8 py-12">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold">Analyzing Your Content</h2>
                <p className="text-muted-foreground text-lg">Our AI is watching your video frame by frame</p>
              </div>

              <div className="space-y-3">
                <Progress value={analysisProgress} className="h-3" />
                <p className="text-center font-semibold">{analysisProgress}%</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className={`p-4 space-y-2 transition-all ${analysisProgress > 20 ? "bg-primary/5" : ""}`}>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Visual Analysis</span>
                    {analysisProgress > 20 && <CheckCircle className="w-4 h-4 text-primary ml-auto" />}
                  </div>
                  {analysisProgress > 20 && (
                    <p className="text-sm text-muted-foreground">Detected: Beach scenes, sunset, people</p>
                  )}
                </Card>

                <Card className={`p-4 space-y-2 transition-all ${analysisProgress > 40 ? "bg-primary/5" : ""}`}>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Audio Analysis</span>
                    {analysisProgress > 40 && <CheckCircle className="w-4 h-4 text-primary ml-auto" />}
                  </div>
                  {analysisProgress > 40 && (
                    <p className="text-sm text-muted-foreground">Found: Music peaks, dialogue, ambient sounds</p>
                  )}
                </Card>

                <Card className={`p-4 space-y-2 transition-all ${analysisProgress > 60 ? "bg-primary/5" : ""}`}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Engagement Prediction</span>
                    {analysisProgress > 60 && <CheckCircle className="w-4 h-4 text-primary ml-auto" />}
                  </div>
                  {analysisProgress > 60 && (
                    <p className="text-sm text-muted-foreground">Identified 3 high-potential moments</p>
                  )}
                </Card>

                <Card className={`p-4 space-y-2 transition-all ${analysisProgress > 80 ? "bg-primary/5" : ""}`}>
                  <div className="flex items-center gap-2">
                    <Film className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Platform Optimization</span>
                    {analysisProgress > 80 && <CheckCircle className="w-4 h-4 text-primary ml-auto" />}
                  </div>
                  {analysisProgress > 80 && (
                    <p className="text-sm text-muted-foreground">Optimizing for TikTok, Instagram, YouTube</p>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* Processing Step */}
          {step === "processing" && (
            <div className="space-y-8 py-12">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                  <Scissors className="w-8 h-8 text-accent animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold">Creating Your Clips</h2>
                <p className="text-muted-foreground text-lg">AI is cutting the perfect moments</p>
              </div>

              <div className="space-y-3">
                <Progress value={processingProgress} className="h-3" />
                <p className="text-center font-semibold">{processingProgress}%</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm">Extracting epic sunset moment...</span>
                </div>
                {processingProgress > 35 && (
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-sm">Cutting surfing tutorial clip...</span>
                  </div>
                )}
                {processingProgress > 70 && (
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-sm">Finalizing beach day highlights...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results Step */}
          {step === "results" && (
            <div className="space-y-6 py-8">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-accent/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold">Your Clips Are Ready!</h2>
                <p className="text-muted-foreground text-lg">
                  We found {generatedClips.length} amazing moments from your video
                </p>
              </div>

              <div className="space-y-4">
                {generatedClips.map((clip) => (
                  <Card key={clip.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex gap-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={clip.thumbnail || "/placeholder.svg"}
                          alt={clip.title}
                          className="w-48 h-32 object-cover rounded-lg"
                        />
                        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">{clip.duration}</Badge>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{clip.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{clip.platform}</Badge>
                            <div className="flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-semibold">Hook Score: {clip.hookScore}/100</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-muted-foreground">AI Insights:</p>
                          <div className="flex flex-wrap gap-2">
                            {clip.insights.map((insight, idx) => (
                              <Badge key={idx} className="bg-primary/10 text-primary hover:bg-primary/20">
                                {insight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button size="lg" className="flex-1 gap-2">
                  <Film className="w-5 h-5" />
                  View All Clips
                </Button>
                <Button size="lg" variant="outline" onClick={handleReset}>
                  Upload Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

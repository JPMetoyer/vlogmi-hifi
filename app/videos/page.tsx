"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, MoreVertical, Clock, CheckCircle, Loader2 } from "lucide-react"
import { UploadFlowModal } from "@/components/upload-flow-modal"

export default function VideosPage() {
  const [showUploadModal, setShowUploadModal] = useState(false)

  const videos = [
    {
      id: 1,
      title: "Summer Beach Vlog 2024",
      uploadDate: "2 hours ago",
      duration: "12:34",
      status: "completed",
      clipsGenerated: 5,
      thumbnail: "/beach-vlog-thumbnail.jpg",
    },
    {
      id: 2,
      title: "Morning Routine & Coffee",
      uploadDate: "5 hours ago",
      duration: "8:45",
      status: "processing",
      clipsGenerated: 0,
      progress: 67,
      thumbnail: "/morning-coffee-video.jpg",
    },
    {
      id: 3,
      title: "Cooking Adventure Series Ep 1",
      uploadDate: "1 day ago",
      duration: "15:22",
      status: "queued",
      clipsGenerated: 0,
      thumbnail: "/cooking-video-thumbnail.png",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Videos 📹</h1>
            <p className="text-muted-foreground text-lg">Upload and manage your content in one place</p>
          </div>
          <Button size="lg" className="gap-2 bg-primary" onClick={() => setShowUploadModal(true)}>
            <Upload className="w-5 h-5" />
            Upload New Video
          </Button>
        </div>

        <Card
          className="p-12 border-2 border-dashed hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => setShowUploadModal(true)}
        >
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Drop your videos here</h3>
              <p className="text-muted-foreground">Support for MP4, MOV, AVI up to 2GB</p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={(e) => {
                e.stopPropagation()
                setShowUploadModal(true)
              }}
            >
              Choose Files
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">All Videos</h2>

          {videos.map((video) => (
            <Card key={video.id} className="p-6">
              <div className="flex gap-6">
                <div className="relative flex-shrink-0">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-48 h-28 object-cover rounded-lg"
                  />
                  <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">{video.duration}</Badge>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">Uploaded {video.uploadDate}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    {video.status === "completed" && (
                      <>
                        <Badge className="gap-1 bg-accent text-accent-foreground">
                          <CheckCircle className="w-3 h-3" />
                          Complete
                        </Badge>
                        <span className="text-sm text-muted-foreground">{video.clipsGenerated} clips generated</span>
                      </>
                    )}

                    {video.status === "processing" && (
                      <>
                        <Badge className="gap-1 bg-secondary text-secondary-foreground">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Processing
                        </Badge>
                        <div className="flex-1 max-w-xs">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${video.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{video.progress}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">AI is finding the best moments...</p>
                        </div>
                      </>
                    )}

                    {video.status === "queued" && (
                      <>
                        <Badge variant="outline" className="gap-1">
                          <Clock className="w-3 h-3" />
                          In Queue
                        </Badge>
                        <span className="text-sm text-muted-foreground">Processing will start soon</span>
                      </>
                    )}
                  </div>

                  {video.status === "completed" && (
                    <Button variant="outline" size="sm">
                      View Clips
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <UploadFlowModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </DashboardLayout>
  )
}

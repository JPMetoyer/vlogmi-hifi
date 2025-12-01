"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import { UploadFlowModal } from "./upload-flow-modal"

export function TopBar() {
  const [showUploadModal, setShowUploadModal] = useState(false)

  const handleUploadClick = () => {
    console.log("[v0] Upload button clicked, opening modal")
    setShowUploadModal(true)
  }

  return (
    <>
      <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Select defaultValue="personal">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">My Workspace</SelectItem>
              <SelectItem value="team">Team Workspace</SelectItem>
              <SelectItem value="demo">Demo Projects</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search videos, clips..." className="pl-9" />
          </div>
        </div>
        <Button className="gap-2" onClick={handleUploadClick}>
          <Plus className="w-4 h-4" />
          Upload New Video
        </Button>
      </div>

      {showUploadModal && (
        <>
          {console.log("[v0] Rendering upload modal")}
          <UploadFlowModal
            onClose={() => {
              console.log("[v0] Closing upload modal")
              setShowUploadModal(false)
            }}
          />
        </>
      )}
    </>
  )
}

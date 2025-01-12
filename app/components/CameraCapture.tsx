'use client'

import { useRef, useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Camera } from 'lucide-react'

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreamActive, setIsStreamActive] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreamActive(true)
      }
    } catch (err) {
      console.error("Error accessing the camera", err)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageData = canvasRef.current.toDataURL('image/jpeg')
        onCapture(imageData)
        stopCamera()
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      setIsStreamActive(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {!isStreamActive ? (
        <Button onClick={startCamera} className="mb-4">
          <Camera className="mr-2 h-4 w-4" /> Start Camera
        </Button>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline className="mb-4 rounded-lg" />
          <Button onClick={capturePhoto}>Capture Photo</Button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </div>
  )
}


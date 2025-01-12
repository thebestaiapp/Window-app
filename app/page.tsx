'use client'

import { useState } from 'react'
import CameraCapture from './components/CameraCapture'
import ResultDisplay from './components/ResultDisplay'
import { analyzeWindow } from './actions/analyzeWindow'

export default function Home() {
  const [imageData, setImageData] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePhotoCapture = (data: string) => {
    setImageData(data)
    setIsLoading(true)
    analyzeWindow(data)
      .then((result: Error) => {
        setAnalysisResult(result)
        setIsLoading(false)
      })
      .catch((error: Error) => {
        console.error('Error analyzing window:', error)
        setIsLoading(false)
      })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Window Analyzer</h1>
      {!imageData ? (
        <CameraCapture onCapture={handlePhotoCapture} />
      ) : (
        <ResultDisplay 
          imageData={imageData} 
          result={analysisResult} 
          isLoading={isLoading} 
        />
      )}
    </main>
  )
}


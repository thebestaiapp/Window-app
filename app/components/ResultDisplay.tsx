import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'

interface ResultDisplayProps {
  imageData: string
  result: any
  isLoading: boolean
}

export default function ResultDisplay({ imageData, result, isLoading }: ResultDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <Image src={imageData} alt="Captured window" width={300} height={300} />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Window Analysis Result</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Analyzing window...</p>
          ) : result ? (
            <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          ) : (
            <p>No analysis result available</p>
          )}
        </CardContent>
      </Card>
      <Button onClick={() => window.location.reload()} className="mt-4">
        Analyze Another Window
      </Button>
    </div>
  )
}


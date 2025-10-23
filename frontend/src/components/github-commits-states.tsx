import { GitCommit } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function CommitsLoading() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold">Recent Contributions</h3>
      </div>
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-1 min-w-[300px] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-3" />
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CommitsError({ error }: { error: string }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold">Recent Contributions</h3>
      </div>
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <GitCommit className="h-4 w-4" />
            <span>Failed to load commits: {error}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function CommitsEmpty() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Recent Contributions</h3>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <GitCommit className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recent commits found</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

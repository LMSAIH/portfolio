
import { useEffect, useState } from "react"
import { ExternalLink, GitCommit, Calendar, User } from "lucide-react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export type GitHubCommit = {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      email: string
      date: string
    }
  }
  html_url: string
  repository: {
    name: string
    full_name: string
  }
}

export type GitHubEvent = {
  id: string
  type: string
  actor: {
    login: string
    avatar_url: string
  }
  repo: {
    name: string
    url: string
  }
  payload: {
    commits?: Array<{
      sha: string
      message: string
      url: string
    }>
    ref?: string
    size?: number
  }
  created_at: string
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`

  return date.toLocaleDateString()
}

const truncateMessage = (message: string, maxLength: number = 100) => {
  if (message.length <= maxLength) return message
  return message.substring(0, maxLength).trim() + "..."
}

export function GitHubCommits() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubEvents = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch recent public events for the user
        const response = await fetch(`https://api.github.com/users/LMSAIH/events/public?per_page=50`)


        if (!response.ok) {
          throw new Error(`GitHub API responded with status: ${response.status}`)
        }

        const data: GitHubEvent[] = await response.json()

        console.log(data)

        // Filter for push events (commits) and limit to recent ones
        const pushEvents = data
          .filter(event => event.type === 'PushEvent' && event.payload.commits && event.payload.commits.length > 0)
          .slice(0, 10) // Show last 10 commit activities

        setEvents(pushEvents)
      } catch (err) {
        console.error('Error fetching GitHub events:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch commits')
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubEvents()
  }, [])

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 mb-6">
          <GitCommit className="h-5 w-5" />
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

  if (error) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 mb-6">
          <GitCommit className="h-5 w-5" />
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

  if (events.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Recent Contributions</h3>
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

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold">Recent Contributions</h3>
      </div>

      <div className="flex flex-wrap gap-4">
        {events.map((event) => (
          <a
            key={event.id}
            href={`https://github.com/${event.repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block flex-1 min-w-[300px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md dark:hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full  flex items-center justify-center flex-shrink-0">
                    <GitCommit className="h-4 w-4 text-black dark:text-white" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <User className="h-3 w-3" />
                    {event.actor.login}
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    {formatDate(event.created_at)}
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {event.repo.name}
                </h4>
                
                <div className="space-y-1">
                  {event.payload.commits?.slice(0, 2).map((commit) => (
                    <p key={commit.sha} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      • {truncateMessage(commit.message)}
                    </p>
                  ))}
                  {(event.payload.commits?.length || 0) > 2 && (
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      +{(event.payload.commits?.length || 0) - 2} more commit{(event.payload.commits?.length || 0) - 2 !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                
                <div className="mt-2">
                  <span className="inline-flex items-center px-0 py-1 rounded-full text-xs ">
                    {event.payload.commits?.length || 0} commit{(event.payload.commits?.length || 0) !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0 ml-3" />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://github.com/LMSAIH?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md dark:hover:shadow-lg"
        >
          View All Repositories
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default GitHubCommits;

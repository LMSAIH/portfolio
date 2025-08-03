
import { useEffect, useState } from "react"
import { ExternalLink, GitCommit, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

const CommitSkeleton = () => (
  <Card className="mb-4">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-8 w-16" />
      </div>
    </CardHeader>
  </Card>
)

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
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Recent Commits</h2>
          <p className="text-muted-foreground">Latest activity from GitHub</p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CommitSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Recent Commits</h2>
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
          <h2 className="text-2xl font-bold mb-2">Recent Commits</h2>
          <p className="text-muted-foreground">Latest activity from GitHub</p>
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Recent Commits</h2>
          <p className="text-muted-foreground">Latest activity from GitHub</p>
        </div>
        <Button variant="outline" asChild>
          <a
            href="https://github.com/LMSAIH"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            View Profile
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
      
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg leading-tight">
                    <a
                      href={`https://github.com/${event.repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <GitCommit className="h-4 w-4" />
                      {event.repo.name}
                    </a>
                  </CardTitle>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {event.actor.login}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(event.created_at)}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {event.payload.commits?.length || 0} commit{(event.payload.commits?.length || 0) !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            {event.payload.commits && event.payload.commits.length > 0 && (
              <CardContent>
                <div className="space-y-2">
                  {event.payload.commits.slice(0, 3).map((commit, index) => (
                    <div key={commit.sha} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-relaxed">
                          {truncateMessage(commit.message)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                            {commit.sha.substring(0, 7)}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {event.payload.commits.length > 3 && (
                    <div className="text-center pt-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={`https://github.com/${event.repo.name}/commits/${event.payload.ref?.replace('refs/heads/', '') || 'main'}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View {event.payload.commits.length - 3} more commits
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <a
            href="https://github.com/LMSAIH?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            View All Repositories
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}

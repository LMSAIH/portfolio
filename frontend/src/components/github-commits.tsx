import { useEffect, useState } from "react"
import { ExternalLink, GitCommit, Calendar, User } from "lucide-react"
import { CommitsLoading, CommitsError, CommitsEmpty } from "./github-commits-states"

type GitHubCommit = {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  html_url: string
  repository: {
    name: string
    full_name: string
  }
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

function useGitHubCommits(username: string = "LMSAIH") {
  const [commits, setCommits] = useState<GitHubCommit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubCommits = async () => {
      try {
        setLoading(true)
        setError(null)

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
        )

        if (!reposResponse.ok) {
          throw new Error(`GitHub API responded with status: ${reposResponse.status}`)
        }

        const repos = await reposResponse.json()
        const allCommits: GitHubCommit[] = []
        
        for (const repo of repos.slice(0, 5)) {
          try {
            const commitsResponse = await fetch(
              `https://api.github.com/repos/${repo.full_name}/commits?per_page=3&author=${username}`
            )
            
            if (commitsResponse.ok) {
              const repoCommits = await commitsResponse.json()
              
              const commitsWithRepo = repoCommits.map((commit: any) => ({
                ...commit,
                repository: {
                  name: repo.name,
                  full_name: repo.full_name
                }
              }))
              
              allCommits.push(...commitsWithRepo)
            }
          } catch (err) {
            console.warn(`Failed to fetch commits for ${repo.name}:`, err)
          }
        }

        allCommits.sort((a, b) => 
          new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
        )

        setCommits(allCommits.slice(0, 10))
      } catch (err) {
        console.error('Error fetching GitHub commits:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch commits')
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubCommits()
  }, [username])

  return { commits, loading, error }
}

export function GitHubCommits() {
  const { commits, loading, error } = useGitHubCommits("LMSAIH")

  if (loading) return <CommitsLoading />
  if (error) return <CommitsError error={error} />
  if (commits.length === 0) return <CommitsEmpty />

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold">Recent Contributions</h3>
      </div>

      <div className="flex flex-wrap gap-4">
        {commits.map((commit) => (
          <a
            key={commit.sha}
            href={commit.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block flex-1 min-w-[300px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md dark:hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <GitCommit className="h-4 w-4 text-black dark:text-white" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <User className="h-3 w-3" />
                    {commit.commit.author.name}
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    {formatDate(commit.commit.author.date)}
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {commit.repository.name}
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {truncateMessage(commit.commit.message)}
                </p>
                
                <div className="mt-2">
                  <span className="inline-flex items-center px-0 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400">
                    {commit.sha.substring(0, 7)}
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

export default GitHubCommits

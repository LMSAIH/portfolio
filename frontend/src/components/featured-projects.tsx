import { DataTable } from "./deployments-table";
import type { ColumnDef } from "@tanstack/react-table"
import { ExternalLink, Clock, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type FeaturedProject = {
    id: string
    name: string
    description: string
    url: string
    status: "ongoing" | "finished"
}

const StatusBadge = ({ status }: { status: FeaturedProject["status"] }) => {
    const statusConfig = {
        ongoing: {
            label: "Ongoing",
            className: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800",
            icon: Clock
        },
        finished: {
            label: "Finished",
            className: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800",
            icon: CheckCircle
        },
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
        <Badge variant="outline" className={config.className}>
            <Icon className="mr-1 h-3 w-3" />
            {config.label}
        </Badge>
    )
}

export const columns: ColumnDef<FeaturedProject>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="font-medium max-w-[150px] break-words whitespace-pre-wrap">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="max-w-[500px] min-w-[400px] text-muted-foreground whitespace-pre-wrap break-words">
                {row.getValue("description")}
            </div>
        ),
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: ({ row }) => {
            const url = row.getValue("url") as string
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    Visit
                    <ExternalLink className="h-4 w-4" />
                </a>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
]

const projectsData: FeaturedProject[] = [
    {
        id: "proj_001",
        name: "Image2Location",
        description: "Image2Location is a web application that takes an image as an input, and returns the location of the image using AI. You can store locations and images in the app, along with additional information on the place which may be useful for a trip. \n\n It features server sent events for real-time communication, and was built with Typescript, Tailwind CSS and Vite for the frontend. The backend uses PicartaAPI, OpenAI API, Python, FastAPI and Supabase for file storage.", 
        url:"https://github.com/LMSAIH/Image2Location",
        status: "finished"
    },
    {
        id: "proj_002",
        name: "Travexia MVP",
        description: "Travexia is an AI-powered platform for discovering last-minute events nearby. It uses geolocation and intelligent filtering to find the best experiences in seconds. With a custom chatbot, Travexia dynamically applies filters based on location, preferences, and event types. \n\nThe platform offers two dashboards: one for clients to explore events and another for providers to post and manage their listings, streamlining event discovery and management with real-time data.\n\n Built with firebase cloud functions, OpenAI API, Ticketmaster Discovery API and Typescript on the backend. React, Tailwind CSS and Vite were used for the frontend.",
        url: "https://github.com/LMSAIH/travexia",
        status: "finished"
    },
    {
        id: "proj_003",
        name: "Solitude",
        description: "Solitude is an AI companion. It is designed to capture your facial expressions and interpret them with emotion recognition, providing personalized responses. It is also given a custom human like voice that contains specific traits and can reply and have a conversation in real-time with you.\n\nBuilt with React, Tailwind CSS and Vite for the frontend. The backend uses OpenAI API, Python and FastAPI. The face emotion processing is done in the client using FaceAPI, the backend uses OpenAI API to generate the responses and the voice generated is created leveraging Speechify API.",
        url: "https://github.com/LMSAIH/Solitude",
        status: "ongoing"
    },
    {
        id: "proj_004",
        name: "LCSC Scheduler",
        description: "LCSC Scheduler is an internal application designed for the Langara Computer Science Club, streamlining event and activity management. It offers an intuitive calendar view, role-based access, and customizable settings. The admin dashboard allows event organizers to view members' weekly availabilities by hourly slots, filter by roles and names, and efficiently coordinate events with clear visual scheduling. \n\nBuilt with React, Tailwind CSS and Vite for the frontend. A Python, FastAPI and Supabase backend, along with redis caching. Docker is also used for containerization and deployment.",
        url: "https://github.com/langaracpsc/LCSCScheduler",
        status: "finished"
    },

];

export function FeaturedProjects() {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={projectsData} title="Featured Projects" />
    </div>
  )
}

export default FeaturedProjects;
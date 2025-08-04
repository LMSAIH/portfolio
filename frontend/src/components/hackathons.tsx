import { ExternalLink } from "lucide-react"

type Hackathon = {
    id: string
    name: string
    award: string
    devpostUrl: string

}

const hackathons: Hackathon[] = [
    {
        id: "1",
        name: "TechCrunch Disrupt Hackathon 2024",
        award: "1st Place - Best AI Application",
        devpostUrl: "https://devpost.com/software/your-project-1",

    },
    {
        id: "2",
        name: "NASA Space Apps Challenge",
        award: "Winner - Earth Category",
        devpostUrl: "https://devpost.com/software/your-project-2",

    },
    {
        id: "3",
        name: "MLH Local Hack Day",
        award: "2nd Place - Most Creative Solution",
        devpostUrl: "https://devpost.com/software/your-project-3",
    },
    {
        id: "4",
        name: "HackTheNorth 2022",
        award: "Finalist - Best Social Impact",
        devpostUrl: "https://devpost.com/software/your-project-4",
   
    }
]

export const Hackathons = () => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-lg font-semibold">Hackathons & Awards</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {hackathons.map((hackathon) => (
                    <a
                        key={hackathon.id}
                        href={hackathon.devpostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md dark:hover:shadow-lg"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                
                                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {hackathon.name}
                                </h4>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                     {hackathon.award}
                                </p>
                            </div>
                            
                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0 ml-3" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

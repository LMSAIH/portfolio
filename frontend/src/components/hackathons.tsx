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
        name: "StormHacks 2025",
        award: "Winner - Finalist, Best Design, United Nations Sustainable Development Goals Enactus Challenge",
        devpostUrl: "https://devpost.com/software/mapd-urban-development-intelligence",
    },
    {
        id: "2",
        name: "Project0",
        award: "Winner - 1st Place",
        devpostUrl: "https://devpost.com/software/devmatrix",
    },
    {
        id: "3",
        name: "LangaraHacks 2024",
        award: "Winner - Raffle Prizes",
        devpostUrl: "https://devpost.com/software/hacksbricsteam",
    },

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

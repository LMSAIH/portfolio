import { useState } from "react"
import { ChevronDown } from "lucide-react"

type WorkExperience = {
    id: string
    company: string
    position: string
    logo?: string
    startDate: string
    endDate: string
    description: string
}

const workExperiences: WorkExperience[] = [
    {
        id: "1",
        company: "Langara College Applied Research Centre",
        position: "Web Developer & Research Assistant",
        logo: "/company-logos/langara_arc_logo.jpeg", 
        startDate: "May 2025",
        endDate: "Present",
        description: "Led website migration to React, Tailwind CSS, and Vite, which was then deployed to Vercel, cutting website maintenance costs by 100% while ensuring a seamless domain migration from the previously existing no-code tools.\n\nDocumented and showcased the now public repository which serves as another way to engage with the research project IDEA's in public recreation and the work done at the Langara College Applied Research Centre.\n\n Increased website performance metrics by 60%, and accessibility scores by 10%.",
    },
    {
        id: "2",
        company: "Langara College",
        position: "Engagement Kiosk Assistant",
        logo: "/company-logos/langara-college.png",
        startDate: "May 2025",
        endDate: "Present",
        description: "Added functionalities and organized the existing data collection scripts and reporting processes using Excel.\n\nEngaged with students and staff to provide information about college services and events.\n\nAssisted in managing the engagement kiosk, ensuring it was well-stocked and organized.",
    },
    {
        id: "3",
        company: "ResultsCX",
        position: "Call Center Associate",
        logo: "/company-logos/results-cx.jpeg",
        startDate: "Jun 2023",
        endDate: "Dec 2023",
        description: "Provided exceptional customer support in a fast-paced, remote call center environment.\n\nDelivered clear and effective solutions by managing complex drivers and communicating efficiently with customers. \n\nConsistently maintained high-quality standards by adhering to strict protocols and resolving issues with a 100% first-call resolution rate. "
    },
]

const WorkExperienceItem = ({ experience }: { experience: WorkExperience }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="relative">
            <div
                className="flex items-start gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-3 -m-3 transition-colors duration-200"
                onClick={toggleExpanded}
            >
                {/* Company Logo/Initials */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        <img src={experience.logo} alt={experience.company} className="w-full h-full rounded-full" width={48} height={48} />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {experience.position}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {experience.company}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {experience.startDate} - {experience.endDate}
                            </p>
                        </div>

                        {/* Expand/Collapse Icon */}
                        <div className="flex-shrink-0 ml-4">
                            <div className={`transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Collapsible Description with smooth animation */}
                    <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {experience.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const WorkHistory = () => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-lg font-semibold">Work Experience</h3>
            </div>

            <div className="space-y-4">
                {workExperiences.map((experience) => (
                    <WorkExperienceItem key={experience.id} experience={experience} />
                ))}
            </div>
        </div>
    )
}

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
        company: "Tech Corp",
        position: "Senior Full Stack Developer",
        logo: "TC", // Fallback to initials if no logo
        startDate: "Jan 2022",
        endDate: "Present",
        description: "Led development of multiple web applications using React, Node.js, and TypeScript. Collaborated with cross-functional teams to deliver high-quality software solutions. Mentored junior developers and improved team productivity by 40%."
    },
    {
        id: "2",
        company: "StartupXYZ",
        position: "Frontend Developer",
        logo: "SX",
        startDate: "Jun 2020",
        endDate: "Dec 2021",
        description: "Built responsive web applications using React and modern JavaScript. Worked closely with designers to implement pixel-perfect UI components. Optimized application performance and improved user experience metrics."
    },
    {
        id: "3",
        company: "Digital Agency",
        position: "Web Developer",
        logo: "DA",
        startDate: "Mar 2018",
        endDate: "May 2020",
        description: "Developed custom WordPress themes and plugins. Created responsive websites for various clients across different industries. Implemented SEO best practices and improved website loading speeds."
    }
]

const WorkExperienceItem = ({ experience }: { experience: WorkExperience }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    const getInitials = (company: string) => {
        return company
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="relative">
            <div
                className="flex items-start gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-3 -m-3 transition-colors duration-200"
                onClick={toggleExpanded}
            >
                {/* Company Logo/Initials */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {experience.logo || getInitials(experience.company)}
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
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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

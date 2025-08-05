import { useState } from "react"
import { ChevronDown } from "lucide-react"

type VolunteerExperience = {
    id: string
    organization: string
    role: string
    logo?: string
    startDate: string
    endDate: string
    description: string
}

const volunteerExperiences: VolunteerExperience[] = [
    {
        id: "1",
        organization: "UNAC-Vancouver",
        role: "Advisory Council Member",
        logo: "/company-logos/unac-v.jpg",
        startDate: "May 2025",
        endDate: "Present",
        description: "Working closely with the UNAC-Vancouver team for the development of the UNAC-Vancouver website, which is a platform that connects local communities with resources and support for sustainable development. My role involves providing technical guidance, ensuring the website meets accessibility standards, and enhancing user experience through continuous improvements.",
    },
    {
        id: "2",
        organization: "Langara French Club",
        role: "Head of IT",
        logo: "/company-logos/french-club.png",
        startDate: "Sep 2024",
        endDate: "Present",
        description: "Responsible for the development and maintenance of the Langara French Club's website and internal tools. Collaborating with club members to enhance existing tools and creating new ones to improve the club's operations."
    },
    {
        id: "3",
        organization: "Langara Computer Science Club",
        role: "Software Developer",
        logo: "/company-logos/langaracpsc.png",
        startDate: "Jan 2025",
        endDate: "July 2025",
        description: "Lead Developer for internal scheduling software initiative, guiding a team from concept to deployment.\n\nDeveloped and delivered didactic materials to mentor 50+ attendees at weekly events, effectively teaching fundamentals and best practices, simplifying complex problems and providing clear solutions"
    },

]

const VolunteerExperienceItem = ({ experience }: { experience: VolunteerExperience }) => {
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
                {/* Organization Logo/Initials */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        <img src={experience.logo} alt={experience.organization} className="w-full h-full rounded-full" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {experience.role}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {experience.organization}
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

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
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

export const VolunteerHistory = () => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-lg font-semibold">Volunteering Experience</h3>
            </div>

            <div className="space-y-4">
                {volunteerExperiences.map((experience) => (
                    <VolunteerExperienceItem key={experience.id} experience={experience} />
                ))}
            </div>
        </div>
    )
}

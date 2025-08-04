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
        organization: "Local Food Bank",
        role: "Tech Volunteer",
        logo: "LF",
        startDate: "Jan 2023",
        endDate: "Present",
        description: "Developed and maintain a web application for inventory management and volunteer coordination. Built a responsive dashboard that helped increase operational efficiency by 30%. Provide ongoing technical support and training to staff members."
    },
    {
        id: "2",
        organization: "Code for Good",
        role: "Lead Developer",
        logo: "CG",
        startDate: "Mar 2022",
        endDate: "Dec 2022",
        description: "Led a team of volunteer developers to create open-source solutions for non-profit organizations. Mentored junior developers and coordinated project timelines. Successfully delivered 3 major projects benefiting local communities."
    },
    {
        id: "3",
        organization: "Youth Coding Initiative",
        role: "Mentor",
        logo: "YC",
        startDate: "Sep 2021",
        endDate: "Feb 2022",
        description: "Taught programming fundamentals to underserved youth aged 12-18. Developed curriculum materials and hands-on coding workshops. Helped 25+ students build their first web applications and sparked interest in technology careers."
    }
]

const VolunteerExperienceItem = ({ experience }: { experience: VolunteerExperience }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    const getInitials = (organization: string) => {
        return organization
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
                {/* Organization Logo/Initials */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {experience.logo || getInitials(experience.organization)}
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
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
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

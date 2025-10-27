import { useState } from "react"
import { ChevronDown } from "lucide-react"

type Education = {
    id: string
    institution: string
    degree: string
    field?: string
    logo?: string
    startDate: string
    endDate: string
    gpa?: string
    description?: string
    coursework?: string[]
    achievements?: string[]
}

const educationHistory: Education[] = [
    {
        id: "1",
        institution: "Langara College",
        degree: "Associate of Science",
        field: "Computer Science",
        logo: "/company-logos/langara-logo.png",
        startDate: "Jan 2024",
        endDate: "Dec 2025",
        achievements: [
            "Dean's List - Fall 2024, Spring 2025",
            "International Entrance Scolarship"
        ]
    },
]

const EducationItem = ({ education }: { education: Education }) => {
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
                {/* Institution Logo */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {education.logo ? (
                            <img 
                                src={education.logo} 
                                alt={education.institution} 
                                className="w-full h-full rounded-full object-cover" 
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                                {education.institution.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {education.degree}
                                {education.field && ` in ${education.field}`}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {education.institution}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    {education.startDate} - {education.endDate}
                                </p>
                                {education.gpa && (
                                    <>
                                        <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            GPA: {education.gpa}
                                        </p>
                                    </>
                                )}
                            </div>
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
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                {education.description}
                            </p>

                            {education.achievements && education.achievements.length > 0 && (
                                <div>
                                    <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                                        Achievements & Recognition
                                    </h5>
                                    <ul className="space-y-1">
                                        {education.achievements.map((achievement, index) => (
                                            <li 
                                                key={index}
                                                className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                                            >
                                                <span className="text-gray-400 mr-2">•</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Education = () => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-lg font-semibold">Education</h3>
            </div>

            <div className="space-y-4">
                {educationHistory.map((education) => (
                    <EducationItem key={education.id} education={education} />
                ))}
            </div>
        </div>
    )
}
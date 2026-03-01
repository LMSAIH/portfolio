import { useState, useRef } from "react"
import { experienceTypography } from "./Typographies"

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
    const contentRef = useRef<HTMLDivElement>(null)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="relative">
            <div
                className="flex items-start gap-3 cursor-pointer hover:bg-secondary/50 rounded-xl p-3 -m-3 transition-colors duration-200"
                onClick={toggleExpanded}
            >
                {/* Institution Logo */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-secondary">
                        {education.logo ? (
                            <img
                                src={education.logo}
                                alt={education.institution}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                                {education.institution.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0"
                >
                    <div className="flex justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <h4 className={experienceTypography.title}>
                                {education.degree}
                                {education.field && ` in ${education.field}`}
                            </h4>
                            <p className={experienceTypography.subtitle}>
                                {education.institution}
                                {education.gpa && ` · GPA: ${education.gpa}`}
                            </p>
                        </div>

                        {/* Date on right */}
                        <span className={experienceTypography.date}>
                            {education.startDate} – {education.endDate}
                        </span>

                    </div>

                    <div
                        style={{ height: isExpanded ? contentRef.current?.scrollHeight ?? 0 : 0, overflow: 'hidden', transition: 'height 0.4s ease, opacity 0.4s ease', opacity: isExpanded ? 1 : 0 }}
                        ref={contentRef}
                    >
                        <div className="mt-3 pt-3 border-t border-border">
                            {education.description && (
                                <p className={`${experienceTypography.description} mb-4`}>
                                    {education.description}
                                </p>
                            )}

                            {education.achievements && education.achievements.length > 0 && (
                                <div>
                                    <h5 className="text-xs md:text-sm font-medium mb-2">
                                        Recognition
                                    </h5>
                                    <ul className="space-y-1">
                                        {education.achievements.map((achievement, index) => (
                                            <li
                                                key={index}
                                                className={`${experienceTypography.description} flex items-start`}
                                            >
                                                <span className="text-muted-foreground/50 mr-2">•</span>
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
        <div className="space-y-2">
            {educationHistory.map((education) => (
                <EducationItem key={education.id} education={education} />
            ))}
        </div>
    )
}
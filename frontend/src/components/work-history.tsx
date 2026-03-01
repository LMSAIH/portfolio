import { useRef, useState } from "react"
import { experienceTypography } from "./Typographies"
import { Badge } from "@/components/ui/badge"

type Position = {
    title: string
    startDate: string
    endDate: string
    description: string
}

type WorkExperience = {
    id: string
    company: string
    logo?: string
    positions: Position[]
}

const workExperiences: WorkExperience[] = [
    {
        id: "4",
        company: "IcePanel",
        logo: "/company-logos/icepanel_logo.jpg",
        positions: [
            {
                title: "Jr. Software Engineer",
                startDate: "Feb 2026",
                endDate: "Present",
                description: "Contributing to the IcePanel platform to support software architects in designing and documenting software systems."
            }
        ]
    },
    {
        id: "1",
        company: "Langara College Applied Research Centre",
        logo: "/company-logos/langara_arc_logo.jpeg",
        positions: [
            {
                title: "Junior Research Assistant & Web Developer",
                startDate: "Sep 2025",
                endDate: "Present",
                description: "Promoted to Junior RA role. Leading development initiatives and mentoring new team members while continuing to maintain and enhance the research center's web presence.",
            },
            {
                title: "Student Research Assistant & Web Developer",
                startDate: "May 2025",
                endDate: "Sep 2025",
                description: "Spearheaded the complete migration of the center's website to a modern tech stack using React, Tailwind CSS, and Vite. Successfully deployed to Vercel, eliminating website maintenance costs by 100%. Achieved a 60% increase in website performance metrics and improved accessibility scores by 10%.",
            }
        ]
    },
    {
        id: "2",
        company: "Langara College",
        logo: "/company-logos/langara-college.png",
        positions: [
            {
                title: "Engagement Kiosk Assistant",
                startDate: "May 2025",
                endDate: "Dec 2025",
                description: "Enhanced the student experience by adding new functionalities and organizing existing data collection scripts and reporting processes using Excel. Actively engaged with students and staff daily to provide comprehensive information about college services, events, and resources.",
            }
        ]
    },
    {
        id: "3",
        company: "ResultsCX",
        logo: "/company-logos/results-cx.jpeg",
        positions: [
            {
                title: "Call Center Associate",
                startDate: "Jun 2023",
                endDate: "Dec 2023",
                description: "Provided exceptional customer support in a fast-paced, remote call center environment. Delivered clear and effective solutions by managing complex customer inquiries. Maintained a 100% first-call resolution rate.",
            }
        ]
    },
]

const WorkExperienceItem = ({ experience }: { experience: WorkExperience }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const hasMultiplePositions = experience.positions.length > 1
    const latestPosition = experience.positions[0]
    const dateRange = hasMultiplePositions
        ? `${experience.positions[experience.positions.length - 1].startDate} – ${latestPosition.endDate}`
        : `${latestPosition.startDate} – ${latestPosition.endDate}`

    return (
        <div className="relative">
            <div
                className="flex items-start gap-3 cursor-pointer hover:bg-secondary/50 rounded-xl p-3 -m-3 transition-colors duration-200"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Company Logo */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-secondary">
                        <img src={experience.logo} alt={experience.company} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <h4 className={experienceTypography.title}>
                                {latestPosition.title}
                            </h4>
                            <p className={experienceTypography.subtitle}>
                                {experience.company}
                            </p>
                            {hasMultiplePositions && (
                                <Badge>   +{experience.positions.length - 1} prev</Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={experienceTypography.date}>
                                {dateRange}
                            </span>
                        </div>
                    </div>

                    {/* Expanded Content */}
                    <div
                        style={{ height: isExpanded ? contentRef.current?.scrollHeight ?? 0 : 0, overflow: 'hidden', transition: 'height 0.4s ease, opacity 0.4s ease', opacity: isExpanded ? 1 : 0 }}
                    >
                        <div ref={contentRef}>
                            <div className=" pt-3 border-t border-border space-y-4">
                            {experience.positions.map((position, index) => (
                                <div key={index} className="relative">
                                    {hasMultiplePositions && <div className="flex items-start justify-between gap-2 mb-1">
                                        <span className="text-md font-normal ">{position.title}</span>
                                        <span className={experienceTypography.date}>
                                            {position.startDate} – {position.endDate}
                                        </span>
                                    </div>}
                                    <p className={experienceTypography.description}>
                                        {position.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const WorkHistory = () => {
    return (
        <div className="space-y-2">
            {workExperiences.map((experience) => (
                <WorkExperienceItem key={experience.id} experience={experience} />
            ))}
        </div>
    )
}

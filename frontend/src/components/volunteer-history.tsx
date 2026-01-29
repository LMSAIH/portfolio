import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { experienceTypography } from "./Typographies"

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
        description: "Working closely with the UNAC-Vancouver team for the development of the UNAC-Vancouver website, which advocates the United Nations and sustainable development goals (SDG's). My role involves providing technical guidance, ensuring the website meets accessibility standards, and enhancing user experience through continuous improvements. Currently leading a team of 7 volunteers to revitalize the website's design and functionality, aiming to increase engagement and awareness about the UN's initiatives within the Vancouver community.",
    },
    {
        id: "2",
        organization: "Langara French Club",
        role: "Vicepresident",
        logo: "/company-logos/french-club.png",
        startDate: "Sep 2024",
        endDate: "Dec 2025",
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
                className="flex items-start gap-2 cursor-pointer hover:bg-secondary/50 rounded-xl p-3 -m-3 transition-colors duration-200"
                onClick={toggleExpanded}
            >
                {/* Organization Logo/Initials */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-secondary">
                        <img src={experience.logo} alt={experience.organization} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <h4 className={experienceTypography.title}>
                                {experience.role}
                            </h4>
                            <p className={experienceTypography.subtitle}>
                                {experience.organization}
                            </p>
                        </div>

                        {/* Date on right */}
                        <span className={experienceTypography.date}>
                            {experience.startDate} – {experience.endDate}
                        </span>

                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="mt-3 pt-3 border-t border-border">
                            <p className={`${experienceTypography.description} whitespace-pre-wrap`}>
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
        <div className="space-y-2">
            {volunteerExperiences.map((experience) => (
                <VolunteerExperienceItem key={experience.id} experience={experience} />
            ))}
        </div>
    )
}

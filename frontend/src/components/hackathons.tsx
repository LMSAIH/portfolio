import { useRef } from "react"
import { motion, useInView } from "motion/react"
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
        name: "NWHacks 2026",
        award: "Shortlisted - Block (Best Real-World Ready AI Product) ",
        devpostUrl: "https://devpost.com/software/omni-uvw87a?_gl=1*1osu1z0*_gcl_au*OTE4OTI4NDI2LjE3Njg1OTY0Nzg.*_ga*MzM2NDYyNzk3LjE3Njg1OTY0Nzg.*_ga_0YHJK3Y10M*czE3Njk1ODYyMjckbzEzJGcxJHQxNzY5NTg2NTIzJGo0MyRsMCRoMA..",
    },
    {
        id: "2",
        name: "StormHacks 2025",
        award: "Finalist, Best Design, UN SDG Enactus Challenge",
        devpostUrl: "https://devpost.com/software/mapd-urban-development-intelligence",
    },
    {
        id: "3",
        name: "Project0",
        award: "1st Place Overall",
        devpostUrl: "https://devpost.com/software/devmatrix",
    },
    {
        id: "4",
        name: "LangaraHacks 2024",
        award: "Raffle Prize Winner",
        devpostUrl: "https://devpost.com/software/hacksbricsteam",
    },
]

const HackathonCard = ({ hackathon, index }: { hackathon: Hackathon; index: number }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.a
            ref={ref}
            href={hackathon.devpostUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="group block p-4 rounded-xl bg-secondary/90 hover:bg-secondary/60 transition-all duration-200"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1 group-hover:text-ring transition-colors">
                        {hackathon.name}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {hackathon.award}
                    </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 ml-3" />
            </div>
        </motion.a>
    )
}

export const Hackathons = () => {
    return (
        <div className="grid gap-3 md:grid-cols-2">
            {hackathons.map((hackathon, index) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} index={index} />
            ))}
        </div>
    )
}

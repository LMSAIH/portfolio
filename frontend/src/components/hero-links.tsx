import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import GitHubCalendar from "react-github-calendar"
import { ArrowRight, ExternalLink } from "lucide-react"
import { products } from "@/components/products/types"
import { useState, useEffect, createContext, useContext } from "react"

// Context to manage which hero link is open (only one at a time)
type HeroLinksContextType = {
    openId: string | null
    setOpenId: (id: string | null) => void
    isTouchDevice: boolean
}

const HeroLinksContext = createContext<HeroLinksContextType>({
    openId: null,
    setOpenId: () => {},
    isTouchDevice: false
})

// Custom event for selecting a product
const selectProduct = (index: number) => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Dispatch custom event after scroll
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('selectProduct', { detail: { index } }))
        }, 500)
    }
}

// Fullstack Developer Preview - Clean text list of first 4 projects
const FullstackPreview = () => (
    <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Projects</span>
        </div>
        <div className="space-y-1">
            {products.slice(0, 4).map((project, index) => (
                <button 
                    key={project.id}
                    onClick={() => selectProduct(index)}
                    className="w-full flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors group text-left"
                >
                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{project.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{project.tagline}</p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                </button>
            ))}
        </div>
        <button 
            onClick={() => selectProduct(0)}
            className="w-full flex items-center justify-center gap-1.5 pt-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
            <span>View all projects</span>
            <ArrowRight className="w-3 h-3" />
        </button>
    </div>
)

// Hackathon Winner Preview - Figma-like devpost card
const HackathonPreview = () => (
    <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Hackathons</span>
        </div>
        <a 
            href="https://devpost.com/yoloax11" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-3 rounded-lg bg-secondary/50 border border-border/50 hover:border-border hover:bg-secondary/80 transition-all group"
        >
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-[#003E54] flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">D</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Devpost Profile</p>
                    <p className="text-xs text-muted-foreground">Hackathon submissions</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
            </div>
        </a>

    </div>
)

// Open Source Preview - Figma-like GitHub activity
const OpenSourcePreview = () => (
    <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contributions</span>

        </div>
        <div className="p-2 rounded-lg bg-secondary/50 border border-border/50 overflow-x-auto">
            <GitHubCalendar 
                username="LMSAIH" 
                blockSize={7}
                blockMargin={2}
                fontSize={9}
                hideColorLegend
                hideMonthLabels
    
            />
        </div>
        <a 
            href="https://github.com/LMSAIH" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 pt-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
            <span>View GitHub</span>
            <ExternalLink className="w-3 h-3" />
        </a>
    </div>
)

type HeroLinkProps = {
    id: string
    children: React.ReactNode
    preview: React.ReactNode
    href?: string
    onClick?: () => void
}

const HeroLink = ({ id, children, preview, onClick }: HeroLinkProps) => {
    const { openId, setOpenId, isTouchDevice } = useContext(HeroLinksContext)
    const isOpen = openId === id

    const handleTriggerClick = (e: React.MouseEvent) => {
        if (isTouchDevice) {
            e.preventDefault()
            e.stopPropagation()
            // Toggle this one, close others
            setOpenId(isOpen ? null : id)
        } else {
            if (onClick) {
                onClick()
            }
        }
    }

    return (
        <HoverCard 
            open={isTouchDevice ? isOpen : undefined} 
            onOpenChange={isTouchDevice ? (open) => setOpenId(open ? id : null) : undefined} 
            openDelay={100}
            closeDelay={50}
        >
            <HoverCardTrigger asChild>
                <span 
                    onClick={handleTriggerClick}
                    className="text-foreground/90 hover:text-foreground cursor-pointer transition-all duration-300 relative underline underline-offset-4 decoration-muted-foreground/70 "
                >
                    {children}
                </span>
            </HoverCardTrigger>
            <HoverCardContent 
                className="w-64 p-3 rounded-xl border-border/50 bg-background/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 duration-200" 
                side="bottom" 
                align="start"
                sideOffset={8}
                onPointerDownOutside={() => isTouchDevice && setOpenId(null)}
                onInteractOutside={() => isTouchDevice && setOpenId(null)}
            >
                {preview}
            </HoverCardContent>
        </HoverCard>
    )
}


export const HeroDescription = () => {
    const [openId, setOpenId] = useState<string | null>(null)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        setIsTouchDevice(isTouch)
    }, [])

    return (
        <HeroLinksContext.Provider value={{ openId, setOpenId, isTouchDevice }}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <HeroLink id="fullstack" preview={<FullstackPreview />} onClick={() => selectProduct(0)}>
                    Fullstack developer
                </HeroLink>
                {". "}
                <HeroLink id="hackathon" preview={<HackathonPreview />}>
                    Hackathon winner
                </HeroLink>
                {". "}
                <HeroLink id="opensource" preview={<OpenSourcePreview />}>
                    Open source contributor
                </HeroLink>
                {"."}
            </p>
        </HeroLinksContext.Provider>
    )
}

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "motion/react"
import { ExternalLink, Github, Play, Pause } from "lucide-react"

type Product = {
    id: string
    name: string
    tagline: string
    description: string
    videoUrl?: string
    thumbnailUrl?: string
    liveUrl?: string
    githubUrl?: string
    tags: string[]
}

const products: Product[] = [
    {
        id: "1",
        name: "MapD",
        tagline: "Urban development intelligence",
        description: "A geospatial platform that aggregates data from multiple public datasets and displays it on an interactive map. Drop a pin anywhere to receive instant analysis of hypothetical development projects. Currently visualizes active projects in Vancouver and their community impacts.",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        liveUrl: "https://mapd.tech/",
        tags: ["React", "MapboxGL", "Python", "FastAPI"]
    },
    {
        id: "2",
        name: "Concpt",
        tagline: "From idea to structured plan in one prompt",
        description: "A platform that helps you plan, design, share and edit your projects. Generate structured project outlines with AI assistance. Complete freedom to create and iterate on your vision.",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        liveUrl: "https://concpt.dev",
        tags: ["TypeScript", "React", "AI", "Vercel"]
    },
    {
        id: "3",
        name: "Neosana",
        tagline: "Your health, centralized",
        description: "An application that helps you centralize medical records and health data. Designed to be a comprehensive health management tool that connects patients and healthcare providers seamlessly.",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        liveUrl: "https://neosana.app",
        tags: ["React", "Node.js", "PostgreSQL", "HIPAA"]
    },
    {
        id: "4",
        name: "Image2Location",
        tagline: "Where was this photo taken?",
        description: "A web application that takes an image as input and returns the location using AI. Store locations and images with additional trip-relevant information. Features server-sent events for real-time communication.",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        githubUrl: "https://github.com/LMSAIH/Image2Location",
        tags: ["TypeScript", "Python", "OpenAI", "Supabase"]
    },
    {
        id: "5",
        name: "Solitude",
        tagline: "An AI companion that sees you",
        description: "An AI companion that captures facial expressions and interprets them with emotion recognition, providing personalized responses. Features a custom human-like voice with specific personality traits for real-time conversations.",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        githubUrl: "https://github.com/LMSAIH/Solitude",
        tags: ["React", "FaceAPI", "OpenAI", "Speechify"]
    },
    {
        id: "6",
        name: "Innovate Recreation",
        tagline: "Research for inclusive recreation",
        description: "A research initiative focused on the experiences of immigrant and racialized communities in British Columbia's public recreation spaces.",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        liveUrl: "https://innovaterecreation.ca/",
        tags: ["Research", "React", "Tailwind"]
    },
]

const ProductItem = ({ product, index }: { product: Product; index: number }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                videoRef.current.play()
                setIsPlaying(true)
            } else {
                videoRef.current.pause()
                setIsPlaying(false)
            }
        }
    }, [isHovered])

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const isEven = index % 2 === 0

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
        >
            {/* Video/Media */}
            <div 
                className="w-full lg:w-3/5 relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    className="relative overflow-hidden rounded-2xl bg-secondary/30 aspect-video"
                >
                    {product.videoUrl ? (
                        <>
                            <video
                                ref={videoRef}
                                src={product.videoUrl}
                                poster={product.thumbnailUrl}
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Play/Pause overlay */}
                            <div 
                                className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                                onClick={togglePlay}
                            >
                                <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-transform duration-200 hover:scale-110">
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6 text-black" />
                                    ) : (
                                        <Play className="w-6 h-6 text-black ml-1" />
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                            <span className="text-4xl font-bold text-muted-foreground/30">{product.name[0]}</span>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Content */}
            <div className={`w-full lg:w-2/5 space-y-4 ${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                    <h3 className="text-2xl font-semibold tracking-tight">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{product.tagline}</p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    className="text-muted-foreground text-sm leading-relaxed"
                >
                    {product.description}
                </motion.p>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className={`flex flex-wrap gap-2 ${isEven ? '' : 'lg:justify-end'}`}
                >
                    {product.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-md bg-secondary/80 text-muted-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Links */}
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                    className={`flex gap-4 pt-2 ${isEven ? '' : 'lg:justify-end'}`}
                >
                    {product.liveUrl && (
                        <a
                            href={product.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-ring transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Visit
                        </a>
                    )}
                    {product.githubUrl && (
                        <a
                            href={product.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-ring transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            Source
                        </a>
                    )}
                </motion.div>
            </div>
        </motion.div>
    )
}

export const Products = () => {
    return (
        <div className="space-y-24">
            {products.map((product, index) => (
                <ProductItem key={product.id} product={product} index={index} />
            ))}
        </div>
    )
}

export default Products

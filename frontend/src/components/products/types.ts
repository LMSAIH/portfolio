export type Product = {
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

export const products: Product[] = [
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

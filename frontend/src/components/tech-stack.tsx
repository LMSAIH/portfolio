import { 
    FaReact, 
    FaNodeJs, 
    FaPython, 
    FaDocker, 
    FaGitAlt, 
    FaAws ,
    FaHtml5,
    FaCss3Alt,
    FaJsSquare,
    FaLinux
    
} from "react-icons/fa"
import { 
    SiTypescript, 
    SiNextdotjs, 
    SiTailwindcss, 
    SiPostgresql, 
    SiMongodb, 
    SiVercel,
    SiVite,
    SiFastapi,
    SiSupabase,
    SiFirebase,
    SiRedis,
    SiCloudflare
} from "react-icons/si"

type Technology = {
    id: string
    name: string
    category: string
    icon: React.ComponentType<{ className?: string }>
    url: string
    description: string
    color: string
}

const technologies: Technology[] = [
    // Frontend
    {
        id: "1",
        name: "HTML5",
        category: "Frontend",
        icon: FaHtml5,
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        description: "Markup language for creating web pages",
        color: "#E34F26"
    },
    {
        id: "2",
        name: "CSS3",
        category: "Frontend",
        icon: FaCss3Alt,
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        description: "Style sheet language for styling web pages",
        color: "#1572B6"
    },
    {
        id: "3",
        name: "JavaScript",
        category: "Frontend",
        icon: FaJsSquare,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        description: "Programming language for web development",
        color: "#F7DF1E"
    },
    {
        id: "4",
        name: "TypeScript",
        category: "Frontend",
        icon: SiTypescript,
        url: "https://www.typescriptlang.org",
        description: "Typed superset of JavaScript",
        color: "#3178C6"
    },
    {
        id: "5",
        name: "React",
        category: "Frontend",
        icon: FaReact,
        url: "https://reactjs.org",
        description: "JavaScript library for building user interfaces",
        color: "#61DAFB"
    },
    {
        id: "6",
        name: "Next.js",
        category: "Frontend",
        icon: SiNextdotjs,
        url: "https://nextjs.org",
        description: "React framework for production",
        color: "#000000"
    },
    {
        id: "7",
        name: "Tailwind CSS",
        category: "Frontend",
        icon: SiTailwindcss,
        url: "https://tailwindcss.com",
        description: "Utility-first CSS framework",
        color: "#06B6D4"
    },
    {
        id: "8",
        name: "Vite",
        category: "Frontend",
        icon: SiVite,
        url: "https://vitejs.dev",
        description: "Fast build tool and development server",
        color: "#646CFF"
    },
    // Backend
    {
        id: "9",
        name: "Node.js",
        category: "Backend",
        icon: FaNodeJs,
        url: "https://nodejs.org",
        description: "JavaScript runtime built on Chrome's V8",
        color: "#339933"
    },
    {
        id: "10",
        name: "Python",
        category: "Backend",
        icon: FaPython,
        url: "https://python.org",
        description: "High-level programming language",
        color: "#3776AB"
    },
    {
        id: "11",
        name: "FastAPI",
        category: "Backend",
        icon: SiFastapi,
        url: "https://fastapi.tiangolo.com",
        description: "Modern Python web framework for APIs",
        color: "#009688"
    },
    {
        id: "12",
        name: "PostgreSQL",
        category: "Backend",
        icon: SiPostgresql,
        url: "https://postgresql.org",
        description: "Advanced open source relational database",
        color: "#4169E1"
    },
    {
        id: "13",
        name: "MongoDB",
        category: "Backend",
        icon: SiMongodb,
        url: "https://mongodb.com",
        description: "Document-based NoSQL database",
        color: "#47A248"
    },
    {
        id: "14",
        name: "Supabase",
        category: "Backend",
        icon: SiSupabase,
        url: "https://supabase.com",
        description: "Open source Firebase alternative",
        color: "#3ECF8E"
    },
    {
        id: "15",
        name: "Firebase",
        category: "Backend",
        icon: SiFirebase,
        url: "https://firebase.google.com",
        description: "Google's mobile and web development platform",
        color: "#FFCA28"
    },
    {
        id: "16",
        name: "Redis",
        category: "Backend",
        icon: SiRedis,
        url: "https://redis.io",
        description: "In-memory data structure store",
        color: "#DC382D"
    },
    // Tools & DevOps
    {
        id: "17",
        name: "Docker",
        category: "DevOps",
        icon: FaDocker,
        url: "https://docker.com",
        description: "Platform for developing, shipping, and running applications",
        color: "#2496ED"
    },
    {
        id: "18",
        name: "Git",
        category: "DevOps",
        icon: FaGitAlt,
        url: "https://git-scm.com",
        description: "Distributed version control system",
        color: "#F05032"
    },
    {
        id: "19",
        name: "AWS",
        category: "DevOps",
        icon: FaAws,
        url: "https://aws.amazon.com",
        description: "Cloud computing services",
        color: "#FF9900"
    },
    {   
        id: "20",
        name: "Vercel",
        category: "DevOps",
        icon: SiVercel,
        url: "https://vercel.com",
        description: "Platform for frontend frameworks and static sites",
        color: "#000000"
    },
    {
        id: "21",
        name: "Cloudflare",
        category: "DevOps",
        icon: SiCloudflare,
        url: "https://cloudflare.com",
        description: "Web infrastructure and security services",
        color: "#F38020"
    },
    {
        id: "22",
        name: "Linux",
        category: "DevOps",
        icon: FaLinux,
        url: "https://linux.org",
        description: "Open source operating system",
        color: "#FCC624"
    }
]



export const TechStack = () => {
    const categories = ["Frontend", "Backend", "DevOps"]

    return (
        <div className="grid gap-8 md:grid-cols-3">
            {categories.map((category) => (
                <div key={category}>
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        {category}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                        {technologies
                            .filter(tech => tech.category === category)
                            .map(tech => (
                                <a 
                                    key={tech.id}
                                    href={tech.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-sm bg-secondary/50 hover:bg-secondary rounded-lg transition-colors duration-200 group"
                                    style={{
                                        color: tech.color
                                    }}
                                >
                                    <tech.icon className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110 text-[${tech.color}]`}  />
                                    <span className="text-foreground group-hover:text-foreground">{tech.name}</span>
                                </a>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

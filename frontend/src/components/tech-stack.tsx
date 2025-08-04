import { 
    FaReact, 
    FaNodeJs, 
    FaPython, 
    FaDocker, 
    FaGitAlt, 
    FaAws 
} from "react-icons/fa"
import { 
    SiTypescript, 
    SiNextdotjs, 
    SiTailwindcss, 
    SiPostgresql, 
    SiMongodb, 
    SiVercel 
} from "react-icons/si"

type Technology = {
    id: string
    name: string
    category: string
    icon: React.ComponentType<{ className?: string }>
    url: string
    description: string
}

const technologies: Technology[] = [
    // Frontend
    {
        id: "1",
        name: "React",
        category: "Frontend",
        icon: FaReact,
        url: "https://reactjs.org",
        description: "JavaScript library for building user interfaces"
    },
    {
        id: "2",
        name: "TypeScript",
        category: "Frontend",
        icon: SiTypescript,
        url: "https://www.typescriptlang.org",
        description: "Typed superset of JavaScript"
    },
    {
        id: "3",
        name: "Next.js",
        category: "Frontend",
        icon: SiNextdotjs,
        url: "https://nextjs.org",
        description: "React framework for production"
    },
    {
        id: "4",
        name: "Tailwind CSS",
        category: "Frontend",
        icon: SiTailwindcss,
        url: "https://tailwindcss.com",
        description: "Utility-first CSS framework"
    },
    // Backend
    {
        id: "5",
        name: "Node.js",
        category: "Backend",
        icon: FaNodeJs,
        url: "https://nodejs.org",
        description: "JavaScript runtime built on Chrome's V8"
    },
    {
        id: "6",
        name: "Python",
        category: "Backend",
        icon: FaPython,
        url: "https://python.org",
        description: "High-level programming language"
    },
    {
        id: "7",
        name: "PostgreSQL",
        category: "Backend",
        icon: SiPostgresql,
        url: "https://postgresql.org",
        description: "Advanced open source relational database"
    },
    {
        id: "8",
        name: "MongoDB",
        category: "Backend",
        icon: SiMongodb,
        url: "https://mongodb.com",
        description: "Document-based NoSQL database"
    },
    // Tools & DevOps
    {
        id: "9",
        name: "Docker",
        category: "DevOps",
        icon: FaDocker,
        url: "https://docker.com",
        description: "Platform for developing, shipping, and running applications"
    },
    {
        id: "10",
        name: "Git",
        category: "DevOps",
        icon: FaGitAlt,
        url: "https://git-scm.com",
        description: "Distributed version control system"
    },
    {
        id: "11",
        name: "AWS",
        category: "DevOps",
        icon: FaAws,
        url: "https://aws.amazon.com",
        description: "Cloud computing services"
    },
    {
        id: "12",
        name: "Vercel",
        category: "DevOps",
        icon: SiVercel,
        url: "https://vercel.com",
        description: "Platform for frontend frameworks and static sites"
    }
]



export const TechStack = () => {
    const categories = ["Frontend", "Backend", "DevOps"]

    return (
        <div>
            <div>
                
                <div className="grid gap-6 md:grid-cols-3">
                    {categories.map((category) => (
                        <div key={category}>
                            <h5 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-3">
                                {category}
                            </h5>
                            <ul className="space-y-2">
                                {technologies
                                    .filter(tech => tech.category === category)
                                    .map(tech => (
                                        <li key={tech.id} className="text-sm text-gray-600 dark:text-gray-400">
                                            <a 
                                                href={tech.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                                            >
                                                <tech.icon className="h-4 w-4" />
                                                {tech.name}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

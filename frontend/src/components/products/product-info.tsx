import { motion } from "motion/react"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Product } from "./types"

type ProductInfoProps = {
    product: Product
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
    return (
        <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="max-w-2xl mx-auto text-center space-y-3 md:space-y-4 px-4"
        >
            {/* Title and Tagline */}
            <div className="space-y-1 md:space-y-2">
                <motion.h3 
                    className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {product.name}
                </motion.h3>
                <motion.p 
                    className="text-muted-foreground text-xs md:text-sm lg:text-base italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    {product.tagline}
                </motion.p>
            </div>

            {/* Description */}
            <motion.p 
                className="text-muted-foreground text-xs md:text-sm lg:text-base leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {product.description}
            </motion.p>

            {/* Tags */}
            <motion.div 
                className="flex flex-wrap justify-center gap-1.5 md:gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
            >
                {product.tags.map((tag) => (
                    <Badge 
                        key={tag} 
                        variant="secondary"
                        className="text-[10px] md:text-xs"
                    >
                        {tag}
                    </Badge>
                ))}
            </motion.div>

            {/* Links */}
            <motion.div 
                className="flex justify-center gap-4 md:gap-6 pt-1 md:pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {product.liveUrl && (
                    <a
                        href={product.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium hover:text-primary transition-colors group"
                    >
                        <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                        Visit Live
                    </a>
                )}
                {product.githubUrl && (
                    <a
                        href={product.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium hover:text-primary transition-colors group"
                    >
                        <Github className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                        View Source
                    </a>
                )}
            </motion.div>
        </motion.div>
    )
}

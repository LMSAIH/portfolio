import { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"
import { Play, Pause, Maximize2 } from "lucide-react"
import type { Product } from "./types"

type VideoCardProps = {
    product: Product
    isActive: boolean
    position: number
    onClick: () => void
    onOpenModal: () => void
    videoRef?: React.RefObject<HTMLVideoElement | null>
}

export const VideoCard = ({ 
    product, 
    isActive, 
    position,
    onClick,
    onOpenModal,
    videoRef
}: VideoCardProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const activeVideoRef = videoRef || localVideoRef

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (activeVideoRef.current) {
            if (isPlaying) {
                activeVideoRef.current.pause()
            } else {
                activeVideoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        onOpenModal()
    }

    useEffect(() => {
        if (activeVideoRef.current) {
            if (isActive) {
                activeVideoRef.current.play().catch(() => {})
                setIsPlaying(true)
            } else {
                activeVideoRef.current.pause()
                activeVideoRef.current.currentTime = 0
                setIsPlaying(false)
            }
        }
    }, [isActive, activeVideoRef])

    const getCardStyles = () => {
        const absPosition = Math.abs(position)
        
        if (position === 0) {
            return {
                scale: 1,
                opacity: 1,
                zIndex: 30,
                x: 0,
            }
        }
        
        const direction = position > 0 ? 1 : -1
        const baseOffset = 220
        
        return {
            scale: 0.7 - absPosition * 0.05,
            opacity: absPosition > 1 ? 0.8 : 1,
            zIndex: 20 - absPosition * 5,
            x: direction * (baseOffset + (absPosition - 1) * 160),
        }
    }

    const styles = getCardStyles()

    return (
        <motion.div
            layout
            animate={{
                scale: styles.scale,
                opacity: styles.opacity,
                x: styles.x,
                zIndex: styles.zIndex,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
            style={{ 
                zIndex: styles.zIndex,
                width: '100%',
                maxWidth: '600px',
            }}
        >
            <div 
                className={`relative overflow-hidden rounded-2xl bg-secondary/30 aspect-video border transition-all duration-300 ${
                    isActive ? 'border-border' : 'border-border/50'
                }`}
            >
                {product.videoUrl ? (
                    <>
                        <video
                            ref={activeVideoRef}
                            src={product.videoUrl}
                            poster={product.thumbnailUrl}
                            loop
                            muted
                            playsInline
                            className={`w-full h-full object-cover rounded-2xl transition-all duration-300 ${
                                !isActive ? 'blur-[1px]' : ''
                            }`}
                        />
                        {/* Play/Pause overlay - only show on active and hover */}
                        {isActive && (
                            <div 
                                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                                    isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <button
                                    onClick={togglePlay}
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-transform duration-200 hover:scale-110"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6 md:w-7 md:h-7 text-black" />
                                    ) : (
                                        <Play className="w-6 h-6 md:w-7 md:h-7 text-black ml-1" />
                                    )}
                                </button>
                            </div>
                        )}
                        {/* Expand button - only show on active and hover */}
                        {isActive && (
                            <button
                                onClick={handleOpenModal}
                                className={`absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                                    isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-black" />
                            </button>
                        )}
                        {/* Title label on inactive cards - inside the container */}
          
                    </>
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-secondary to-muted flex items-center justify-center rounded-2xl">
                        <span className="text-4xl font-bold text-muted-foreground/30">{product.name[0]}</span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

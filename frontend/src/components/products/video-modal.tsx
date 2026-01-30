import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"
import type { Product } from "./types"

type VideoModalProps = {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export const VideoModal = ({
    product,
    isOpen,
    onClose
}: VideoModalProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    if (!product) return null

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                    
                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                        className="relative w-full max-w-4xl z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:scale-110 border border-white/20"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Video Container */}
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                            {product.videoUrl && (
                                <video
                                    ref={videoRef}
                                    src={product.videoUrl}
                                    poster={product.thumbnailUrl}
                                    controls
                                    autoPlay
                                    className="w-full aspect-video"
                                />
                            )}
                        </div>

                        {/* Video Info */}
                        <div className="mt-4 text-center">
                            <h4 className="text-white text-lg md:text-xl font-semibold">{product.name}</h4>
                            <p className="text-white/60 text-sm mt-1">{product.tagline}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )

    // Use portal to render modal at document body level
    return createPortal(modalContent, document.body)
}

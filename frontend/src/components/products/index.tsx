import { useState, useRef, useEffect, useCallback } from "react"
import { AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { products } from "./types"
import { VideoCard } from "./video-card"
import { VideoModal } from "./video-modal"
import { ProgressDots } from "./progress-dots"
import { ProductInfo } from "./product-info"

export const Products = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const activeProduct = products[activeIndex]

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % products.length)
    }, [])

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + products.length) % products.length)
    }, [])

    const goToIndex = useCallback((index: number) => {
        setActiveIndex(index)
        setIsAutoPlaying(false)
    }, [])

    const openModal = useCallback(() => {
        setIsModalOpen(true)
        setIsAutoPlaying(false)
    }, [])

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    // Auto-advance carousel
    useEffect(() => {
        if (!isAutoPlaying) return

        const timer = setInterval(() => {
            goToNext()
        }, 8000)

        return () => clearInterval(timer)
    }, [isAutoPlaying, goToNext])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isModalOpen) return
            if (e.key === 'ArrowLeft') {
                goToPrev()
                setIsAutoPlaying(false)
            } else if (e.key === 'ArrowRight') {
                goToNext()
                setIsAutoPlaying(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [goToNext, goToPrev, isModalOpen])

    // Listen for selectProduct custom event from hero links
    useEffect(() => {
        const handleSelectProduct = (e: CustomEvent<{ index: number }>) => {
            setActiveIndex(e.detail.index)
            setIsAutoPlaying(false)
        }

        window.addEventListener('selectProduct', handleSelectProduct as EventListener)
        return () => window.removeEventListener('selectProduct', handleSelectProduct as EventListener)
    }, [])

    const getPosition = (index: number): number => {
        const diff = index - activeIndex
        const total = products.length
        
        if (diff > total / 2) return diff - total
        if (diff < -total / 2) return diff + total
        return diff
    }

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Carousel Container */}
            <div 
                ref={containerRef}
                className="relative h-[240px] md:h-[340px] lg:h-[380px] overflow-hidden"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Navigation Arrows */}
                <button
                    onClick={() => { goToPrev(); setIsAutoPlaying(false); }}
                    className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-background hover:scale-110 transition-all duration-200"
                    aria-label="Previous project"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                <button
                    onClick={() => { goToNext(); setIsAutoPlaying(false); }}
                    className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-background hover:scale-110 transition-all duration-200"
                    aria-label="Next project"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Cards */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {products.map((product, index) => {
                        const position = getPosition(index)
                        if (Math.abs(position) > 2) return null
                        
                        return (
                            <VideoCard
                                key={product.id}
                                product={product}
                                isActive={index === activeIndex}
                                position={position}
                                onClick={() => { goToIndex(index); }}
                                onOpenModal={openModal}
                                videoRef={index === activeIndex ? videoRef : undefined}
                            />
                        )
                    })}
                </div>
            </div>

            {/* Progress Dots */}
            <ProgressDots 
                total={products.length} 
                current={activeIndex} 
                onSelect={goToIndex}
            />

            {/* Video Modal */}
            <VideoModal
                product={activeProduct}
                isOpen={isModalOpen}
                onClose={closeModal}
            />

            {/* Active Product Description */}
            <AnimatePresence mode="wait">
                <ProductInfo product={activeProduct} />
            </AnimatePresence>
        </div>
    )
}

export default Products

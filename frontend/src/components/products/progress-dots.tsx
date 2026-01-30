type ProgressDotsProps = {
    total: number
    current: number
    onSelect: (index: number) => void
}

export const ProgressDots = ({ 
    total, 
    current, 
    onSelect 
}: ProgressDotsProps) => {
    return (
        <div className="flex items-center justify-center gap-2 mt-4 md:mt-6">
            {Array.from({ length: total }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(index)}
                    className={`transition-all duration-300 rounded-full ${
                        index === current 
                            ? 'w-6 md:w-8 h-2 bg-primary' 
                            : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    )
}

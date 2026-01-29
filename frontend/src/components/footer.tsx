export const Footer = () => {
    return (
        <footer className="py-12 border-t border-border">
            <div className="px-6 mx-auto max-w-6xl">
                <div className="text-center text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} Axel Velasquez
                    </p>
                </div>
            </div>
        </footer>
    )
}

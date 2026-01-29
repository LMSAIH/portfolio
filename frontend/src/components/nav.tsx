import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-selector";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";

const Navigation: React.FC = () => {
    return (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="backdrop-blur-xl bg-background/70 border border-border/50 rounded-full px-2 py-2 shadow-lg shadow-black/5 dark:shadow-black/20">
                <div className="flex items-center gap-1">
                    <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-9 w-9 rounded-full"
                        asChild
                    >
                        <a 
                            href="https://www.linkedin.com/in/axel-gael-velasquez-castaneda-1a4075323/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                        >
                            <FaLinkedinIn className="h-4 w-4" />
                        </a>
                    </Button>
                    
                    <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-9 w-9 rounded-full"
                        asChild
                    >
                        <a 
                            href="https://github.com/LMSAIH" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                        >
                            <FaGithub className="h-4 w-4" />
                        </a>
                    </Button>
                    
                    <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-9 w-9 rounded-full"
                        asChild
                    >
                        <a 
                            href="mailto:axel.velascast@gmail.com"
                            aria-label="Send Email"
                        >
                            <FaEnvelope className="h-4 w-4" />
                        </a>
                    </Button>
                    
                    <div className="w-px h-5 bg-border mx-1" />
                    
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-selector";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";

const Navigation: React.FC = () => {
    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 h-24">
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-full px-4 py-2 shadow-2xl shadow-black/5 dark:shadow-black/20">
                <div className="flex items-center gap-4">
                    {/* Social Icons */}
                    <Button 
                        variant="ghost" 
                        size="icon"
                        asChild
                    >
                        <a 
                            href="https://linkedin.com/in/yourprofile" 
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
                        asChild
                    >
                        <a 
                            href="https://github.com/yourusername" 
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
                        asChild
                    >
                        <a 
                            href="mailto:your.email@gmail.com"
                            aria-label="Send Email"
                        >
                            <FaEnvelope className="h-4 w-4" />
                        </a>
                    </Button>
                    
                    {/* Separator */}
                    <div className="w-px h-6 bg-black/30 dark:bg-white/20 mx-2"></div>
                    
                    {/* Theme Toggle */}
                    <div>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
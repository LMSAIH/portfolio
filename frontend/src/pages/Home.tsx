import { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Subheader } from "@/components/Typographies";
import { AnimatedSection } from "@/components/Animations";
import { HeroDescription } from "@/components/hero-links";

// Lazy-loaded components (loaded when needed)
const Products = lazy(() => import("@/components/products").then(mod => ({ default: mod.Products })));
const WorkHistory = lazy(() => import("@/components/work-history").then(mod => ({ default: mod.WorkHistory })));
const VolunteerHistory = lazy(() => import("@/components/volunteer-history").then(mod => ({ default: mod.VolunteerHistory })));
const Hackathons = lazy(() => import("@/components/hackathons").then(mod => ({ default: mod.Hackathons })));
const Education = lazy(() => import("@/components/education").then(mod => ({ default: mod.Education })));
const TechStack = lazy(() => import("@/components/tech-stack").then(mod => ({ default: mod.TechStack })));

const SectionSkeleton = () => (
    <div className="py-8"><Skeleton className="h-48 w-full rounded-2xl" /></div>
);

const sections = [
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "education", label: "Education" },
    { id: "work", label: "Work" },
    { id: "volunteering", label: "Volunteering" },
    { id: "tech-stack", label: "Tech Stack" },
    { id: "hackathons", label: "Hackathons" },

];

const Sidebar = () => {
    const [activeSection, setActiveSection] = useState("about");

    useEffect(() => {
        const handleScroll = () => {
            const viewportMiddle = window.scrollY + window.innerHeight / 3;

            let currentSection = sections[0].id;

            for (const { id } of sections) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;

                    if (elementTop <= viewportMiddle) {
                        currentSection = id;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        // Small delay to ensure DOM is ready
        setTimeout(handleScroll, 100);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:block z-50"
        >
            <div className="space-y-1">
                {sections.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className="group flex items-center gap-3 py-2 transition-all duration-300"
                    >
                        <div
                            className={`h-px transition-all duration-300 ${activeSection === id
                                    ? "w-8 bg-foreground"
                                    : "w-4 bg-muted-foreground/30 group-hover:w-6 group-hover:bg-muted-foreground"
                                }`}
                        />
                        <span
                            className={`text-xs transition-all duration-300 ${activeSection === id
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground/50 group-hover:text-muted-foreground"
                                }`}
                        >
                            {label}
                        </span>
                    </button>
                ))}
            </div>
        </motion.nav>
    );
};

const Home: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Sidebar />

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                className="pt-28 pb-8 px-6 max-w-4xl mx-auto"
            >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-3">
                    Hi, I'm Axel
                </h1>
                <HeroDescription />
            </motion.section>

            {/* About */}
            <AnimatedSection id="about" className="py-6 px-6 max-w-4xl mx-auto" delay={0.1}>
                <Subheader>About</Subheader>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                        I'm a <span className="text-foreground font-bold">full-stack developer</span> based in Vancouver who builds software for fun. I've led <span className="text-foreground font-bold">winning teams</span> at major hackathons, including <a href="https://devpost.com/software/mapd-urban-development-intelligence" target="_blank" rel="noopener noreferrer" className="text-foreground font-bold hover:opacity-60 transition-opacity duration-300">StormHacks 2025 — Western Canada's largest</a>.
                    </p>
                    <p>
                        Currently building @<a href="https://icepanel.io" target="_blank" rel="noopener noreferrer" className="text-foreground font-bold hover:opacity-60 transition-opacity duration-300">IcePanel YC (S23)</a>, a platform that helps software architects design and document software systems. 
                    </p>
                </div>
            </AnimatedSection>


            {/* Products */}
            <AnimatedSection id="products" className="py-6 px-6 max-w-4xl mx-auto">
                <Subheader>Products</Subheader>
                <Suspense fallback={<SectionSkeleton />}>
                    <Products />
                </Suspense>
            </AnimatedSection>

            {/* Education */}
            <AnimatedSection id="education" className="py-6 px-6 max-w-4xl mx-auto">
                <Subheader>Education</Subheader>
                <Suspense fallback={<SectionSkeleton />}>
                    <Education />
                </Suspense>
            </AnimatedSection>

            {/* Work Experience */}
            <AnimatedSection id="work" className="py-6 px-6 max-w-4xl mx-auto">
                <Subheader>Work Experience</Subheader>
                <Suspense fallback={<SectionSkeleton />}>
                    <WorkHistory />
                </Suspense>
            </AnimatedSection>

            {/* Volunteering */}
            <AnimatedSection id="volunteering" className="py-6 px-6 max-w-4xl mx-auto">
                <Subheader>Volunteering</Subheader>
                <Suspense fallback={<SectionSkeleton />}>
                    <VolunteerHistory />
                </Suspense>
            </AnimatedSection>

            <AnimatedSection id="tech-stack" className="py-6 px-6 max-w-4xl mx-auto">
                <Subheader>Tech Stack</Subheader>
                <Suspense fallback={<SectionSkeleton />}>
                    <TechStack />
                </Suspense>
            </AnimatedSection>

            {/* Hackathons */}
            <AnimatedSection id="hackathons" className="py-6 px-6 max-w-4xl mx-auto">
                <Subheader>Hackathons</Subheader>
                <Suspense fallback={<SectionSkeleton />}>
                    <Hackathons />
                </Suspense>
            </AnimatedSection>


        </div>
    );
}

export default Home;

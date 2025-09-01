import { lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import GitHubCalendar from 'react-github-calendar';

// Lazy-loaded components (loaded when needed)
const Deployments = lazy(() => import("@/components/deployments").then(mod => ({ default: mod.Deployments })));
const FeaturedProjects = lazy(() => import("@/components/featured-projects").then(mod => ({ default: mod.FeaturedProjects })));
const GitHubCommits = lazy(() => import("@/components/github-commits").then(mod => ({ default: mod.GitHubCommits })));
const WorkHistory = lazy(() => import("@/components/work-history").then(mod => ({ default: mod.WorkHistory })));
const VolunteerHistory = lazy(() => import("@/components/volunteer-history").then(mod => ({ default: mod.VolunteerHistory })));
const Hackathons = lazy(() => import("@/components/hackathons").then(mod => ({ default: mod.Hackathons })));
const TechStack = lazy(() => import("@/components/tech-stack").then(mod => ({ default: mod.TechStack })));

const Home: React.FC = () => {
    return (
        <div className="py-24 lg:py-32 px-4 mx-auto max-w-7xl">
            <Tabs defaultValue="portfolio" className="w-full">

                <div className="mb-10 flex justify-center lg:justify-start">
                    <TabsList className="inline-flex h-9 items-center justify-center lg:justify-left rounded-lg  text-muted-foreground flex-wrap gap-y-2">
                        <TabsTrigger value="portfolio" className="px-3 lg:px-4 py-1.5 text-sm">Portfolio</TabsTrigger>
                        <TabsTrigger value="projects" className="px-3 lg:px-4 py-1.5 text-sm">Projects</TabsTrigger>
                        <TabsTrigger value="contributions" className="px-3 lg:px-4 py-1.5 text-sm">Contributions</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="portfolio" className="space-y-8">
                    <div className="text-left w-full lg:w-1/2">
                        <h1 className="mb-4">
                            I am <span className="font-medium">Axel Velasquez</span>, a fullstack developer who loves building, testing and shipping applications.
                        </h1>

                        <p className="mb-4">
                            I enjoy working with non-profits and regularly contribute to open source projects. Helping to shape a better world within your field is not only rewarding, it's human.
                        </p>

                        <p className="mb-4">
                            If you are interested in any of my work, almost everything is publicly available on my <a href="https://github.com/LMSAIH" target="_blank" rel="noopener noreferrer" className="font-medium underline">GitHub</a>. If it isn't but you'd like to inquire about it, feel free to reach out to me via email.
                        </p>
                    </div>

                    <Suspense fallback={<div className="p-4 border rounded-lg"><Skeleton className="h-64 w-full" /></div>}>
                        <Deployments />
                    </Suspense>

                    <Suspense fallback={<div className="p-4 border rounded-lg"><Skeleton className="h-64 w-full" /></div>}>
                        <WorkHistory />
                    </Suspense>

                    <Suspense fallback={<div className="p-4 border rounded-lg"><Skeleton className="h-64 w-full" /></div>}>
                        <VolunteerHistory />
                    </Suspense>

                    <h3 className="text-lg font-semibold">Tech Stack</h3>

                    <Suspense fallback={<div className="p-4 border rounded-lg"><Skeleton className="h-48 w-full" /></div>}>
                        <TechStack />
                    </Suspense>

                    <Suspense fallback={<div className="p-4 border rounded-lg"><Skeleton className="h-48 w-full" /></div>}>
                        <Hackathons />
                    </Suspense>

                    <h3 className="text-lg font-semibold">Github Contribution Graph</h3>

                    <Suspense fallback={<div className="p-4 border rounded-lg"><Skeleton className="h-32 w-full" /></div>}>
                        <GitHubCalendar username="LMSAIH" />
                    </Suspense>

                </TabsContent>

                <TabsContent value="projects" className="space-y-8">
                    <Suspense fallback={<div className="p-4 border rounded-lg"><Skeleton className="h-64 w-full" /></div>}>
                        <FeaturedProjects />
                    </Suspense>
                </TabsContent>

                <TabsContent value="contributions" className="space-y-8">
                    <Suspense fallback={<div className="p-4 border rounded-lg"><Skeleton className="h-64 w-full" /></div>}>
                        <GitHubCommits />
                    </Suspense>
                </TabsContent>

            </Tabs>
        </div>
    );
}

export default Home;

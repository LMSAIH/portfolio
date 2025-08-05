import { Deployments } from "@/components/deployments";
import { FeaturedProjects } from "@/components/featured-projects";
import { GitHubCommits } from "@/components/github-commits";
import { WorkHistory } from "@/components/work-history";
import { VolunteerHistory } from "@/components/volunteer-history";
import { Hackathons } from "@/components/hackathons";
import { TechStack } from "@/components/tech-stack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GitHubCalendar from 'react-github-calendar';

const Home: React.FC = () => {
    return (
        <div className="py-24 lg:py-32 px-4 mx-auto max-w-7xl">
            <Tabs defaultValue="portfolio" className="w-full">

                <div className="mb-10 flex justify-center lg:justify-start">
                    <TabsList className="inline-flex h-9 items-center justify-center lg:justify-left rounded-lg  text-muted-foreground flex-wrap gap-y-2">
                        <TabsTrigger value="portfolio" className="px-3 lg:px-4 py-1.5 text-sm">Portfolio</TabsTrigger>
                        <TabsTrigger value="projects" className="px-3 lg:px-4 py-1.5 text-sm">Projects</TabsTrigger>
                        <TabsTrigger value="contributions" className="px-3 lg:px-4 py-1.5 text-sm">Contributions</TabsTrigger>
                        <TabsTrigger value="tech-stack" className="px-3 lg:px-4 py-1.5 text-sm">Stack</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="portfolio" className="space-y-8">
                    <div className="text-left w-full lg:w-1/2">
                        <p className="mb-4">
                            I am Axel Velasquez, a fullstack developer who loves building, testing and shipping applications.
                        </p>
                        <p className="mb-4">
                            I enjoy working with non-profits and regularly contribute to open source projects. Helping to shape a better world within your field is not only rewarding, it's human.
                        </p>

                        <p className="mb-4">
                            If you are interested on any of my work, almost everything is publicly available on my <a href="https://github.com/LMSAIH" target="_blank" rel="noopener noreferrer" className="font-medium underline">GitHub</a>. If it isn't but you'd like to inquire about it, feel free to reach out to me via email.
                        </p>
                    </div>

                    <Deployments />

                    <WorkHistory />

                    <VolunteerHistory />

                    <Hackathons />

                    <h3 className="text-lg font-semibold">Github Contribution Graph</h3>

                    <GitHubCalendar username="LMSAIH" />

                </TabsContent>

                <TabsContent value="projects" className="space-y-8">
                    <FeaturedProjects />
                </TabsContent>

                <TabsContent value="contributions" className="space-y-8">

                    <GitHubCommits />
                </TabsContent>

                <TabsContent value="tech-stack" className="space-y-8">
                    <TechStack />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Home;

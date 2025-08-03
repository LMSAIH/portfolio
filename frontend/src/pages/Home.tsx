import { Deployments } from "@/components/deployments";
import { GitHubCommits } from "@/components/github-commits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home: React.FC = () => {
    return (
        <div className="py-24 lg:py-32 px-4 mx-auto max-w-7xl">
            <Tabs defaultValue="portfolio" className="w-full">

                <div className="mb-8 flex justify-left">
                    <TabsList className="inline-flex h-9 items-center justify-center rounded-lg p-1 text-muted-foreground">
                        <TabsTrigger  value="portfolio" className="px-4 py-1.5 text-sm">Portfolio</TabsTrigger>
                        <TabsTrigger  value="contributions" className="px-4 py-1.5 text-sm">OSS Contributions</TabsTrigger>
                    </TabsList>
                </div>
                
                <TabsContent value="portfolio" className="space-y-8">
                    <div className="text-left w-full lg:w-1/2">
                        <p className="mb-4">
                            I am a fullstack developer who loves building, testing and shipping applications.
                        </p>
                        <p className="mb-4">
                            I enjoy working with non-profits and regularly contribute to open source projects. Helping to shape a better world within your field is not only rewarding, it's human.
                        </p>
                    </div>
                    
                    <Deployments />
                </TabsContent>
                
                <TabsContent value="contributions" className="space-y-8">                    
                    <GitHubCommits />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Home;

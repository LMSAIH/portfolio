import YCLogo from '@/assets/y_combinator_logo.svg'
import LangaraLogo from '@/assets/langara_college_coa.png'
import UNACLogo from '@/assets/UNAC_logo.png'
import { WritingSection } from '@/components/writing-section'
import { FaGithub } from 'react-icons/fa6'
import { IoLogoLinkedin } from "react-icons/io5";
import { ThemeToggle } from '@/components/theme-toggle'
import { HorizonBloom } from '@/components/horizon-bloom'

const Home: React.FC = () => {
    return (
        <main className="flex min-h-screen flex-col overflow-x-hidden">
            <div className="mx-auto flex w-full max-w-xl flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-6 pb-4">
                    <h1 className="font-['Newsreader',Georgia,serif] text-3xl leading-[1.15] font-normal tracking-[-0.01em] sm:text-4xl">Axel Velasquez</h1>
                    <ThemeToggle />
                </div>


                {/* About */}
                <div className="px-8 py-5 text-muted-foreground leading-relaxed">
                    <p>
                        I build software that architects love at{" "}
                        <a className="underline decoration-dashed decoration-2 decoration-orange-400 underline-offset-4 font-medium transition-colors hover:text-foreground" href="https://icepanel.io/" target='_blank'>IcePanel (YC W23)</a>{" "}
                        <img src={YCLogo} alt="Y Combinator logo" width={16} height={16} className="inline align-middle rounded-xs mb-0.5 ml-1" />
                    </p>
                    <p>
                        research at{" "}
                        <a className="underline underline-offset-4 decoration-dashed decoration-2 decoration-green-600 font-medium transition-colors hover:text-foreground" href="https://langara.ca/" target='_blank'>Langara</a>{" "}
                        <img src={LangaraLogo} alt="Langara College logo" width={20} height={18} className="inline align-middle rounded-xs mb-0.5 ml-1" />
                    </p>
                    <p>
                        and serve on the Board of Directors for the{" "}
                        <a className="underline underline-offset-4 decoration-dashed decoration-2 decoration-sky-500 font-medium transition-colors hover:text-foreground" href="https://unacvancouver.org/" target='_blank'>United Nations Association in Canada, Vancouver</a>{" "}
                        <img src={UNACLogo} alt="UNAC Logo" width={20} height={12} className="inline align-middle rounded-xs mb-0.5 ml-1" />
                    </p>

                    <p className="mt-4"> Beyond work, I enjoy volunteering, attending hackatons, reading, swimming, running, or doing anything that makes me feel alive. </p>

                    <p className="mt-4"> Programming is an <span className="italic text-foreground">act of creation</span>. Through my work I strive to build something meaningful. </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 px-8 py-2">
                    <a href="https://github.com/LMSAIH" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground transition-opacity hover:opacity-70">
                        <FaGithub className="size-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/axel-gael-velasquez-castaneda-1a4075323/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#0A66C2] transition-opacity hover:opacity-70">
                        <IoLogoLinkedin className="size-6" />
                    </a>
                    <a href="mailto:axel.velascast@gmail.com" className="ml-auto self-end text-sm text-muted-foreground underline decoration-dashed decoration-2 underline-offset-4 transition-colors hover:text-foreground">
                        axel.velascast@gmail.com
                    </a>
                </div>

                {/* Writing */}
                <div className="px-8 py-5">
                    <WritingSection />
                </div>
            </div>

            {/* Horizon, tucked up under the writing list and filling whatever is left of the screen */}
            <HorizonBloom className="-mt-40 min-h-[30rem] flex-1">
                <p className="px-8 py-5 text-center text-sm text-muted-foreground"> &copy; Axel Velasquez 2026, All rights reserved.</p>
            </HorizonBloom>
        </main>
    );
}

export default Home;

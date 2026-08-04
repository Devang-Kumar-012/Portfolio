import Navbar from "@/components/layout/navbar";
import ScrollProgress from "@/components/layout/Scroll-Progress";
import Hero from "@/components/sections/Hero";
import Stack from "@/components/sections/stack";
import Projects from "@/components/sections/projects";
import About from "@/components/sections/about";
import ManifestoFlow from "@/components/effects/mainfesto-flow";

export default function Home() {
    return (
        <>
            <Navbar />
            <ScrollProgress />

            <main className="bg-background relative">
                <Hero />
                <div className="relative z-10 bg-background border-t border-border">
                    <section id="about">
                        <About />
                    </section>
                    <ManifestoFlow />
                    <section className="stack">
                        <Stack />
                    </section>
                    <ManifestoFlow reverse />

                    <section id="projects">
                        <Projects />
                    </section>
                </div>
            </main>
        </>
    )
}
import Navbar from "@/components/layout/navbar";
import ScrollProgress from "@/components/layout/Scroll-Progress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/about";

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
                </div>
            </main>
        </>
    );
}
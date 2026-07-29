import Navbar from "@/components/layout/navbar";
import ScrollProgress from "@/components/layout/Scroll-Progress";
import Hero from "@/components/sections/Hero";

export default function Home() {
    return (
        <>
            <Navbar />
            <ScrollProgress />

            <main className="bg-background relative">
                <Hero />
            </main>
        </>
    );
}
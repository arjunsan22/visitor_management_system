import { Header } from "../../components/visitor/Header";
import { HeroSection } from "../../components/visitor/HeroSection";

export const Home = () => {
    return (
        <div className="min-h-screen bg-slate-100">

            <Header />

            <main className="mx-auto flex max-w-7xl items-center justify-center px-6 py-20">

                <HeroSection />

            </main>

        </div>
    );
};
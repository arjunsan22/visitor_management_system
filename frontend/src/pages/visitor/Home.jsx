import { Header } from "../../components/visitor/Header";
import { HeroSection } from "../../components/visitor/HeroSection";
import { Footer } from "../../components/visitor/footer";

export const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bbg-slate-100">

            <Header />

            <main className="flex flex-1 w-full items-center justify-center px-4 sm:px-6 py-12">
                <HeroSection />
            </main>

            <Footer />

        </div>
    );
};
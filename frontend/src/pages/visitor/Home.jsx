
import { Header } from "../../components/visitor/Header";

export const Home = () => {
    return (
        <div className="min-h-screen bg-slate-100">

            <Header />

            <main className="mx-auto flex max-w-7xl items-center justify-center px-6 py-20">

                <h1 className="text-4xl font-bold">
                    Visitor Home
                </h1>

            </main>

        </div>
    );
};
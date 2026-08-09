import { Header } from "../../components/visitor/Header";
import { VisitorPass as VisitorPassComponent } from "../../components/visitor/VisitorPass";
import { Footer } from "../../components/visitor/footer";


export const VisitorPass = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-100">

            <Header />

            <main className="px-6 py-12">
                <VisitorPassComponent />
            </main>

            <Footer />
        </div>
    );
};
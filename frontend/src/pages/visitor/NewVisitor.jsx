import { Header } from "../../components/visitor/Header";
import { VisitorForm } from "../../components/visitor/VisitorForm";
import { Footer } from "../../components/visitor/footer";


export const NewVisitor = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-100">

            <Header />

            <main className="px-6 py-12">
                <VisitorForm />
            </main>

            <Footer />
        </div>
    );
};
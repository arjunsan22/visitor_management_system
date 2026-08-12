import { Header } from "../../components/visitor/Header";
import { VisitorDetailsComponents } from "../../components/security/VisitorDetailsComponents";
import { Footer } from "../../components/visitor/footer";


export const VisitorDetails = () => {

  return (
    <div className="flex flex-col min-h-screen bbg-slate-100">

      <Header />

      <main className="flex flex-1 w-full items-center justify-center px-4 sm:px-6 py-12">
        <VisitorDetailsComponents />
      </main>

      <Footer />

    </div>
  );

};
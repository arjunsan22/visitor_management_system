import { Header } from "../../components/visitor/Header";
import { VisitorsComponent } from "../../components/admin/VisitorsComponent";
import { Sidebar } from "../../components/admin/Sidebar";

export const Visitors = () => {
     return (
          <div className="flex flex-col h-screen bg-[#0A0E1A]">
            <Header />
            <div className="flex flex-1 w-full overflow-hidden min-h-0">
              <Sidebar />
              <main className="flex flex-1 min-w-0 w-full items-start justify-center px-4 sm:px-6 py-8 md:py-12 pb-24 md:pb-12 overflow-y-auto">
                <VisitorsComponent />
              </main>
            </div>
          </div>
        );
};

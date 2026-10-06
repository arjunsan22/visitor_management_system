import { Header } from "../../components/visitor/Header";
import { DashboardComponent } from "../../components/admin/DashboardComponent";
import { Sidebar } from "../../components/admin/Sidebar";

export const Dashboard = () => {
   return (
      <div className="flex flex-col h-screen bg-[#0A0E1A]">
        <Header />
        <div className="flex flex-1 w-full overflow-hidden min-h-0">
          <Sidebar />
          <main className="flex flex-1 w-full items-start justify-center px-4 sm:px-6 py-8 md:py-12 pb-24 md:pb-12 overflow-y-auto">
            <DashboardComponent />
          </main>
        </div>
      </div>
    );
};

import React from 'react';
import { Header } from "../../components/visitor/Header";
import { Footer } from "../../components/visitor/footer";
import { Sidebar } from "../../components/admin/Sidebar";

export const SecurityManagement = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0E1A]">
      <Header />
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 w-full items-start justify-center px-4 sm:px-6 py-8 md:py-12 pb-24 md:pb-12 overflow-y-auto">
          {/* Temporary content until SecurityManagementComponent is built */}
          <div className="text-white">Security Management (Coming Soon)</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};


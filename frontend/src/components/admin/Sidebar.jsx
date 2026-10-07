import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: "Visitors",
      path: "/admin/visitors",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: "Security",
      path: "/admin/security",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');
        .sidebar-font-display { font-family: 'Space Grotesk', sans-serif; }
        
        .sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
      
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex flex-col border-r border-white/10 bg-[#0A0E1A] h-full sticky top-0 shrink-0 transition-all duration-300 ease-in-out relative ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-gray-600 bg-[#10162A] text-gray-400 hover:text-white hover:bg-white/10 hover:border-gray-400 transition-all z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <svg 
            className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex flex-col gap-2 p-4 pt-6 sticky top-24 sidebar-scroll overflow-y-auto overflow-x-hidden h-full">
          
          <div className={`px-2 mb-2 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden mb-0'}`}>
            <h3 className="sidebar-font-display text-xs font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">
              Menu
            </h3>
          </div>
          
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={!isExpanded ? item.name : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-[#C9A227]/10 text-[#D9B84A] border border-[#C9A227]/25 shadow-[0_0_20px_rgba(201,162,39,0.08)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                } ${isExpanded ? "px-4 py-3.5 gap-3.5" : "px-0 py-3.5 justify-center"}`
              }
            >
              {item.icon}
              
              <span 
                className={`sidebar-font-display text-[15px] font-medium tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'w-auto opacity-100 max-w-[150px]' : 'w-0 opacity-0 max-w-0'
                }`}
              >
                {item.name}
              </span>
              
              {isExpanded && (
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0A0E1A]/95 backdrop-blur-xl">
        <div className="flex justify-around items-center p-2 pb-[env(safe-area-inset-bottom,0.5rem)]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-xl min-w-[72px] transition-all duration-200 ${
                  isActive
                    ? "text-[#D9B84A]"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-[#C9A227]/15" : ""}`}>
                    {item.icon}
                  </div>
                  <span className="sidebar-font-display text-[11px] font-medium tracking-wide">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};
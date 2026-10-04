import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { LogoutButton } from "../common/LogoutButton";

export const Header = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isSpecialUser = user && (user.role === 'admin' || user.role === 'security');
    const initials = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-[#0A0E2B] shadow-md sm:bg-white transition-colors duration-300">
            <div className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">

                {/* Left Side: Logos & VMS Title */}
                <div className="flex items-center gap-3 sm:gap-5">

                    {/* Mobile View: VMS Logo (vms-logo.png) comes BEFORE the NIT Logo */}
                    {/* <img
                        src="/vms-logo.png"
                        alt="VMS Logo"
                        className="h-8 w-auto object-contain sm:hidden"
                    /> */}

                    {/* Mobile NIT Logo */}
                    <img
                        src="/white-nitc-logo.png"
                        alt="NIT Calicut"
                        className="h-14 w-auto object-contain sm:hidden"
                    />

                    {/* Desktop NIT Logo */}
                    <img
                        src="/nitc-logo.png"
                        alt="NIT Calicut"
                        className="hidden w-auto object-contain sm:block sm:h-14 md:h-16"
                    />

                </div>

{/* Right Side: User Menu for Admin & Security */}
                {isSpecialUser && (
                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                            className="group flex items-center gap-3  px-3 py-2  transition-all hover:bg-slate-400 rounded-md"
                        >
                            {/* Avatar */}
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-indigo-600 font-mono text-xs font-semibold text-white">
                                {initials}
                            </div>

                            {/* User Info */}
                            <div className="hidden flex-col items-start text-left sm:flex max-w-[150px]">
                                <span className="w-full truncate text-xxs font-medium tracking-wide text-black-600">
                                    {user.name}
                                </span>
                                <span className="text-[10px] font-mono tracking-wider text-black-800 uppercase">
                                    {user.role}
                                </span>
                            </div>

                            {/* Arrow */}
                            <svg 
                                className={`ml-1 h-3.5 w-3.5 shrink-0 text-sky-800 transition-transform duration-200 group-hover:text-slate-200 ${isMenuOpen ? 'rotate-180' : ''}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-1 w-72 bg-slate-900 border border-slate-700/80 text-slate-100 py-1 shadow-xl">
                                <div className="border-b border-slate-800 px-4 py-3 sm:hidden">
                                    <p className="truncate text-xs font-semibold text-slate-200">{user.name}</p>
                                    <p className="mt-0.5 text-[10px] font-mono tracking-wider text-indigo-400 uppercase">{user.role}</p>
                                </div>
                                <div className="px-4 py-3 bg-slate-950/40 border-b border-slate-800/60">
                                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Account Access</p>
                                    <p className="mt-1 truncate text-xs font-medium text-slate-200">{user.email}</p>
                                </div>
                                <div className="flex items-center justify-end px-4 py-2.5">
                                    <LogoutButton />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

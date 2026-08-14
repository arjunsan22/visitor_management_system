import { useAuth } from "../../context/AuthContext";

export const LogoutButton = () => {

    const { logoutUser } = useAuth();

    const handleLogout = async () => {
        await logoutUser();
    };

    return (
        <button 
            onClick={handleLogout}
            className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C6933A]/30 bg-[#C6933A]/10 text-[#C6933A] transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 sm:w-auto sm:px-3 sm:gap-2"            title="Logout"
        >
            <svg className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden font-tag text-[10px] font-medium uppercase tracking-widest sm:block">Logout</span>
        </button>
    );
};
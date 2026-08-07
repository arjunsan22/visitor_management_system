export const Footer = () => {
    return (
        <footer className="relative w-full bg-[#070A1B] border-t border-white/[0.08] px-4 py-8 sm:px-6 lg:px-8 mt-auto">
            
            {/* Background Subtle Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-40 w-3/4 max-w-4xl rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

                {/* Left Side: Big White NITC Logo */}
                <div className="flex items-center md:w-1/3 justify-center md:justify-start">
                    <img
                        src="/white-nitc-logo.png"
                        alt="NIT Calicut"
                        className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                    />
                </div>

                {/* Center: Copyright & Developer Info */}
                <div className="flex flex-col items-center md:w-1/3 md:items-center gap-1 text-xs sm:text-sm text-gray-400">
                    <p className="whitespace-nowrap">
                        &copy; {new Date().getFullYear()} Visitor Management System.
                    </p>
                    <p className="font-medium text-gray-300 tracking-wide">
                        Designed and Developed by <span className="text-blue-200 font-semibold">Arj</span>
                    </p>
                </div>

                {/* Empty div for balancing space on the right in desktop view */}
                <div className="hidden md:block md:w-1/3"></div>

            </div>
        </footer>
    );
};
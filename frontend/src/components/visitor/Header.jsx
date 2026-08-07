export const Header = () => {
    return (
        <header className="w-full border-b border-gray-200 bg-[#0A0E2B] shadow-sm sm:bg-white transition-colors duration-300">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-4">

                <div className="flex items-center gap-3 sm:gap-4">
                    <img
                        src="/white-nitc-logo.png"
                        alt="NIT Calicut"
                        className="h-12 w-auto object-contain sm:hidden"
                    />

                    <img
                        src="/nitc-logo.png"
                        alt="NIT Calicut"
                        className="hidden w-auto object-contain sm:block sm:h-16 md:h-24"
                    />

                </div>

            </div>
        </header>
    );
};
export const Header = () => {
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

            </div>
        </header>
    );
};
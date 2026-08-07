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

                    <div className="hidden sm:block h-8 w-[1px] bg-gray-300"></div>
                    <div className="flex flex-col text-left">
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                            <h1 className="hidden sm:inline text-sm font-bold  text-white sm:text-xl md:text-2xl sm:text-gray-900 font-nagaiya uppercase">
                                Visitor Management System - work in progress
                            </h1>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
};
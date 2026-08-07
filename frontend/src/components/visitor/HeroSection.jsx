import { Link } from "react-router-dom";

export const HeroSection = () => {
    return (
        <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#070A1B] px-4 py-16 sm:px-6 lg:px-12">
            
            {/* Background Sophisticated Glow & Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d12_1px,transparent_1px),linear-gradient(to_bottom,#1f293d12_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-cyan-500/10 blur-[120px] pointer-events-none"></div>

            {/* Main Wrapper: Mobile retains single-column max-w-xl, Desktop expands to a 2-column split grid */}
            <div className="relative z-10 w-full max-w-xl lg:max-w-5xl rounded-[2.1rem] bg-[#0F1535]/80 backdrop-blur-2xl border border-white/[0.08] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:p-12 lg:p-14 transition-all">

                <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 lg:items-center">

                    {/* LEFT COLUMN ON DESKTOP: Text & Optional Campus Illustration/Badge area */}
                    <div className="lg:col-span-6 text-center lg:text-left flex flex-col justify-center">
                        
                        {/* Top Elite Badge */}
                        <div className="flex justify-center lg:justify-start mb-6">
                            <div className="inline-flex items-center gap-2.5 rounded-full bg-blue-500/[0.08] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-blue-400 border border-blue-500/20 shadow-inner">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                Official Campus Gateway
                            </div>
                        </div>

                        {/* Header Text */}
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                Visitor Portal
                            </h2>
                            <p className="mt-4 text-sm text-gray-400 sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                                Streamlined access clearance and secure credential processing for NIT Calicut visitors.
                            </p>
                        </div>

                        {/* Optional Desktop Visual / Campus Accent Graphic */}
                        <div className="hidden lg:mt-8 lg:flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <span className="block text-sm font-semibold text-gray-200">NIT Calicut Secure Zone</span>
                                <span className="text-xs text-gray-400">Fast digital verification for all guests & delegates.</span>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN ON DESKTOP (and stacked below on mobile): Action Buttons & Footer Support */}
                    <div className="lg:col-span-6 mt-10 lg:mt-0 flex flex-col justify-center">

                        {/* Action Buttons Section */}
                        <div className="flex flex-col gap-4">

                            {/* Primary Action Button: New Visitor */}
                            <Link
                                to="/visitor/new"
                                className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-px font-semibold shadow-xl transition-all duration-300 hover:shadow-blue-500/25 active:scale-[0.98]"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full"></span>
                                
                                <div className="flex w-full items-center justify-between rounded-[15px] bg-[#0A0E2B]/40 px-6 py-4 backdrop-blur-md transition-colors duration-300 group-hover:bg-transparent">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-transform duration-300 group-hover:scale-110">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-base font-bold text-white tracking-wide">New Visitor</span>
                                            <span className="hidden sm:block text-xs text-gray-300 font-normal">Fast entry permit application</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-blue-900">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>

                            {/* Secondary Action Button: Show Pass */}
                            <button
                                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-300 transition-colors group-hover:text-blue-400 group-hover:bg-blue-500/10">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <span className="block text-base font-semibold text-gray-200 tracking-wide group-hover:text-white">Show Pass</span>
                                        <span className="hidden sm:block text-xs text-gray-400 font-normal">Retrieve active digital entry pass</span>
                                    </div>
                                </div>

                                <div className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>

                        </div>

                        {/* Footer Security Note inside card */}
                        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                            <div className="flex items-center gap-2.5">
                                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                <span className="text-xs font-medium text-gray-300">System Online & Active</span>
                            </div>
                            <div className="text-xs text-gray-400">
                                Having trouble? <a href="#support" className="text-blue-400 hover:text-blue-300 underline transition-colors">Get Help</a>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};
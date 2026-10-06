import { Link } from "react-router-dom";
import {AccessPassCard} from "../common/AccessPassCard"

/* Dark navy background with a faint grid (same as the login page) */
const gridBackground = {
    backgroundColor: "#0a0e17",
    backgroundImage: [
        "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
        "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px)",
        "linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
    ].join(", "),
    backgroundSize: "100% 100%, 48px 48px, 48px 48px",
};

export const HeroSection = () => {

    return (
        <section
            style={gridBackground}
            className="relative flex flex-1 overflow-hidden text-white"
        >
            <div className="grid w-full lg:min-h-[clamp(34rem,70vh,52rem)] lg:grid-cols-2">

                {/* ---------------- Image panel (top banner on mobile, right side on desktop) ---------------- */}
                <div className="relative order-first h-56 sm:h-72 md:h-80 lg:order-last lg:h-auto">
                    <img
                        src="/hero1.jpg"
                        alt="NIT Calicut campus"
                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                    />
                    {/* fade into the navy background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/10 to-transparent" />
                    <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0a0e17] via-transparent to-transparent lg:block" />

                    {/* Floating access-pass card (desktop only) */}
                        {/* <AccessPassCard/> */}
                </div>

                {/* ---------------- Content ---------------- */}
                <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
                    <div className="mx-auto w-full max-w-md lg:mx-0">



                        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                            Visitor Portal
                        </h1>

                        <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
                            Get your campus entry pass in a few steps. Register as a new visitor and your pass will be sent to your email.
                        </p>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3">

                            <Link
                                to="/visitor/new"
                                className="group flex items-center justify-between gap-4 rounded-lg bg-white px-5 py-4 text-black transition hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e17]"
                            >
                                <span className="flex items-center gap-3">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    <span className="text-sm font-semibold">New visitor</span>
                                </span>
                                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>

                        </div>

                        {/* Security guard link */}
                        <div className="mt-8 flex items-center gap-4 text-xs text-neutral-500">
                            <span className="h-px flex-1 bg-white/10" />
                            <span>
                                Are you a security guard?{' '}
                                <Link
                                    to="/login"
                                    className="font-semibold text-white hover:underline focus:outline-none focus-visible:underline"
                                >
                                    Click here
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

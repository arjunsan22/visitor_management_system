import { useState, useEffect } from "react";
import { getVisitorPass } from '../../api/visitor/visitorApi';
import { validateVisitorPass } from '../../utils/passValidation';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();
    const [visitorPass, setVisitorPass] = useState(null);
    
    useEffect(() => {

        const token = localStorage.getItem(
            "visitorPassToken"
        );

        if (!token) {
            return;
        }

        const fetchVisitorPass = async () => {

            try {

                const data = await getVisitorPass(token);

                setVisitorPass(data.data);

            } catch (error) {

                console.error(
                    "Failed to fetch visitor pass:",
                    error
                );

                setVisitorPass(null);
            }

        };

        fetchVisitorPass();

    }, []);

    const canShowPass = validateVisitorPass(visitorPass);

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
                            Get your campus entry pass in a few steps. Register as a new visitor and show your pass at the gate.
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

                            {canShowPass && (
                                <button
                                    onClick={() => {
                                        const token = localStorage.getItem("visitorPassToken");
                                        if (token) {
                                            navigate(`/pass/${token}`);
                                        }
                                    }}
                                    className="group flex items-center justify-between gap-4 rounded-lg border border-emerald-500/40 bg-emerald-500/[0.06] px-5 py-4 text-left transition hover:border-emerald-400/60 hover:bg-emerald-500/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 cursor-pointer"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="relative flex h-5 w-5 items-center justify-center text-emerald-400">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                            </svg>
                                            <span className="absolute -right-1 -top-1 flex h-2 w-2">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                            </span>
                                        </span>
                                        <span>
                                            <span className="block text-sm font-semibold text-emerald-100">Show pass</span>
                                            <span className="block text-xs text-emerald-300/70">Your active pass is ready</span>
                                        </span>
                                    </span>
                                    <svg className="h-4 w-4 text-emerald-400/70 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
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
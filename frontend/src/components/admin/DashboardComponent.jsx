import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getDashboardStats } from "../../api/admin/adminApi";

export const DashboardComponent = () => {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const data = await getDashboardStats();



                setStats(data.data);


            } catch (error) {

                console.error("Failed to fetch dashboard stats:", error);

            }

        };

        fetchStats();

    }, []);

    /* ---- Presentation only: refs for GSAP entrance + count-up animation ---- */
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const numberRefs = useRef({
        totalVisitors: null,
        pendingVisitors: null,
        verifiedVisitors: null,
        checkedOutVisitors: null,
    });

    cardRefs.current = [];
    const registerCard = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    useEffect(() => {

        if (!stats) return;

        const ctx = gsap.context(() => {

            // Staggered entrance for the stat cards
            gsap.fromTo(
                cardRefs.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.12,
                }
            );

            // Count-up animation for each metric
            const metrics = [
                "totalVisitors",
                "pendingVisitors",
                "verifiedVisitors",
                "checkedOutVisitors",
            ];

            metrics.forEach((key) => {

                const target = Number(stats[key]) || 0;
                const el = numberRefs.current[key];
                const counter = { value: 0 };

                if (!el) return;

                gsap.to(counter, {
                    value: target,
                    duration: 1.4,
                    ease: "power2.out",
                    onUpdate: () => {
                        el.textContent = Math.round(counter.value).toLocaleString();
                    },
                });

            });

        }, containerRef);

        return () => ctx.revert();

    }, [stats]);

    const metricCards = [
        {
            key: "totalVisitors",
            label: "Total Visitors",
            icon: (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-3.13a4 4 0 100-8 4 4 0 000 8zm6 1a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
            ),
            accent: "text-[#D9B84A]",
            border: "border-[#C9A227]/25",
            bg: "bg-[#C9A227]/10",
        },
        {
            key: "pendingVisitors",
            label: "Pending",
            icon: (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            accent: "text-amber-300",
            border: "border-amber-400/25",
            bg: "bg-amber-400/10",
        },
        {
            key: "verifiedVisitors",
            label: "Verified",
            icon: (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12.75l2.25 2.25 6-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            accent: "text-emerald-300",
            border: "border-emerald-400/25",
            bg: "bg-emerald-400/10",
        },
        {
            key: "checkedOutVisitors",
            label: "Checked Out",
            icon: (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M17 16l4-4m0 0l-4-4m4 4H7m6 6v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
            ),
            accent: "text-sky-300",
            border: "border-sky-400/25",
            bg: "bg-sky-400/10",
        },
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0E1A] px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:pt-16">

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
                .font-display { font-family: 'Space Grotesk', sans-serif; }
                .font-tag { font-family: 'JetBrains Mono', monospace; }
                .hazard-strip {
                    background-image: repeating-linear-gradient(135deg, #C9A227 0 10px, transparent 10px 20px);
                    opacity: 0.45;
                }
                .corner-mark { position: relative; }
                .corner-mark::before, .corner-mark::after {
                    content: ''; position: absolute; width: 12px; height: 12px; pointer-events: none;
                    border-color: #C9A227; opacity: 0.7;
                }
                .corner-mark::before { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
                .corner-mark::after { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }
                @keyframes pulse-soft { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.9; } }
                .skeleton-pulse { animation: pulse-soft 1.5s ease-in-out infinite; }
            `}</style>

            <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_50%,transparent_100%)]"></div>

            <div ref={containerRef} className="relative z-10 mx-auto w-full max-w-6xl">

                {/* Header */}
                <div className="mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 font-tag text-[10px] tracking-widest text-[#D9B84A] uppercase sm:text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D9B84A] animate-pulse"></span>
                        NIT Calicut · Admin Console
                    </div>

                    <h1 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl lg:text-[2.25rem]">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Live overview of campus visitor activity
                    </p>
                </div>

                {/* Stat cards */}
                {!stats ? (

                    // Skeleton loading state
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="skeleton-pulse rounded-2xl border border-white/[0.07] bg-[#10162A] px-5 py-6"
                            >
                                <div className="h-10 w-10 rounded-xl bg-white/[0.05]"></div>
                                <div className="mt-6 h-7 w-16 rounded bg-white/[0.06]"></div>
                                <div className="mt-2 h-3 w-24 rounded bg-white/[0.04]"></div>
                            </div>
                        ))}
                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                        {metricCards.map((card) => (
                            <div
                                key={card.key}
                                ref={registerCard}
                                className="corner-mark overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10162A] px-5 py-6 shadow-[0_15px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1 sm:px-6"
                            >
                                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${card.border} ${card.bg} ${card.accent} sm:h-12 sm:w-12`}>
                                    {card.icon}
                                </div>

                                <div className="mt-5 flex items-baseline gap-1">
                                    <span
                                        ref={(el) => (numberRefs.current[card.key] = el)}
                                        className="font-display text-3xl font-semibold text-white sm:text-4xl"
                                    >
                                        0
                                    </span>
                                </div>

                                <p className="mt-1.5 font-tag text-[10px] tracking-widest text-gray-500 uppercase sm:text-[11px]">
                                    {card.label}
                                </p>
                            </div>
                        ))}
                    </div>

                )}

                {/* Footer note */}
                <div className="mt-10 flex items-center justify-center gap-2 text-center">
                    <p className="font-tag text-[10px] tracking-widest text-gray-600 uppercase sm:text-[11px]">
                        Statistics refresh on page load
                    </p>
                </div>

            </div>

        </div>
    );
};
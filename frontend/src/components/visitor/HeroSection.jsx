import { useState, useEffect } from "react";
import { getVisitorPass } from '../../api/visitor/visitorApi'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    // Logic to check if the pass is still valid based on check_out_at time
    let isPassValid = true;

    if (visitorPass) {
        if (visitorPass.check_out_at) {
            const now = new Date();
            
            // check_out_at is "HH:MM". We split it to compare with current time.
            const [checkoutHours, checkoutMinutes] = visitorPass.check_out_at.split(':').map(Number);
            
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();

            // If the current time has passed the checkout time
            if (currentHours > checkoutHours || (currentHours === checkoutHours && currentMinutes >= checkoutMinutes)) {
                isPassValid = false;
            }

            // Also check if the visit_date is in the past (to prevent yesterday's pass from showing today before the checkout time)
            if (visitorPass.visit_date) {
                const visitDate = new Date(visitorPass.visit_date);
                const today = new Date();
                
                // Reset times to compare purely by date
                today.setHours(0, 0, 0, 0);
                visitDate.setHours(0, 0, 0, 0);
                
                if (today.getTime() > visitDate.getTime()) {
                    isPassValid = false;
                }
            }
        }
    }

    const canShowPass = visitorPass && isPassValid;

    return (
        <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#0A0E1A] px-4 py-16 sm:px-6 lg:px-12">

            {/* Fonts + custom institutional utilities (perforation, hazard strip, corner stamps) */}
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

                .ticket-notch {
                    position: absolute; width: 18px; height: 18px; border-radius: 9999px;
                    background: #0A0E1A;
                }

                @keyframes fade-up-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .fade-in-1 { animation: fade-up-in 0.5s ease-out 0.05s both; }
                .fade-in-2 { animation: fade-up-in 0.5s ease-out 0.15s both; }
                .fade-in-3 { animation: fade-up-in 0.5s ease-out 0.25s both; }
                .fade-in-4 { animation: fade-up-in 0.5s ease-out 0.35s both; }
                @media (prefers-reduced-motion: reduce) {
                    .fade-in-1, .fade-in-2, .fade-in-3, .fade-in-4 { animation: none; }
                }
            `}</style>

            {/* Hazard strip — top edge of section, references the campus boom-gate/checkpoint */}
            <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>

            {/* Faint structural grid, no colour blobs */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)]"></div>

            <div className="relative z-10 w-full max-w-xl lg:max-w-6xl rounded-2xl bg-[#10162A] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.45)]">

                {/* Header meta bar — terminal / registry strip */}
                <div className="fade-in-1 flex items-center justify-between gap-4 border-b border-white/[0.07] px-6 py-3.5 sm:px-8 lg:px-10">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#D9B84A]">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" />
                            </svg>
                        </div>
                        <span className="font-tag text-[11px] tracking-widest text-gray-400 uppercase">NIT Calicut · Campus Access Registry</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 font-tag text-[10px] tracking-widest text-emerald-400/90 uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Sys Online
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">

                    {/* LEFT: Heading, copy, actions */}
                    <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">

                        <h2 className="fade-in-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                            Visitor Portal
                            <span className="block h-[3px] w-14 bg-[#C9A227] mt-4 mx-auto lg:mx-0 rounded-full"></span>
                        </h2>

                        <p className="fade-in-2 mt-5 text-sm text-gray-400 sm:text-base lg:text-[1.05rem] leading-relaxed max-w-md mx-auto lg:mx-0">
                            Streamlined access clearance and secure credential processing for NIT Calicut visitors.
                        </p>

                        {/* Actions */}
                        <div className="mt-9 flex flex-col gap-3.5 max-w-md mx-auto lg:mx-0 w-full">

                            <Link
                                to="/visitor/new"
                                className="corner-mark group flex items-center justify-between gap-4 border-l-2 border-[#C9A227] bg-white/[0.03] px-5 py-4 transition-colors duration-200 hover:bg-white/[0.06]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#C9A227]/10 border border-[#C9A227]/25 text-[#D9B84A]">
                                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <span className="font-tag block text-[10px] tracking-widest text-[#D9B84A] uppercase">Primary Action</span>
                                        <span className="block text-base font-semibold text-white mt-0.5">New Visitor</span>
                                    </div>
                                </div>
                                <svg className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#D9B84A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                    className="corner-mark group flex items-center justify-between gap-4 border-l-2 border-emerald-500/70 bg-emerald-500/[0.03] px-5 py-4 transition-all duration-300 hover:bg-emerald-500/[0.08]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 transition-all group-hover:scale-105 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                                            <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                            </span>
                                            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <span className="font-tag block text-[10px] tracking-widest text-emerald-500/80 uppercase">Active Pass</span>
                                            <span className="block text-base font-semibold text-emerald-100 mt-0.5 group-hover:text-emerald-50 transition-colors">Show Pass</span>
                                        </div>
                                    </div>
                                    <svg className="h-4 w-4 text-emerald-500/50 transition-all duration-200 group-hover:translate-x-1 group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Signature element — a real gate-pass ticket, desktop only */}
                    <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
                        <div className="fade-in-4 relative w-[300px] rotate-[3deg] bg-[#141B31] border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">

                            {/* Stub */}
                            <div className="px-6 pt-5 pb-6">
                                <div className="flex items-center justify-between">
                                    <span className="font-tag text-[10px] tracking-widest text-[#D9B84A] uppercase">Access Pass</span>
                                    <span className="font-tag text-[9px] tracking-widest text-emerald-400 uppercase border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 rounded-sm">Approved</span>
                                </div>
                                <div className="mt-4 font-display text-lg font-semibold text-white">Campus Gateway</div>
                                <div className="mt-1 text-xs text-gray-500">National Institute of Technology, Calicut</div>
                            </div>

                            {/* Perforated tear line */}
                            <div className="relative border-t border-dashed border-white/15">
                                <span className="ticket-notch -left-[9px] -top-[9px]"></span>
                                <span className="ticket-notch -right-[9px] -top-[9px]"></span>
                            </div>

                            {/* Barcode + ID */}
                            <div className="px-6 pt-5 pb-6">
                                <div className="flex items-end gap-[3px] h-9 opacity-80">
                                    {[6, 3, 5, 2, 7, 4, 3, 6, 2, 5, 3, 7, 4, 2, 6, 3, 5, 2].map((h, i) => (
                                        <span key={i} className="w-[3px] bg-gray-400/60" style={{ height: `${h * 4}px` }}></span>
                                    ))}
                                </div>
                                <div className="mt-3 flex items-center justify-between font-tag text-[10px] tracking-widest text-gray-500 uppercase">
                                    <span>ID · CLT-0000</span>
                                    <span>Valid · Single Entry</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer strip */}
                <div className="fade-in-1 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.07] px-6 py-4 sm:px-8 lg:px-10 text-center sm:text-left">
                    <span className="font-tag text-[10px] tracking-widest text-gray-500 uppercase">Est. Security Checkpoint · Main Gate</span>
                    <span className="text-xs text-gray-500">
                        Having trouble? <a href="#support" className="text-[#D9B84A] hover:text-[#e8c869] underline transition-colors">Get Help</a>
                    </span>
                </div>
            </div>
        </section>
    );
};
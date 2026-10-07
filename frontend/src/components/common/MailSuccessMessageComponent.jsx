import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const MailSuccessMessageComponent = ({ onReset }) => {
    const containerRef = useRef(null);
    const elementsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger fade-in and slide-up for content elements
            gsap.fromTo(
                elementsRef.current,
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out",
                    delay: 0.1
                }
            );

            // Pop animation for the tick circle
            gsap.fromTo(
                ".tick-circle",
                { scale: 0.4, opacity: 0, rotation: -45 },
                { 
                    scale: 1, 
                    opacity: 1, 
                    rotation: 0, 
                    duration: 0.7, 
                    ease: "back.out(1.7)",
                }
            );
            
            // Soft pulse for the glow background
            gsap.to(".bg-glow", {
                opacity: 0.5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
        }
    };

    return (
        <div ref={containerRef} className="relative z-10 w-full max-w-lg rounded-2xl bg-[#10162A] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.6)] px-6 py-10 sm:px-10 text-center overflow-hidden">
            
            {/* Subtle background glow for professional look */}
            <div className="bg-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_60%)] opacity-30"></div>

            <div 
                className="tick-circle relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 shadow-[0_0_20px_rgba(52,211,153,0.15)] backdrop-blur-sm"
            >
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h2 ref={addToRefs} className="font-display mt-6 text-2xl font-semibold text-white tracking-wide">
                Visitor Pass Created
            </h2>

            <div ref={addToRefs} className="mt-5 space-y-3">
                <p className="text-[15px] leading-relaxed text-gray-300">
                    Your visitor pass has been securely generated and sent to your email.
                </p>
                <p className="text-sm text-gray-400">
                    Please check your inbox for the <span className="text-gray-200 font-medium">QR code</span> and pass details.
                </p>
                <div className="mt-3 text-xs text-gray-400 rounded-lg bg-white/[0.02] p-3 border border-white/[0.03]">
                    Present the QR code or pass token at the security gate upon arrival.
                </div>
            </div>

            <div ref={addToRefs} className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-[#C9A227]/20 bg-[#C9A227]/[0.06] px-4 py-2.5 shadow-[0_0_15px_rgba(201,162,39,0.03)] backdrop-blur-sm transition-colors hover:bg-[#C9A227]/[0.09]">
                <svg className="h-4.5 w-4.5 text-[#D9B84A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-tag text-[10.5px] tracking-widest text-[#D9B84A] uppercase font-semibold">
                    Check your inbox
                </span>
            </div>

            <div ref={addToRefs} className="mt-9 pt-7 border-t border-white/[0.06]">
                <button
                    onClick={onReset}
                    className="corner-mark group w-full sm:w-auto inline-flex items-center justify-center gap-3 border-l-2 border-[#C9A227] bg-white/[0.03] px-8 py-3.5 transition-all duration-300 hover:bg-white/[0.07] hover:shadow-[0_0_20px_rgba(201,162,39,0.08)] cursor-pointer"
                >
                    <span className="font-display text-sm font-semibold text-white tracking-wider">
                        Register Another Visitor
                    </span>
                    <svg className="h-4 w-4 text-[#D9B84A] transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

        </div>
    );
};


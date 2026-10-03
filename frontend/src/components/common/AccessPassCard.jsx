import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Floating access-pass card for the HeroSection image panel (desktop only).
 * Drop-in replacement for the old
 *   <div className="absolute inset-x-0 bottom-0 hidden p-8 lg:block xl:p-10"> ... </div>
 *
 * Needs:  npm i gsap
 */

const BARS = [6, 3, 5, 2, 7, 4, 3, 6, 2, 5, 3, 7, 4, 2, 6, 3, 5, 2, 6, 4, 3, 5];

export const AccessPassCard = () => {
    const rootRef = useRef(null);   // entrance (fade / rise)
    const floatRef = useRef(null);  // idle floating
    const cardRef = useRef(null);   // 3D tilt
    const glareRef = useRef(null);  // cursor glare
    const scanRef = useRef(null);   // scanner line

    useEffect(() => {
        const q = gsap.utils.selector(rootRef);
        const mm = gsap.matchMedia();

        // Everything below is skipped when the user prefers reduced motion
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const card = cardRef.current;

            /* ---------- entrance ---------- */
            gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 })
                .from(rootRef.current, { opacity: 0, y: 48, scale: 0.94, duration: 0.9 })
                .from(q(".pass-item"), { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, "-=0.5")
                .from(q(".pass-badge"), { scale: 0, rotate: -12, duration: 0.5, ease: "back.out(2.5)" }, "-=0.3")
                .from(q(".pass-check"), { strokeDashoffset: 1, duration: 0.45, ease: "power2.out" }, "-=0.2")
                .from(
                    q(".pass-bar"),
                    { scaleY: 0, transformOrigin: "bottom", duration: 0.5, stagger: 0.025, ease: "power2.out" },
                    "-=0.4"
                );

            /* ---------- idle motion (starts after the entrance) ---------- */
            gsap.to(floatRef.current, {
                y: -6,
                duration: 2.6,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 1.8,
            });

            gsap.to(q(".pass-bar"), {
                scaleY: () => gsap.utils.random(0.6, 1),
                transformOrigin: "bottom",
                duration: 0.7,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                repeatRefresh: true,
                stagger: { each: 0.06, from: "random" },
                delay: 2.4,
            });

            // scanner line sweeping down the pass
            gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 2.2 })
                .fromTo(scanRef.current, { top: "4%", opacity: 0 }, { opacity: 1, duration: 0.3 })
                .to(scanRef.current, { top: "96%", duration: 1.8, ease: "power1.inOut" }, "<")
                .to(scanRef.current, { opacity: 0, duration: 0.3 }, "-=0.3");

            /* ---------- 3D tilt + glare following the cursor ---------- */
            gsap.set(card, { transformPerspective: 900 });
            const rotX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
            const rotY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });

            const onMove = (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                rotY((px - 0.5) * 14);
                rotX(-(py - 0.5) * 14);
                glareRef.current.style.setProperty("--gx", `${px * 100}%`);
                glareRef.current.style.setProperty("--gy", `${py * 100}%`);
            };
            const onLeave = () => {
                rotX(0);
                rotY(0);
            };

            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);

            return () => {
                card.removeEventListener("mousemove", onMove);
                card.removeEventListener("mouseleave", onLeave);
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <div className="absolute inset-x-0 bottom-0 hidden p-8 lg:block xl:p-10">
            <div ref={rootRef} className="w-full max-w-[22rem]">
                <div ref={floatRef}>
                    {/* gradient hairline border */}
                    <div
                        ref={cardRef}
                        className="group rounded-2xl bg-gradient-to-br from-white/35 via-white/5 to-emerald-400/30 p-px shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-transform"
                    >
                        <div className="relative overflow-hidden rounded-[15px] bg-black/55 p-5 backdrop-blur-xl">

                            {/* cursor glare */}
                            <div
                                ref={glareRef}
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                style={{
                                    background:
                                        "radial-gradient(240px circle at var(--gx, 50%) var(--gy, 0%), rgba(255,255,255,0.14), transparent 60%)",
                                }}
                            />

                            {/* scanner line */}
                            <div
                                ref={scanRef}
                                className="pointer-events-none absolute inset-x-0 top-[4%] h-px bg-emerald-300 opacity-0 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]"
                            />

                            {/* header */}
                            <div className="pass-item flex items-center justify-between">
                                <span className="text-xs font-semibold text-neutral-300">Campus access pass</span>
                                <span className="pass-badge inline-flex items-center gap-1 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path className="pass-check" d="M5 13l4 4L19 7" pathLength="1" strokeDasharray="1" strokeDashoffset="0" />
                                    </svg>
                                    Approved
                                </span>
                            </div>

                            {/* title */}
                            <p className="pass-item mt-4 text-lg font-semibold leading-snug text-white">
                                National Institute of Technology, Calicut
                            </p>

                            {/* tear line */}
                            <div className="pass-item my-4 border-t border-dashed border-white/15" />

                            {/* barcode */}
                            <div className="flex h-9 items-end gap-[3px]" aria-hidden="true">
                                {BARS.map((h, i) => (
                                    <span
                                        key={i}
                                        className="pass-bar w-[3px] rounded-[1px] bg-neutral-200/70"
                                        style={{ height: `${h * 4.5}px` }}
                                    />
                                ))}
                            </div>

                            {/* footer */}
                            <div className="pass-item mt-3 flex items-center justify-between text-[11px] text-neutral-400">
                                <span>ID · CLT-0000</span>
                                <span>Valid · Single entry</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
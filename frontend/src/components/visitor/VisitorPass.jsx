import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

import { getVisitorPass } from "../../api/visitor/visitorApi";

export const VisitorPass = () => {

  const { token } = useParams();

  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Purely presentational: delays the QR reveal so the scanning animation can play first
  const [qrReady, setQrReady] = useState(false);


  useEffect(() => {
    const revealTimer = setTimeout(() => setQrReady(true), 1500);
    return () => clearTimeout(revealTimer);
  }, []);

  useEffect(() => {

    const fetchPass = async () => {

      try {

        const data = await getVisitorPass(token);

        setVisitor(data.data);

      } catch (error) {

        console.error(
          "Failed to fetch visitor pass:",
          error
        );

        setError(
          error.message || "Failed to load visitor pass"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchPass();

  }, [token]);

  /* Shared design-system styles (same tokens as HeroSection / VisitorForm) */
  const GlobalStyles = () => (
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
        position: absolute; width: 20px; height: 20px; border-radius: 9999px;
        background: #0A0E1A;
      }
      @keyframes spin-slow { to { transform: rotate(360deg); } }
      .spin-slow { animation: spin-slow 1s linear infinite; }

      @keyframes scan-line {
        0% { top: 8%; opacity: 0; }
        12% { opacity: 1; }
        88% { opacity: 1; }
        100% { top: 90%; opacity: 0; }
      }
      .scan-line { animation: scan-line 1.6s ease-in-out infinite; }

      @keyframes dot-pulse {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
      .dot-1 { animation: dot-pulse 1.2s ease-in-out infinite; }
      .dot-2 { animation: dot-pulse 1.2s ease-in-out 0.2s infinite; }
      .dot-3 { animation: dot-pulse 1.2s ease-in-out 0.4s infinite; }

      @keyframes bracket-pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      .bracket-pulse { animation: bracket-pulse 1.6s ease-in-out infinite; }
    `}</style>
  );

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0E1A] px-4">
        <GlobalStyles />
        <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
        <div className="flex flex-col items-center gap-4">
          <div className="spin-slow h-9 w-9 rounded-full border-2 border-white/10 border-t-[#C9A227]"></div>
          <span className="font-tag text-xs tracking-widest text-gray-500 uppercase">
            Loading visitor pass...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0E1A] px-4">
        <GlobalStyles />
        <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
        <div className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#10162A] px-6 py-8 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-300">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!visitor) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0E1A] px-4">
        <GlobalStyles />
        <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#10162A] px-6 py-8 text-center">
          <p className="text-sm font-medium text-gray-400">
            Visitor pass not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0E1A] px-4 py-10 sm:py-14">

      <GlobalStyles />

      <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_25%,#000_60%,transparent_100%)]"></div>

      <div className="relative z-10 mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 font-tag text-[10px] tracking-widest text-[#D9B84A] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D9B84A] animate-pulse"></span>
            Digital Access Pass
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Keep this pass available during your visit
          </p>
        </div>

        {/* Pass Card */}
        <div className="overflow-hidden rounded-2xl bg-[#10162A] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.45)]">

          {/* Card Header */}
          <div className="corner-mark bg-[#141B31] px-6 py-5 text-white border-b border-white/[0.06]">

            <div className="flex items-center justify-between">

              <div>
                <p className="font-tag text-[10px] uppercase tracking-widest text-gray-500">
                  Visitor
                </p>

                <h2 className="mt-1.5 font-display text-xl font-semibold text-white">
                  {visitor.name}
                </h2>
              </div>

              <div className="rounded-sm border border-[#C9A227]/30 bg-[#C9A227]/10 px-3 py-1">
                <span className="font-tag text-[10px] font-medium tracking-widest text-[#D9B84A] uppercase">
                  PASS
                </span>
              </div>

            </div>

          </div>

          {/* Details */}
          <div className="space-y-5 px-6 py-6">

            <div>
              <p className="font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                Purpose
              </p>

              <p className="mt-1.5 text-sm font-medium text-gray-200">
                {visitor.purpose}
              </p>
            </div>

            <div>
              <p className="font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                Person to Visit
              </p>

              <p className="mt-1.5 text-sm font-medium text-gray-200">
                {visitor.person_to_visit}
              </p>
            </div>

            <div>
              <p className="font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                Department
              </p>

              <p className="mt-1.5 text-sm font-medium text-gray-200">
                {visitor.department}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                  Visit Date
                </p>

                <p className="mt-1.5 text-sm font-medium text-gray-200">
                  {visitor.visit_date}
                </p>
              </div>

              <div>
                <p className="font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                  Check-in
                </p>

                <p className="mt-1.5 text-sm font-medium text-gray-200">
                  {visitor.check_in_time}
                </p>
              </div>

            </div>

            {/* Perforated tear line */}
            <div className="relative border-t border-dashed border-white/15 !mt-6">

            </div>

            {/* QR Code */}
            <div className="pt-1">

              <div className="text-center">

                <p className="font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                  Visitor Pass QR
                </p>

                <div className="mt-4 flex justify-center">
                  <div className="relative h-[212px] w-[212px]">

                    {/* Generating-code animation (shown until qrReady) */}
                    <div
                      className={`absolute inset-0 overflow-hidden rounded-xl border border-[#C9A227]/25 bg-[#0D1224] transition-opacity duration-500 ${qrReady ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                    >
                      {/* corner brackets */}
                      <span className="bracket-pulse absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#C9A227]"></span>
                      <span className="bracket-pulse absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[#C9A227]"></span>
                      <span className="bracket-pulse absolute left-3 bottom-3 h-4 w-4 border-l-2 border-b-2 border-[#C9A227]"></span>
                      <span className="bracket-pulse absolute right-3 bottom-3 h-4 w-4 border-r-2 border-b-2 border-[#C9A227]"></span>

                      {/* faint dot grid */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff14_1px,transparent_1px)] bg-[size:12px_12px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]"></div>

                      {/* moving scan line */}
                      <span className="scan-line absolute inset-x-3 h-[2px] bg-[#D9B84A] shadow-[0_0_8px_2px_rgba(217,184,74,0.6)]"></span>

                      {/* status text */}
                      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-1 font-tag text-[9px] tracking-widest text-[#D9B84A]/80 uppercase">
                        <span>Generating Secure Code</span>
                        <span className="dot-1">.</span>
                        <span className="dot-2">.</span>
                        <span className="dot-3">.</span>
                      </div>
                    </div>

                    {/* QR reveal */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center rounded-xl border border-[#C9A227]/25 bg-white p-4 shadow-[0_0_0_1px_rgba(201,162,39,0.08)] transition-all duration-500 ${qrReady ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                        }`}
                    >
                      <QRCodeSVG
                        value={`${window.location.origin}/pass/${visitor.pass_token}`}
                        size={180}
                        level="H"
                        includeMargin={true}
                      />
                    </div>

                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  Scan this QR code at the security gate
                </p>

              </div>

            </div>

            {/* Status */}
            <div className="border-t border-white/[0.06] pt-5">

              <p className="font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                Current Status
              </p>

              <div className="mt-2.5 inline-flex items-center gap-2 rounded-sm border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9B84A]"></span>
                <span className="font-tag text-xs font-semibold tracking-widest text-[#D9B84A] uppercase">
                  {visitor.status}
                </span>
              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-dashed border-white/10 px-6 py-4 text-center">

            <p className="font-tag text-[10px] tracking-widest text-gray-500 uppercase">
              Please present this pass at the security gate
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};
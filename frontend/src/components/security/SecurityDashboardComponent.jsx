import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SecurityDashboardComponent = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name?.trim()?.charAt(0)?.toUpperCase() || "S";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0E1A] pb-16">

      {/* Shared design-system tokens */}
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

        .diag-hatch {
          background-image: repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 6px, transparent 6px 12px);
        }
      `}</style>

      <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_50%,transparent_100%)]"></div>

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 pt-8 sm:px-6 sm:pt-12 lg:pt-16">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 font-tag text-[10px] tracking-widest text-[#D9B84A] uppercase sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D9B84A] animate-pulse"></span>
            NIT Calicut · Security Desk
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden font-tag text-[10px] tracking-widest text-gray-500 uppercase sm:inline">On Duty</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 font-display text-sm font-semibold text-[#D9B84A]">
              {initials}
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="mt-6 sm:mt-8">
          <h1 className="font-display text-[1.6rem] font-semibold leading-tight text-white sm:text-3xl lg:text-[2.25rem]">
            Welcome back, {user?.name}
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage and verify today's visitors from your checkpoint.
          </p>
        </div>

        {/* Section label */}
        <div className="mt-9 flex items-center gap-3 sm:mt-11">
          <span className="font-tag text-[10px] tracking-widest text-gray-500 uppercase sm:text-[11px]">Quick Actions</span>
          <span className="h-px flex-1 bg-white/[0.07]"></span>
        </div>

        {/* Actions list */}
        <div className="mt-4 flex flex-col gap-3.5">

          {/* Action: Scan Visitor Pass — active */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10162A] shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
            <button
              type="button"
              onClick={() => navigate("/security/scanner")}
              className="corner-mark group flex w-full items-center gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-white/[0.03] sm:px-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#C9A227]/25 bg-[#C9A227]/10 text-[#D9B84A] sm:h-14 sm:w-14">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 7V5a2 2 0 012-2h2M3 17v2a2 2 0 002 2h2m10-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2M7 12h.01M12 12h.01M17 12h.01M7 8h10M7 16h10" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-semibold text-white sm:text-lg">Scan Visitor Pass</span>
                  <span className="rounded-sm border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 font-tag text-[9px] tracking-widest text-emerald-300 uppercase">Active</span>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  Scan a QR code to view visitor details and verify entry.
                </p>
              </div>

              <svg className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#D9B84A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Action: Capture Visitor Photo — disabled, future update */}
          <div
            aria-disabled="true"
            className="diag-hatch overflow-hidden rounded-2xl border border-white/[0.06] bg-[#10162A]/60"
          >
            <div className="flex w-full items-center gap-4 px-5 py-5 sm:px-6 cursor-not-allowed select-none">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-500 sm:h-14 sm:w-14">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 9a2 2 0 012-2h1.5l1-1.5h5l1 1.5H16a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <circle cx="12" cy="13" r="3" strokeWidth="1.6" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-semibold text-gray-400 sm:text-lg">Capture Visitor Photo</span>
                  <span className="rounded-sm border border-[#C9A227]/25 bg-[#C9A227]/10 px-1.5 py-0.5 font-tag text-[9px] tracking-widest text-[#D9B84A]/80 uppercase">Coming Soon</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  Attach a live photo of the visitor to their ID record.
                </p>
              </div>

              <svg className="h-4 w-4 shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2" />
              </svg>
            </div>
          </div>

        </div>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center">
          <p className="font-tag text-[10px] tracking-widest text-gray-600 uppercase sm:text-[11px]">
            All actions are logged for the security registry
          </p>
        </div>

      </div>

    </div>
  );
};
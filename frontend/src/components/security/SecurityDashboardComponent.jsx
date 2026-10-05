import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { LogoutButton } from "../common/LogoutButton";

export const SecurityDashboardComponent = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name?.trim()?.charAt(0)?.toUpperCase() || "S";

  return (
    <div className="relative flex min-h-screen w-full bg-[#0B0D12] text-gray-200 antialiased">

      <style>{`
        @keyframes tile-fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .tile-in-1 { animation: tile-fade-in 0.5s ease-out 0.05s both; }
        .tile-in-2 { animation: tile-fade-in 0.5s ease-out 0.15s both; }
      `}</style>

      {/* Left: content column */}
      <div className="relative flex w-full flex-col lg:w-1/2">

        {/* Soft ambient glow — scoped to the left column only */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.12),transparent_70%)]"></div>



        {/* Main */}
        <main className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-5 pb-16 pt-10 sm:px-6 sm:pt-14">



          {/* Greeting */}
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Welcome back, {user?.name}
          </h1>
          <p className="mt-2 max-w-md text-sm text-gray-500 sm:text-base">
            Manage and verify today's visitors from your checkpoint.
          </p>

          {/* Quick actions */}
          <div className="mt-9 grid grid-cols-1 gap-4 sm:mt-11 md:grid-cols-2 md:gap-5">

            {/* Scan Visitor Pass — active */}
            <button
              type="button"
              onClick={() => navigate("/security/scanner")}
              className="tile-in-1 group relative flex flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.045] hover:shadow-[0_20px_45px_-15px_rgba(99,102,241,0.45)] cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 transition-colors group-hover:bg-indigo-500/25">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 7V5a2 2 0 012-2h2M3 17v2a2 2 0 002 2h2m10-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2M7 12h.01M12 12h.01M17 12h.01M7 8h10M7 16h10" />
                </svg>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white">Scan Visitor Pass</h2>
                <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">Active</span>
              </div>

              <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                Scan a QR code to view visitor details and verify entry.
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-300">
                Launch scanner
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            {/* Capture Visitor Photo — disabled, future update */}
            <div
              aria-disabled="true"
              className="tile-in-2 relative flex cursor-not-allowed select-none flex-col items-start overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 opacity-70"
            >
              <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Soon
              </span>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 9a2 2 0 012-2h1.5l1-1.5h5l1 1.5H16a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <circle cx="12" cy="13" r="3" strokeWidth="1.6" />
                </svg>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-gray-400">Capture Visitor Photo</h2>

              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                Attach a live photo of the visitor to their ID record.
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
                Not yet available
              </span>
            </div>

          </div>

          {/* Footer note */}
          <p className="mt-10 text-center text-xs text-gray-600">
            All actions are logged for the security registry
          </p>

        </main>

      </div>

      {/* Right: full-height banner image panel — desktop only */}
      <div className="relative hidden w-1/2 p-3 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">

          <img
            src="/security-banner1.jpeg"
            alt="NIT Calicut campus gate"
            className="h-full w-full object-cover"
          />

          {/* Gradient overlay for caption legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

          {/* Caption */}
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              NIT Calicut
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              Security Checkpoint Console
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
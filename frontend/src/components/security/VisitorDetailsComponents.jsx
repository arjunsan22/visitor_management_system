import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getVisitorPass, verifyVisitor } from "../../api/visitor/visitorApi.js";

export const VisitorDetailsComponents = () => {

  const { token } = useParams();

  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchVisitor = async () => {

      try {

        const data = await getVisitorPass(token);

        console.log(
          "Security Visitor Data:",
          data
        );

        setVisitor(data.data);

      } catch (error) {

        console.error(
          "Failed to fetch visitor:",
          error
        );

        setError(
          error.message ||
          "Failed to load visitor details"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchVisitor();

  }, [token]);

  const handleVerify = async () => {

    try {

      const data = await verifyVisitor(token);

      console.log(
        "Visitor verified successfully:",
        data
      );

      const updatedData = await getVisitorPass(token);

      setVisitor(updatedData.data);

    } catch (error) {

      console.error(
        "Visitor verification failed:",
        error
      );

    }
  };

  /* Shared design-system styles (same tokens used across the app) */
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
      @keyframes spin-slow { to { transform: rotate(360deg); } }
      .spin-slow { animation: spin-slow 1s linear infinite; }
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
            Loading visitor details...
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
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400">
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
            Visitor not found.
          </p>
        </div>
      </div>
    );
  }

  const isPending = visitor.status === "Pending";
  const isVerified = Boolean(visitor.verified_by_name);
  const isCheckedOut = Boolean(visitor.check_out);

  const statusColor = isPending
    ? { dot: "bg-amber-400", text: "text-amber-300", border: "border-amber-400/30", bg: "bg-amber-400/10" }
    : isVerified
      ? { dot: "bg-emerald-400", text: "text-emerald-300", border: "border-emerald-400/30", bg: "bg-emerald-400/10" }
      : { dot: "bg-[#D9B84A]", text: "text-[#D9B84A]", border: "border-[#C9A227]/30", bg: "bg-[#C9A227]/10" };

  const initials = visitor.name?.trim()?.charAt(0)?.toUpperCase() || "V";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0E1A] px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:pt-16">

      <GlobalStyles />

      <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_50%,transparent_100%)]"></div>

      <div className="relative z-10 mx-auto w-full max-w-lg">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 font-tag text-[10px] tracking-widest text-[#D9B84A] uppercase sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D9B84A] animate-pulse"></span>
            NIT Calicut · Security Desk
          </div>

          <h1 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Visitor Details
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Review visitor information before verification
          </p>
        </div>

        {/* Visitor Card */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10162A] shadow-[0_25px_60px_rgba(0,0,0,0.45)]">

          {/* Visitor Header */}
          <div className="corner-mark border-b border-white/[0.06] bg-[#141B31] px-6 py-6">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-display text-base font-semibold text-gray-300">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-tag text-[10px] uppercase tracking-widest text-gray-500">
                  Visitor
                </p>

                <div className="mt-1.5 flex items-center gap-1.5">
                  <h2 className="font-display truncate text-xl font-semibold text-white sm:text-2xl">
                    {visitor.name}
                  </h2>

                  {isVerified && (
                    <svg
                      className="h-5 w-5 shrink-0 sm:h-[22px] sm:w-[22px]"
                      viewBox="0 0 22 22"
                      fill="none"
                      role="img"
                      aria-label="Verified visitor"
                    >
                      <title>Verified</title>
                      <path
                        d="M11 1.5l2.35 1.24 2.6-.47 1.24 2.35 2.35 1.24-.47 2.6 1.24 2.35-1.24 2.35.47 2.6-2.35 1.24-1.24 2.35-2.6-.47L11 20.5l-2.35-1.24-2.6.47-1.24-2.35-2.35-1.24.47-2.6L1.5 11l1.24-2.35-.47-2.6 2.35-1.24 1.24-2.35 2.6.47L11 1.5z"
                        fill="#3B82F6"
                      />
                      <path
                        d="M7.2 11.2l2.4 2.4 5.2-5.2"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <div className={`mt-3 inline-flex items-center gap-2 rounded-sm border ${statusColor.border} ${statusColor.bg} px-3 py-1`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${statusColor.dot}`}></span>
                  <span className={`font-tag text-[10px] font-medium tracking-widest ${statusColor.text} uppercase`}>
                    {visitor.status}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Details */}
          <div className="space-y-5 px-6 py-6">

            <div>
              <p className="font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                Phone
              </p>

              <p className="mt-1.5 text-sm font-medium text-gray-200">
                {visitor.phone}
              </p>
            </div>

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

            {/* Verification Information */}
            <div className="border-t border-dashed border-white/10 pt-5">

              <p className="mb-3 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                Verification
              </p>

              <div className="space-y-2 text-sm">

                <p className="text-gray-300">
                  <span className="font-medium text-gray-400">
                    Verified By:
                  </span>{" "}
                  {visitor.verified_by_name || "Not verified"}
                </p>

                <p className="text-gray-300">
                  <span className="font-medium text-gray-400">
                    Verified At:
                  </span>{" "}
                  {visitor.verified_at || "Not verified"}
                </p>

              </div>

            </div>

            {/* Checkout Information */}
            <div className="border-t border-dashed border-white/10 pt-5">

              <p className="mb-3 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">
                Checkout
              </p>

              <p className="text-sm text-gray-300">
                <span className="font-medium text-gray-400">
                  Checkout Time:
                </span>{" "}
                {visitor.check_out || "Not checked out"}
              </p>

            </div>

          </div>

          {/* Action */}
          {isPending && (
            <div className="border-t border-white/[0.07] px-6 py-5">

              <button
                type="button"
                onClick={handleVerify}
                className="corner-mark group flex w-full items-center justify-between gap-4 border-l-2 border-[#C9A227] bg-white/[0.03] px-5 py-4 transition-colors duration-200 hover:bg-white/[0.06]"
              >
                <span className="font-display text-sm font-semibold tracking-wide text-white sm:text-base">
                  Verify Visitor
                </span>
                <svg className="h-4 w-4 text-[#D9B84A] transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
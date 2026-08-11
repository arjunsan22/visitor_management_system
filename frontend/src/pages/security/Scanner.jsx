import { Scanner as QRScanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

export const Scanner = () => {

  const navigate = useNavigate();

  const handleScan = (result) => {

    if (!result || result.length === 0) {
      return;
    }

    const scannedValue = result[0].rawValue;

    console.log("Scanned QR:", scannedValue);

    try {

      const scannedUrl = new URL(scannedValue);

      const pathParts = scannedUrl.pathname.split("/");

      const token = pathParts[pathParts.length - 1];

      if (!token) {
        console.error("Invalid visitor QR code");
        return;
      }

      console.log("Visitor Pass Token:", token);

      navigate(`/security/visitor/${token}`);

    } catch (error) {

      console.error(
        "Invalid QR code:",
        error
      );

    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0E1A] px-4 py-10 sm:py-14">

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

        .viewfinder-bracket { position: absolute; width: 34px; height: 34px; pointer-events: none; }

        @keyframes viewfinder-scan {
          0% { top: 6%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 92%; opacity: 0; }
        }
        .viewfinder-scan-line {
          animation: viewfinder-scan 2.2s ease-in-out infinite;
        }

        /* Scoped styling for the third-party scanner's internal video/canvas */
        .qr-viewport video,
        .qr-viewport canvas {
          border-radius: 0.75rem;
          object-fit: cover;
        }
      `}</style>

      <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_25%,#000_60%,transparent_100%)]"></div>

      <div className="relative z-10 w-full max-w-md">

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 font-tag text-[10px] tracking-widest text-[#D9B84A] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D9B84A] animate-pulse"></span>
            Security Checkpoint
          </div>



          <p className="mt-3 text-sm text-gray-500">
            Align the visitor's QR code within the frame below
          </p>
        </div>

        {/* Scanner Card */}
        <div className="overflow-hidden rounded-2xl bg-[#10162A] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.45)]">

          {/* Card header bar */}
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
            <span className="font-tag text-[10px] tracking-widest text-gray-500 uppercase">Camera Feed</span>
            <span className="flex items-center gap-2 font-tag text-[10px] tracking-widest text-emerald-400/90 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </span>
          </div>

          {/* Viewfinder */}
          <div className="corner-mark qr-viewport relative m-5 aspect-square overflow-hidden rounded-xl border border-[#C9A227]/25 bg-black">

            <QRScanner
              onScan={handleScan}
            />

            {/* Overlay: corner brackets + scan line (visual only, non-interactive) */}
            <div className="pointer-events-none absolute inset-0">
              <span className="viewfinder-bracket left-4 top-4 border-l-2 border-t-2 border-[#D9B84A]"></span>
              <span className="viewfinder-bracket right-4 top-4 border-r-2 border-t-2 border-[#D9B84A]"></span>
              <span className="viewfinder-bracket left-4 bottom-4 border-l-2 border-b-2 border-[#D9B84A]"></span>
              <span className="viewfinder-bracket right-4 bottom-4 border-r-2 border-b-2 border-[#D9B84A]"></span>

              <span className="viewfinder-scan-line absolute inset-x-6 h-[2px] bg-[#D9B84A] shadow-[0_0_10px_2px_rgba(217,184,74,0.6)]"></span>
            </div>

          </div>

          {/* Footer note */}
          <div className="border-t border-dashed border-white/10 px-6 py-4 text-center">
            <p className="font-tag text-[10px] tracking-widest text-gray-500 uppercase">
              Verified passes redirect automatically
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
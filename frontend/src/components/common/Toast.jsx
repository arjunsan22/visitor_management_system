import { useEffect } from "react";

export const Toast = ({ message, type = "success", onClose, duration = 3500, position = "top-right" }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const positionClasses = {
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
  };

  let typeClasses = "";
  let icon = null;

  if (type === "warning" || type === "error") {
    // Premium Crimson Dark Mode Style
    typeClasses = "border-red-500/20 bg-[#161212]/95 shadow-red-950/20";
    icon = (
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/10 text-red-400 ring-1 ring-red-500/20">
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    );
  } else {
    // Premium Emerald Dark Mode Style
    typeClasses = "border-emerald-500/20 bg-[#0F1411]/95 shadow-emerald-950/20";
    icon = (
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-[100] flex items-center gap-3.5 rounded-xl border p-3.5 pr-4 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 ease-out select-none max-w-sm min-w-[280px] ${typeClasses} custom-toast-animation`}>
      
      <style>{`
        .custom-toast-animation {
          animation: slideInPremium 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideInPremium {
          from { opacity: 0; transform: translateY(-10px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      
      {icon}
      
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium tracking-wide text-gray-200 m-0 leading-tight">
          {message}
        </p>
      </div>
      
      <button 
        onClick={onClose} 
        className="flex h-5 w-5 items-center justify-center rounded-md text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200 active:scale-90"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
    </div>
  );
};

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
    typeClasses = "border-red-500/30 bg-red-500/10 text-red-400";
    icon = (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  } else {
    // success
    typeClasses = "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    icon = (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    );
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-[100] flex animate-[slideIn_0.3s_ease-out_forwards] items-center gap-3 rounded-xl border px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md ${typeClasses}`}>
      
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(15px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      
      {icon}
      
      <span className="font-tag text-xs font-medium tracking-widest uppercase mt-[1px]">
        {message}
      </span>
      
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
    </div>
  );
};

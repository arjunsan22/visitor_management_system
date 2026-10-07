import React, { useState, useEffect } from 'react';

export const ReusableSpinner = ({ 
  fullScreen = false, 
  inline = false, 
  size = "md",
  delay = 250 // Delay in milliseconds before showing the spinner
}) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Start a timer to show the spinner after the delay threshold
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, delay);

    // Clean up the timer if the component unmounts before the delay finishes
    return () => clearTimeout(timer);
  }, [delay]);

  // If the component unmounts before 250ms, this returns null and nothing ever flashes!
  if (!shouldShow) return null;

  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const strokeWidths = {
    sm: 3,
    md: 2.5,
    lg: 2
  };

  const currentSize = inline ? "sm" : size;

  const spinnerElement = (
    <svg 
      className={`${inline ? 'inline-block' : 'block'} animate-spin text-[#C9A227] ${sizes[currentSize]} animate-fade-in`} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://w3.org"
      style={{ animationDuration: '0.6s' }} // Slightly faster spin feels snappier
    >
      <circle 
        className="opacity-10 dark:opacity-20 stroke-current text-neutral-900 dark:text-white" 
        cx="12" 
        cy="12" 
        r="10" 
        strokeWidth={strokeWidths[currentSize]}
      />
      <circle 
        className="stroke-current" 
        cx="12" 
        cy="12" 
        r="10" 
        strokeWidth={strokeWidths[currentSize]}
        strokeDasharray="32 100" 
        strokeLinecap="round"
      />
    </svg>
  );

  if (inline) return spinnerElement;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-neutral-950/60 backdrop-blur-[4px]">
        {spinnerElement}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6">
      {spinnerElement}
    </div>
  );
};

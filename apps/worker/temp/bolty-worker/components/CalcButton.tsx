    "use client";

    import React from "react";

    type Props = {
      label: React.ReactNode;
      onClick: () => void;
      className?: string;
      ariaLabel?: string;
    };

    export default function CalcButton({
      label,
      onClick,
      className = "",
      ariaLabel,
    }: Props) {
      return (
        <button
          type="button"
          aria-label={ariaLabel ?? String(label)}
          onClick={onClick}
          className={`rounded-md bg-gray-100 dark:bg-gray-800 hover:opacity-95 active:scale-95 transition-all text-lg font-medium p-4 ${className}`}
        >
          {label}
        </button>
      );
    }
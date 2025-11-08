    "use client";

    import React from "react";

    interface ButtonProps {
      label: string;
      className?: string;
      onClick?: (label: string) => void;
    }

    export default function Button({
      label,
      className = "",
      onClick,
    }: ButtonProps) {
      return (
        <button
          type="button"
          className={`button ${className}`}
          onClick={() => onClick?.(label)}
          aria-label={`calculator-button-${label}`}
        >
          {label}
        </button>
      );
    }
    "use client";
    import React from "react";

    type CalcButtonProps = {
      value: string;
      onClick: (v: string) => void;
      className?: string;
    };

    export default function CalcButton({ value, onClick, className = "" }: CalcButtonProps) {
      return (
        <button
          type="button"
          onClick={() => onClick(value)}
          className={`w-full h-12 flex items-center justify-center rounded-md text-lg font-medium transition ${className}`}
          aria-label={`button-${value}`}
        >
          {value}
        </button>
      );
    }
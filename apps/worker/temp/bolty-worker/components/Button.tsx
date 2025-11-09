    "use client";
    import React from "react";
    import styles from "./calculator.module.css";

    type ButtonProps = {
      onClick?: () => void;
      className?: string;
      children?: React.ReactNode;
    };

    export default function Button({
      onClick = () => {},
      className = "",
      children,
    }: ButtonProps) {
      const cls = [styles.button, className].filter(Boolean).join(" ");
      return (
        <button
          type="button"
          className={cls}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onClick();
          }}
        >
          {children}
        </button>
      );
    }
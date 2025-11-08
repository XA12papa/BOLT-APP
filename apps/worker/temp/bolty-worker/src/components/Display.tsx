    "use client";

    import React from "react";

    interface DisplayProps {
      expression: string;
      result: string;
    }

    export default function Display({ expression, result }: DisplayProps) {
      return (
        <div className="display" role="status" aria-live="polite">
          <div className="expr">{expression || "0"}</div>
          <div className="res">{result ? `= ${result}` : ""}</div>
        </div>
      );
    }
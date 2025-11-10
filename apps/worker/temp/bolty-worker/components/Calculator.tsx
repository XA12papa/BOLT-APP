    "use client";

    import React, { useState } from "react";
    import { evaluateExpression } from "../lib/calc";

    export default function Calculator(): JSX.Element {
      const [display, setDisplay] = useState<string>("0");

      const handleInput = (token: string) => {
        if (token === "C") {
          setDisplay("0");
          return;
        }

        if (token === "DEL") {
          setDisplay((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
          return;
        }

        if (token === "=") {
          const result = evaluateExpression(display);
          setDisplay(result);
          return;
        }

        if (/[+\-*/]/.test(token)) {
          setDisplay((prev) => {
            // replace last operator if repeated
            if (/[+\-*/]$/.test(prev)) {
              return prev.slice(0, -1) + token;
            }
            return prev + token;
          });
          return;
        }

        if (token === ".") {
          setDisplay((prev) => {
            const parts = prev.split(/([+\-*/])/);
            const last = parts[parts.length - 1];
            if (last.includes(".")) return prev;
            return prev === "0" ? "0." : prev + ".";
          });
          return;
        }

        // digits
        setDisplay((prev) => (prev === "0" ? token : prev + token));
      };

      const keys = [
        "C",
        "DEL",
        "/",
        "*",
        "7",
        "8",
        "9",
        "-",
        "4",
        "5",
        "6",
        "+",
        "1",
        "2",
        "3",
        "=",
        "0",
        ".",
      ];

      return (
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-2xl shadow-lg p-6">
          <div className="mb-4">
            <div className="text-right font-mono text-4xl py-4 px-3 bg-gray-100 dark:bg-gray-800 rounded break-words">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {keys.map((k, idx) => {
              const isZero = k === "0";
              const isControl = k === "C" || k === "DEL";
              const isEqual = k === "=";
              const isOperator = /[+\-*/]/.test(k);

              const base =
                "py-3 rounded text-lg font-medium flex items-center justify-center";
              const bg = isEqual
                ? "bg-blue-600 text-white"
                : isControl
                ? "bg-red-500 text-white"
                : isOperator
                ? "bg-yellow-400 dark:bg-yellow-600"
                : "bg-gray-200 dark:bg-gray-700";

              const span = isZero ? "col-span-2" : "";

              return (
                <button
                  key={`${k}-${idx}`}
                  onClick={() => handleInput(k)}
                  className={`${base} ${bg} ${span}`}
                  aria-label={`key-${k}`}
                >
                  {k}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
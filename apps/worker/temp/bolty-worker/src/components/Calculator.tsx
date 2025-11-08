    "use client";

    import React, { useEffect, useState } from "react";
    import Display from "./Display";
    import Keypad from "./Keypad";
    import evaluateExpression from "../utils/evaluate";

    const operators = ["+", "-", "*", "/"];

    export default function Calculator() {
      const [expression, setExpression] = useState("");
      const [result, setResult] = useState("");

      function input(v: string) {
        if (v === "(" || v === ")") {
          setExpression((p) => p + v);
          return;
        }

        if (v === ".") {
          const parts = expression.split(/[\+\-\*\/\(\)]/);
          const last = parts[parts.length - 1] || "";
          if (last.includes(".")) return;
          setExpression((p) => p + v);
          return;
        }

        if (operators.includes(v)) {
          if (expression === "" && v !== "-") return;
          const last = expression.slice(-1);
          if (operators.includes(last)) {
            setExpression((p) => p.slice(0, -1) + v);
          } else {
            setExpression((p) => p + v);
          }
          return;
        }

        setExpression((p) => p + v);
      }

      function clear() {
        setExpression("");
        setResult("");
      }

      function del() {
        setExpression((p) => p.slice(0, -1));
      }

      function evaluate() {
        try {
          const val = evaluateExpression(expression);
          setResult(String(val));
          setExpression(String(val));
        } catch {
          setResult("Error");
        }
      }

      useEffect(() => {
        function handler(e: KeyboardEvent) {
          const k = e.key;
          if (/^\d$/.test(k) || ["(", ")", "."].includes(k)) {
            e.preventDefault();
            input(k);
          } else if (["+", "-", "*", "/"].includes(k)) {
            e.preventDefault();
            input(k);
          } else if (k === "Enter" || k === "=") {
            e.preventDefault();
            evaluate();
          } else if (k === "Backspace") {
            e.preventDefault();
            del();
          } else if (k.toLowerCase() === "c") {
            e.preventDefault();
            clear();
          }
        }
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
      }, [expression]);

      return (
        <div className="calculator" role="application" aria-label="Simple calculator">
          <Display expression={expression} result={result} />
          <Keypad onInput={input} onClear={clear} onDelete={del} onEvaluate={evaluate} />
        </div>
      );
    }
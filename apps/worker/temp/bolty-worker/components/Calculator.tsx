    "use client";

    import React, { useEffect, useRef, useState } from "react";
    import CalcButton from "./CalcButton";
    import { operate, formatNumber } from "@/lib/calc";

    type Operator = "+" | "-" | "*" | "/";

    export default function Calculator(): JSX.Element {
      const [displayValue, setDisplayValue] = useState<string>("0");
      const [firstOperand, setFirstOperand] = useState<number | null>(null);
      const [operator, setOperator] = useState<Operator | null>(null);
      const [waitingForSecondOperand, setWaitingForSecondOperand] =
        useState<boolean>(false);

      const containerRef = useRef<HTMLDivElement | null>(null);

      const inputDigit = (digit: string) => {
        if (waitingForSecondOperand) {
          setDisplayValue(digit);
          setWaitingForSecondOperand(false);
        } else {
          setDisplayValue((prev) => (prev === "0" ? digit : (prev + digit).slice(0, 32)));
        }
      };

      const inputDot = () => {
        if (waitingForSecondOperand) {
          setDisplayValue("0.");
          setWaitingForSecondOperand(false);
          return;
        }
        if (!displayValue.includes(".")) {
          setDisplayValue((prev) => prev + ".");
        }
      };

      const clearAll = () => {
        setDisplayValue("0");
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
      };

      const backspace = () => {
        if (waitingForSecondOperand) {
          setDisplayValue("0");
          setWaitingForSecondOperand(false);
          return;
        }
        setDisplayValue((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
      };

      const toggleSign = () => {
        setDisplayValue((prev) =>
          prev.startsWith("-") ? prev.slice(1) : prev === "0" ? "0" : "-" + prev
        );
      };

      const handleOperator = (nextOperator: Operator) => {
        const inputValue = parseFloat(displayValue);
        if (operator && waitingForSecondOperand) {
          setOperator(nextOperator);
          return;
        }
        if (firstOperand == null) {
          setFirstOperand(inputValue);
        } else if (operator) {
          const result = operate(firstOperand, inputValue, operator);
          setDisplayValue(formatNumber(result));
          setFirstOperand(result);
        }
        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
      };

      const handleEqual = () => {
        const inputValue = parseFloat(displayValue);
        if (operator && firstOperand != null) {
          const result = operate(firstOperand, inputValue, operator);
          setDisplayValue(formatNumber(result));
          setFirstOperand(null);
          setOperator(null);
          setWaitingForSecondOperand(false);
        }
      };

      useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
          const key = e.key;
          if (/^\d$/.test(key)) {
            e.preventDefault();
            inputDigit(key);
            return;
          }
          if (key === ".") {
            e.preventDefault();
            inputDot();
            return;
          }
          if (key === "+" || key === "-" || key === "*" || key === "/") {
            e.preventDefault();
            handleOperator(key as Operator);
            return;
          }
          if (key === "Enter" || key === "=") {
            e.preventDefault();
            handleEqual();
            return;
          }
          if (key === "Backspace") {
            e.preventDefault();
            backspace();
            return;
          }
          if (key === "Escape" || key.toLowerCase() === "c") {
            e.preventDefault();
            clearAll();
            return;
          }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
      }, [displayValue, firstOperand, operator, waitingForSecondOperand]);

      return (
        <div
          ref={containerRef}
          className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white dark:bg-[#0b0b0b]"
        >
          <div className="mb-4">
            <div
              aria-live="polite"
              className="text-right text-sm text-gray-500 dark:text-gray-400"
            >
              {firstOperand !== null && operator ? `${formatNumber(firstOperand)} ${operator}` : ""}
            </div>
            <div className="text-right text-4xl font-mono h-16 flex items-center justify-end overflow-hidden">
              <span className="break-words">{displayValue}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <CalcButton label="C" onClick={clearAll} className="bg-orange-100 dark:bg-orange-900" />
            <CalcButton label="←" onClick={backspace} />
            <CalcButton label="±" onClick={toggleSign} />
            <CalcButton label="÷" onClick={() => handleOperator("/" as Operator)} />

            <CalcButton label="7" onClick={() => inputDigit("7")} />
            <CalcButton label="8" onClick={() => inputDigit("8")} />
            <CalcButton label="9" onClick={() => inputDigit("9")} />
            <CalcButton label="×" onClick={() => handleOperator("*" as Operator)} />

            <CalcButton label="4" onClick={() => inputDigit("4")} />
            <CalcButton label="5" onClick={() => inputDigit("5")} />
            <CalcButton label="6" onClick={() => inputDigit("6")} />
            <CalcButton label="−" onClick={() => handleOperator("-" as Operator)} />

            <CalcButton label="1" onClick={() => inputDigit("1")} />
            <CalcButton label="2" onClick={() => inputDigit("2")} />
            <CalcButton label="3" onClick={() => inputDigit("3")} />
            <CalcButton label="+" onClick={() => handleOperator("+" as Operator)} />

            <CalcButton label="0" onClick={() => inputDigit("0")} className="col-span-2 text-left pl-6" />
            <CalcButton label="." onClick={inputDot} />
            <CalcButton label="=" onClick={handleEqual} className="bg-emerald-500 text-white" />
          </div>
        </div>
      );
    }
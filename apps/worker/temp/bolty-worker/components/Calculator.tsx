    "use client";
    import React, { useState } from "react";
    import Button from "./Button";
    import styles from "./calculator.module.css";

    type Op = "+" | "-" | "×" | "÷" | "*" | "/";

    function formatNumber(n: number): string {
      if (!isFinite(n)) return "Error";
      const rounded = parseFloat(n.toFixed(10));
      return rounded.toString();
    }

    function operate(a: number, b: number, operator: Op): number {
      switch (operator) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "×":
        case "*":
          return a * b;
        case "÷":
        case "/":
          return b === 0 ? NaN : a / b;
        default:
          return b;
      }
    }

    export default function Calculator(): JSX.Element {
      const [display, setDisplay] = useState<string>("0");
      const [firstValue, setFirstValue] = useState<number | null>(null);
      const [operator, setOperator] = useState<Op | null>(null);
      const [waitingForSecond, setWaitingForSecond] = useState<boolean>(false);

      const inputDigit = (digit: string) => {
        if (waitingForSecond) {
          setDisplay(digit);
          setWaitingForSecond(false);
          return;
        }
        setDisplay((prev) => (prev === "0" ? digit : prev + digit));
      };

      const inputDecimal = () => {
        if (waitingForSecond) {
          setDisplay("0.");
          setWaitingForSecond(false);
          return;
        }
        if (!display.includes(".")) setDisplay((prev) => prev + ".");
      };

      const handleOperator = (nextOperator: Op) => {
        const inputValue = Number(display);
        if (firstValue === null) {
          setFirstValue(inputValue);
        } else if (operator && !waitingForSecond) {
          const result = operate(firstValue, inputValue, operator);
          const formatted = formatNumber(result);
          setDisplay(formatted);
          setFirstValue(Number(formatted));
        }
        setOperator(nextOperator);
        setWaitingForSecond(true);
      };

      const handleEquals = () => {
        if (operator && firstValue !== null) {
          const second = Number(display);
          const result = operate(firstValue, second, operator);
          const formatted = formatNumber(result);
          setDisplay(formatted);
          setFirstValue(null);
          setOperator(null);
          setWaitingForSecond(true);
        }
      };

      const handleClear = () => {
        setDisplay("0");
        setFirstValue(null);
        setOperator(null);
        setWaitingForSecond(false);
      };

      const handleBackspace = () => {
        if (waitingForSecond) return;
        if (display.length <= 1) setDisplay("0");
        else setDisplay(display.slice(0, -1));
      };

      const handlePercent = () => {
        const value = Number(display) / 100;
        setDisplay(formatNumber(value));
      };

      const toggleSign = () => {
        if (display === "0") return;
        setDisplay((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
      };

      return (
        <div className={styles.calculator}>
          <div className={styles.display} aria-live="polite">
            {display}
          </div>

          <div className={styles.keypad}>
            <Button onClick={handleClear} className={styles.func}>
              C
            </Button>
            <Button onClick={toggleSign} className={styles.func}>
              ±
            </Button>
            <Button onClick={handlePercent} className={styles.func}>
              %
            </Button>
            <Button onClick={() => handleOperator("÷")} className={styles.operator}>
              ÷
            </Button>

            <Button onClick={() => inputDigit("7")}>7</Button>
            <Button onClick={() => inputDigit("8")}>8</Button>
            <Button onClick={() => inputDigit("9")}>9</Button>
            <Button onClick={() => handleOperator("×")} className={styles.operator}>
              ×
            </Button>

            <Button onClick={() => inputDigit("4")}>4</Button>
            <Button onClick={() => inputDigit("5")}>5</Button>
            <Button onClick={() => inputDigit("6")}>6</Button>
            <Button onClick={() => handleOperator("-")} className={styles.operator}>
              -
            </Button>

            <Button onClick={() => inputDigit("1")}>1</Button>
            <Button onClick={() => inputDigit("2")}>2</Button>
            <Button onClick={() => inputDigit("3")}>3</Button>
            <Button onClick={() => handleOperator("+")} className={styles.operator}>
              +
            </Button>

            <Button onClick={() => inputDigit("0")} className={styles.zero}>
              0
            </Button>
            <Button onClick={inputDecimal}>.</Button>
            <Button onClick={handleEquals} className={styles.equal}>
              =
            </Button>
          </div>
        </div>
      );
    }
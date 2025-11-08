    "use client";

    import React from "react";
    import Button from "./Button";

    interface KeypadProps {
      onInput: (value: string) => void;
      onClear: () => void;
      onDelete: () => void;
      onEvaluate: () => void;
    }

    export default function Keypad({
      onInput,
      onClear,
      onDelete,
      onEvaluate,
    }: KeypadProps) {
      const keys: string[][] = [
        ["C", "DEL", "(", ")"],
        ["7", "8", "9", "/"],
        ["4", "5", "6", "*"],
        ["1", "2", "3", "-"],
        ["0", ".", "=", "+"],
      ];

      return (
        <div className="keypad">
          {keys.flat().map((k) => {
            const classNames: string[] = [];
            if (["/", "*", "-", "+"].includes(k)) classNames.push("operator");
            if (k === "=") classNames.push("equals");
            if (k === "0") classNames.push("zero");
            if (k === "C" || k === "DEL") classNames.push("action");

            return (
              <Button
                key={k}
                label={k}
                className={classNames.join(" ")}
                onClick={(label) => {
                  if (label === "C") onClear();
                  else if (label === "DEL") onDelete();
                  else if (label === "=") onEvaluate();
                  else onInput(label);
                }}
              />
            );
          })}
        </div>
      );
    }
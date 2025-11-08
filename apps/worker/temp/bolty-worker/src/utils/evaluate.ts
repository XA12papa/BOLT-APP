    export default function evaluateExpression(input: string): number {
      if (!input) return 0;
      const expr = input.replace(/×/g, "*").replace(/÷/g, "/");
      if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
        throw new Error("Invalid characters");
      }
      // eslint-disable-next-line no-new-func
      const value = Function(`"use strict"; return (${expr})`)();
      const num = Number(value);
      if (!isFinite(num)) throw new Error("Invalid result");
      return num;
    }
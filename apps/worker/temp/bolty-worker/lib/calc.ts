    export function operate(a: number, b: number, operator: string): number {
      switch (operator) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return b === 0 ? NaN : a / b;
        default:
          return b;
      }
    }

    export function formatNumber(n: number): string {
      if (!Number.isFinite(n)) return "Error";
      const str = String(n);
      if (str.length <= 12) return str;
      return Number(n.toPrecision(12)).toString();
    }
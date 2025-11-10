    export function evaluateExpression(expr: string): string {
      // sanitize input: keep digits, operators and dot
      let sanitized = String(expr).replace(/\s+/g, "");
      sanitized = sanitized.replace(/[^0-9+\-*/.]/g, "");
      // collapse repeated operators to the last one
      sanitized = sanitized.replace(/([+\-*/]){2,}/g, (m) => m[m.length - 1]);
      // remove trailing operators
      sanitized = sanitized.replace(/[+\-*/]+$/g, "");

      if (sanitized === "") return "0";

      try {
        // evaluate safely after sanitization
        // eslint-disable-next-line no-new-func
        const value = Function(`return ${sanitized}`)();
        if (typeof value === "number" && Number.isFinite(value)) {
          if (Number.isInteger(value)) return value.toString();
          // limit decimal places and trim
          const fixed = parseFloat(value.toFixed(10));
          return fixed.toString();
        }
        return "Error";
      } catch {
        return "Error";
      }
    }
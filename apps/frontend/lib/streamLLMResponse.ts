export async function* streamLLMResponse(
    text: string,
    delay: number = 10, // ms between tokens
    byWord: boolean = true // false = char-by-char, true = word-by-word
  ): AsyncGenerator<string> {
    const tokens = byWord ? text.split(/(\s+)/) : text.split(""); // keep spaces
    for (const token of tokens) {
      await new Promise((r) => setTimeout(r, delay)); // simulate network/LLM delay
      yield token;
    }
  }
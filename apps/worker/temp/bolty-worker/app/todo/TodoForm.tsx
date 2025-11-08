    "use client";

    import { useState, FormEvent, ChangeEvent } from "react";

    type Props = {
      onAdd: (text: string) => void;
    };

    export default function TodoForm({ onAdd }: Props) {
      const [text, setText] = useState("");

      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setText("");
      };

      return (
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            className="todo-input"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            aria-label="New todo"
          />
          <button type="submit" className="btn btn-primary" aria-label="Add todo">
            Add
          </button>
        </form>
      );
    }
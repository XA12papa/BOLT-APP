    "use client";

    import React from "react";
    import { Todo } from "../../types/todo";

    type Props = {
      todo: Todo;
      onToggle: (id: string) => void;
      onDelete: (id: string) => void;
    };

    export default function TodoItem({ todo, onToggle, onDelete }: Props) {
      return (
        <li className="todo-item" role="listitem">
          <label className="todo-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              aria-label={`Mark ${todo.text} as ${todo.completed ? "incomplete" : "complete"}`}
            />
            <span className={todo.completed ? "todo-text completed" : "todo-text"}>
              {todo.text}
            </span>
          </label>

          <button
            className="todo-delete"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete ${todo.text}`}
            title="Delete"
          >
            ×
          </button>
        </li>
      );
    }
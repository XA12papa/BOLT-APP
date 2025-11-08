    "use client";

    import { useState, ChangeEvent } from "react";
    import type { Todo } from "./useTodos";

    type Props = {
      todo: Todo;
      onToggle: (id: string) => void;
      onDelete: (id: string) => void;
      onEdit: (id: string, text: string) => void;
    };

    export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
      const [editing, setEditing] = useState(false);
      const [text, setText] = useState(todo.text);

      const handleSave = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        onEdit(todo.id, trimmed);
        setEditing(false);
      };

      return (
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
          <input
            aria-label={`Toggle ${todo.text}`}
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          {editing ? (
            <>
              <input
                className="edit-input"
                value={text}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
              />
              <div className="actions">
                <button className="btn" onClick={handleSave} aria-label="Save edit">
                  Save
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setEditing(false);
                    setText(todo.text);
                  }}
                  aria-label="Cancel edit"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="todo-text">{todo.text}</span>
              <div className="actions">
                <button className="btn" onClick={() => setEditing(true)} aria-label="Edit todo">
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(todo.id)} aria-label="Delete todo">
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      );
    }
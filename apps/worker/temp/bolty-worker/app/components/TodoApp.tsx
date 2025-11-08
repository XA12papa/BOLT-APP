    "use client";

    import React, { useEffect, useRef, useState } from "react";
    import TodoList from "./TodoList";
    import { Todo } from "../../types/todo";

    const STORAGE_KEY = "todos-nextjs";

    export default function TodoApp() {
      const [todos, setTodos] = useState<Todo[]>([]);
      const [newTodo, setNewTodo] = useState("");
      const inputRef = useRef<HTMLInputElement | null>(null);

      useEffect(() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as Todo[];
            setTodos(parsed);
          }
        } catch {
          // ignore
        }
      }, []);

      useEffect(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch {
          // ignore
        }
      }, [todos]);

      const addTodo = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const text = newTodo.trim();
        if (!text) return;

        const id =
          typeof crypto !== "undefined" && typeof (crypto as any).randomUUID === "function"
            ? (crypto as any).randomUUID()
            : Date.now().toString();

        const t: Todo = { id, text, completed: false, createdAt: Date.now() };
        setTodos((prev) => [t, ...prev]);
        setNewTodo("");
        inputRef.current?.focus();
      };

      const toggleTodo = (id: string) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
      };

      const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      };

      const clearCompleted = () => {
        setTodos((prev) => prev.filter((t) => !t.completed));
      };

      const clearAll = () => {
        setTodos([]);
      };

      const remaining = todos.filter((t) => !t.completed).length;

      return (
        <section className="todo-app" aria-labelledby="todo-heading">
          <h1 id="todo-heading" className="todo-title">
            Todo
          </h1>

          <form className="todo-form" onSubmit={addTodo}>
            <input
              ref={inputRef}
              className="todo-input"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              aria-label="New todo"
            />
            <button className="todo-add" type="submit" aria-label="Add todo">
              Add
            </button>
          </form>

          <div className="todo-meta">
            <span>{remaining} item{remaining !== 1 ? "s" : ""} left</span>
            <div className="todo-actions">
              <button className="clear-btn" onClick={clearAll} title="Clear all">
                Clear all
              </button>
              <button className="clear-btn" onClick={clearCompleted} title="Clear completed">
                Clear completed
              </button>
            </div>
          </div>

          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </section>
      );
    }
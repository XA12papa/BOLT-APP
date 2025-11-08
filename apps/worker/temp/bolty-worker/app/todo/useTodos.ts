    "use client";

    import { useState, useEffect } from "react";

    export interface Todo {
      id: string;
      text: string;
      completed: boolean;
    }

    const STORAGE_KEY = "todos_v1";

    export default function useTodos() {
      const [todos, setTodos] = useState<Todo[]>(() => {
        if (typeof window === "undefined") return [];
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? (JSON.parse(raw) as Todo[]) : [];
        } catch {
          return [];
        }
      });

      useEffect(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch {
          // ignore
        }
      }, [todos]);

      const addTodo = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? (crypto as any).randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        setTodos((prev) => [{ id, text: trimmed, completed: false }, ...prev]);
      };

      const toggleTodo = (id: string) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
      };

      const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      };

      const editTodo = (id: string, text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
      };

      const clearCompleted = () => {
        setTodos((prev) => prev.filter((t) => !t.completed));
      };

      return { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted };
    }
    "use client";

    import React from "react";
    import TodoItem from "./TodoItem";
    import { Todo } from "../../types/todo";

    type Props = {
      todos: Todo[];
      onToggle: (id: string) => void;
      onDelete: (id: string) => void;
    };

    export default function TodoList({ todos, onToggle, onDelete }: Props) {
      if (todos.length === 0) {
        return <p className="empty">No todos yet. Add one above.</p>;
      }

      return (
        <ul className="todo-list" role="list">
          {todos.map((t) => (
            <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      );
    }
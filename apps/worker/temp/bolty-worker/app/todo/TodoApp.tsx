    "use client";

    import React from "react";
    import useTodos from "./useTodos";
    import TodoForm from "./TodoForm";
    import TodoItem from "./TodoItem";

    type Filter = "all" | "active" | "completed";

    export default function TodoApp() {
      const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } = useTodos();
      const [filter, setFilter] = React.useState<Filter>("all");

      const filtered = todos.filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      });

      return (
        <div>
          <TodoForm onAdd={addTodo} />

          <div className="controls">
            <div className="filters" role="tablist" aria-label="Filter todos">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
                aria-pressed={filter === "all"}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === "active" ? "active" : ""}`}
                onClick={() => setFilter("active")}
                aria-pressed={filter === "active"}
              >
                Active
              </button>
              <button
                className={`filter-btn ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
                aria-pressed={filter === "completed"}
              >
                Completed
              </button>
            </div>

            <div className="meta">
              <span>{todos.filter((t) => !t.completed).length} items left</span>
              <button className="btn" onClick={() => clearCompleted()}>
                Clear completed
              </button>
            </div>
          </div>

          <ul className="todo-list" aria-live="polite">
            {filtered.length === 0 ? (
              <li className="empty">No todos yet</li>
            ) : (
              filtered.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </ul>
        </div>
      );
    }
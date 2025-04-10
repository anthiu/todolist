export default function Filterbot({
  tasks,
  clearCompletedTasks,
  incompleteTasksCount,
  setFilter,
  filter,
}) {
  return (
    <footer className="footer">
      {tasks.length > 0 && (
        <ul className="filters">
          <span className="todo-count">
            <strong>
              {incompleteTasksCount} item
              {incompleteTasksCount > 1 ? "s" : ""} left!
            </strong>
          </span>
          <div className="list-filters">
            <li>
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
            </li>
            <li>
              <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </li>
          </div>
          <button className="delete-all" onClick={clearCompletedTasks}>
            Clear completed
          </button>
        </ul>
      )}
    </footer>
  );
}

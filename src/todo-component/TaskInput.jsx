export default function TaskInput({ newTask, setNewTask, onAddTask }) {
  return (
    <>
      <label className="visually-hidden" htmlFor="todo-input">
        New Todo Input
      </label>
      <div className="box">
        <input
          type="text"
          className="new-todo"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAddTask()}
          placeholder="What needs to be done?"
        />
      </div>
    </>
  );
}

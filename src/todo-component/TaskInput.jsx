export default function TaskInput({ newTask, setNewTask, addTask }) {
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
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="What needs to be done?"
        />
      </div>
    </>
  );
}

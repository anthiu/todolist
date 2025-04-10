import TaskItem from "./TaskItem";

export default function TaskList({
  filteredTasks,
  deleteTask,
  handleToggleComplete,
  startEditing,
  editIndex,
  editValue,
  setEditValue,
  saveEdit,
  handleKeyDownEdit,
}) {
  return (
    <ul className="todo-list">
      {filteredTasks.map((task, index) => (
        <div>
          <TaskItem
            index={index}
            task={task}
            deleteTask={deleteTask}
            handleToggleComplete={handleToggleComplete}
            startEditing={startEditing}
            editIndex={editIndex}
            editValue={editValue}
            setEditValue={setEditValue}
            saveEdit={saveEdit}
            handleKeyDownEdit={handleKeyDownEdit}
          />
        </div>
      ))}
    </ul>
  );
}

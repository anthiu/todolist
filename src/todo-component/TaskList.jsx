import TaskItem from "./TaskItem";

export default function TaskList({
  filteredTasks,
  onDeleteTask,
  handleToggleComplete,
  handleStartEditing,
  editIndex,
  editValue,
  setEditValue,
  handleSaveEdit,
  handleKeyDownEdit,
}) {
  return (
    <ul className="todo-list">
      {filteredTasks.map((task, index) => (
        <div>
          <TaskItem
            key={task.id}
            index={index}
            task={task}
            onDeleteTask={onDeleteTask}
            handleToggleComplete={handleToggleComplete}
            handleStartEditing={handleStartEditing}
            editIndex={editIndex}
            editValue={editValue}
            setEditValue={setEditValue}
            handleSaveEdit={handleSaveEdit}
            handleKeyDownEdit={handleKeyDownEdit}
          />
        </div>
      ))}
    </ul>
  );
}

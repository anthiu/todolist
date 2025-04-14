import ButtonDelete from "./ButtonDelete";
import ButtonToggle from "./ButtonToggle";
import EditBox from "./EditBox";

export default function TaskItem({
  index,
  task,
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
    <li key={task.id}>
      <div className="box-todo">
        <ButtonToggle
          handleToggleComplete={handleToggleComplete}
          index={index}
          task={task}
        />
        {editIndex === index ? (
          <EditBox
            index={index}
            editValue={editValue}
            setEditValue={setEditValue}
            handleSaveEdit={handleSaveEdit}
            handleKeyDownEdit={handleKeyDownEdit}
          />
        ) : (
          <p
            onDoubleClick={() => handleStartEditing(index)}
            className={task.completed ? " completed-task" : ""}
          >
            {task.todo}
          </p>
        )}
      </div>
      <ButtonDelete index={index} onDeleteTask={onDeleteTask} />
    </li>
  );
}

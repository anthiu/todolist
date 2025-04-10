import ButtonDelete from "./ButtonDelete";
import ButtonToggle from "./ButtonToggle";
import EditBox from "./EditBox";

export default function TaskItem({
  index,
  task,
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
    <li>
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
            saveEdit={saveEdit}
            handleKeyDownEdit={handleKeyDownEdit}
          />
        ) : (
          <p
            onDoubleClick={() => startEditing(index)}
            className={task.completed ? " completed-task" : ""}
          >
            {task.todo}
          </p>
        )}
      </div>
      <ButtonDelete index={index} deleteTask={deleteTask} />
    </li>
  );
}

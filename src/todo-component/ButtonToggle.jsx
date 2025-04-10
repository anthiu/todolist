export default function ButtonToggle({ handleToggleComplete, index, task }) {
  return (
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => handleToggleComplete(index)}
      className="checkbox"
    />
  );
}

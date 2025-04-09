export default function ButtonToggle({ toggleComplete, index, task }) {
  return (
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => toggleComplete(index)}
      className="checkbox"
    />
  );
}

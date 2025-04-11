export default function ButtonDelete({ onDeleteTask, index }) {
  return (
    <button className="delete" onClick={() => onDeleteTask(index)}></button>
  );
}

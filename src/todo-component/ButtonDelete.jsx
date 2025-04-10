export default function ButtonDelete({ deleteTask, index }) {
  return <button className="delete" onClick={() => deleteTask(index)}></button>;
}

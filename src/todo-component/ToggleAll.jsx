export default function ToggleAll({ tasks, handleToggleAllComplete }) {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all-id"
        className="toggle-all"
        checked={tasks.every((task) => task.completed)}
        onChange={handleToggleAllComplete}
      />
      <label htmlFor="toggle-all"></label>
    </>
  );
}

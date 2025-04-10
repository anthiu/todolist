export default function ToggleAll({ tasks, toggleAllComplete }) {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all-id"
        className="toggle-all"
        checked={tasks.every((task) => task.completed)}
        onChange={toggleAllComplete}
      />
      <label htmlFor="toggle-all"></label>
    </>
  );
}

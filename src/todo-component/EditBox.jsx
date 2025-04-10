export default function EditBox({
  editValue,
  setEditValue,
  saveEdit,
  handleKeyDownEdit,
  index,
}) {
  return (
    <input
      className="edit-box"
      value={editValue}
      type="text"
      onChange={(e) => setEditValue(e.target.value)}
      onBlur={() => saveEdit(index)}
      onKeyDown={(e) => handleKeyDownEdit(e, index)}
      autoFocus
    />
  );
}

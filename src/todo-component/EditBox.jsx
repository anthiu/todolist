export default function EditBox({
  editValue,
  setEditValue,
  handleSaveEdit,
  handleKeyDownEdit,
  index,
}) {
  return (
    <input
      className="edit-box"
      value={editValue}
      type="text"
      onChange={(e) => setEditValue(e.target.value)}
      onBlur={() => handleSaveEdit(index)}
      onKeyDown={(e) => handleKeyDownEdit(e, index)}
      autoFocus
    />
  );
}

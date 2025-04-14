import { useState } from "react";

const useTaskEdit = (tasks, setTasks) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleStartEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index.todos]);
  };

  const handleSaveEdit = (index) => {
    if (!editValue.trim()) {
      const editedTask = [...tasks];
      editedTask[index].todo = editValue;
      setTasks(editedTask);
    }
    setEditIndex(null);
    setEditValue("");
  };

  return {
    editIndex,
    editValue,
    handleSaveEdit,
    handleStartEditing,
    setEditValue,
  };
};
export default useTaskEdit;

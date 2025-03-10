import React, { useState } from "react";
import "./App.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Xử lý Enter khi thêm công việc
  const handleKeyDownAdd = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  // Đánh dấu hoàn thành công việc
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Chỉnh sửa công việc
  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  };

  // Lưu chỉnh sửa
  const saveEdit = (index) => {
    if (editValue.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = editValue;
      setTasks(updatedTasks);
    }
    setEditIndex(null);
    setEditValue("");
  };

  // Xử lý Enter khi chỉnh sửa
  const handleKeyDownEdit = (e, index) => {
    if (e.key === "Enter") {
      saveEdit(index);
    }
  };

  // Lọc công việc theo trạng thái
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const toggleAllComplete = () => {
    const allCompleted = tasks.every((task) => task.completed);
    const updatedTasks = tasks.map((task) => ({
      ...task,
      completed: !allCompleted,
    }));
    setTasks(updatedTasks);
  };

  // Đếm số công việc chưa hoàn thành
  const incompleteTasksCount = tasks.filter((task) => !task.completed).length;

  // Xóa tất cả công việc đã hoàn thành
  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className={`todo-app ${tasks.length > 0 ? "has-tasks" : ""}`}>
      <h1 className="todos">todos</h1>
      <div className="container-input">
        <div className="toggle-all-box">
          {tasks.length > 0 && (
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
          )}
        </div>

        <label class="visually-hidden" for="todo-input">
          New Todo Input
        </label>
        <div className="box">
          <input
            className="new-todo"
            id="todo-input"
            type="text"
            value={newTask}
            onKeyDown={handleKeyDownAdd}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
          />
          <ul className="todo-list">
            {filteredTasks.map((task, index) => (
              <li key={index}>
                <div className="box-todo">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                    className="checkbox"
                  />
                  {editIndex === index ? (
                    <input
                      className="edit-box"
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => saveEdit(index)}
                      onKeyDown={(e) => handleKeyDownEdit(e, index)}
                      autoFocus
                    />
                  ) : (
                    <p
                      className={task.completed ? "completed-task" : ""}
                      onDoubleClick={() => startEditing(index)}
                    >
                      {task.text}
                    </p>
                  )}
                </div>
                <button
                  className="delete"
                  onClick={() => deleteTask(index)}
                ></button>
              </li>
            ))}
          </ul>
          <footer className="footer">
            {tasks.length > 0 && (
              <ul className="filters">
                <span className="todo-count">
                  <strong>
                    {incompleteTasksCount} item
                    {incompleteTasksCount > 1 ? "s" : ""} left!
                  </strong>
                </span>
                <div className="list-filters">
                  <li>
                    <button
                      className={filter === "all" ? "active" : ""}
                      onClick={() => setFilter("all")}
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      className={filter === "active" ? "active" : ""}
                      onClick={() => setFilter("active")}
                    >
                      Active
                    </button>
                  </li>
                  <li>
                    <button
                      className={filter === "completed" ? "active" : ""}
                      onClick={() => setFilter("completed")}
                    >
                      Completed
                    </button>
                  </li>
                </div>
                {/* Thêm nút xóa tất cả công việc hoàn thành */}
                <button className="delete-all" onClick={clearCompletedTasks}>
                  Clear completed
                </button>
              </ul>
            )}
          </footer>
        </div>
      </div>

      {/* Bộ lọc công việc */}

      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by the TodoMVC Team</p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default TodoList;

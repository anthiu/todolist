import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ Lấy danh sách công việc từ API khi component mount
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (response.data && response.data.todos) {
          const randomTasks = response.data.todos
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);
          setTasks(randomTasks);
          console.log(response.data);
        }
      })
      .catch((error) => console.error("Lỗi tải công việc:", error));
  }, []);

  // ✅ Thêm công việc mới
  const addTask = async () => {
    if (!newTask.trim()) return;

    const newTaskObj = { todo: newTask, completed: false, userId: 1 };

    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskObj),
      });

      const data = await response.json();

      if (data && data.todo) {
        // Tạo công việc mới với ID tạm thời
        const newTaskItem = {
          id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
          todo: data.todo,
          completed: data.completed,
        };

        setTasks((prevTasks) => [...prevTasks, newTaskItem]);
        setNewTask("");
      } else {
        console.error("Lỗi thêm công việc:", data);
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    }
  };

  //  Xóa công việc
  const deleteTask = async (id) => {
    try {
      await axios.delete(API_URL + `/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      localStorage.setItem(
        "tasks",
        JSON.stringify(tasks.filter((task) => task.id !== id))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Xử lý Enter khi thêm công việc
  const handleKeyDownAdd = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  //  Đánh dấu hoàn thành công việc

  const toggleComplete = async (id) => {
    try {
      const updatedTask = tasks.find((task) => task.id === id);
      if (!updatedTask) return;

      await axios.patch(`${API_URL}/${id}`, {
        completed: !updatedTask.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật task:", error);
    }
  };

  // Chỉnh sửa công việc
  const startEditing = (id, todo) => {
    setEditIndex(id);
    setEditValue(todo);
  };

  const saveEdit = async (id) => {
    if (!editValue) {
      // Nếu để trống, hủy chế độ chỉnh sửa mà không cập nhật
      setEditIndex(null);
      setEditValue("");
      return;
    }

    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: editValue }),
      });

      if (response.ok) {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, todo: editValue } : task
          )
        );
        setEditIndex(null);
        setEditValue("");
      }
    } catch (error) {
      console.error("Lỗi khi sửa công việc:", error);
    }
  };

  // Xử lý Enter khi chỉnh sửa
  const handleKeyDownEdit = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id);
    }
  };

  // Lọc công việc theo trạng thái
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const toggleAllComplete = async () => {
    const allCompleted = tasks.every((task) => task.completed);

    try {
      // Cập nhật từng công việc qua API
      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          const response = await fetch(
            `https://dummyjson.com/todos/${task.id}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ completed: !allCompleted }),
            }
          );

          const data = await response.json();
          return { ...task, completed: data.completed };
        })
      );

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Lỗi khi cập nhật tất cả công việc:", error);
    }
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

        <label className="visually-hidden" for="todo-input">
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
            {filteredTasks.map((task) => (
              <li key={task.id}>
                <div className="box-todo">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="checkbox"
                  />
                  {editIndex === task.id ? (
                    <input
                      className="edit-box"
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => saveEdit(task.id)}
                      onKeyDown={(e) => handleKeyDownEdit(e, task.id)}
                      autoFocus
                    />
                  ) : (
                    <p
                      className={task.completed ? "completed-task" : ""}
                      onDoubleClick={() => startEditing(task.id)}
                    >
                      {task.todo}
                    </p>
                  )}
                </div>
                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
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

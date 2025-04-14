import React, { useState, useEffect } from "react";
import "./App.css";
import TaskInput from "./todo-component/TaskInput";
import Footer from "./todo-component/Footer";
import Filterbot from "./todo-component/FilterCompleted";
import TaskList from "./todo-component/TaskList";
import ToggleAll from "./todo-component/ToggleAll";
import axios from "axios";

function Filter() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Fetch tasks from API
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/todos?limit=15&skip=130"
        );
        setTasks(response.data.todos);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, []);

  //Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //
  const incompleteTasksCount = tasks.filter((task) => !task.completed).length;

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Add a new task
  function onAddTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [
        ...t,
        { id: tasks.length, todo: newTask, completed: false },
      ]);
      setNewTask("");
    }
  }

  // Delete a task
  function onDeleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // Toggle task completion
  function handleToggleComplete(index) {
    const completedTask = [...tasks];
    completedTask[index].completed = !completedTask[index].completed;
    setTasks(completedTask);
  }

  // Toggle all tasks completion
  function handleToggleAllComplete() {
    const allCompleted = tasks.every((task) => task.completed);
    const updatedTasks = tasks.map((task) => ({
      ...task,
      completed: !allCompleted,
    }));
    setTasks(updatedTasks);
  }

  // Clear completed tasks
  const handleClearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Start editing a task
  const handleStartEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index.todo]);
  };

  // Save edited task
  const handleSaveEdit = (index) => {
    if (!(editValue || "").trim()) {
      setEditIndex(null);
      setEditValue("");
      return;
    }
    if (editValue.trim() !== "") {
      const editedTask = [...tasks];
      editedTask[index].todo = editValue;
      setTasks(editedTask);
    }

    setEditIndex(null);
    setEditValue("");
  };

  const handleKeyDownEdit = (e, index) => {
    if (e.key === "Enter") handleSaveEdit(index);
  };

  return (
    <div className={`todo-app ${tasks.length > 0 ? "has-tasks" : ""}`}>
      <h1 className="todos">todos</h1>
      <div className="container-input">
        <div className="toggle-all-box">
          {tasks.length > 0 && (
            <div>
              <ToggleAll
                tasks={tasks}
                handleToggleAllComplete={handleToggleAllComplete}
              />
            </div>
          )}
        </div>
        <TaskInput
          newTask={newTask}
          setNewTask={setNewTask}
          onAddTask={onAddTask}
        />
        <div className="box">
          <TaskList
            filteredTasks={filteredTasks}
            onDeleteTask={onDeleteTask}
            handleToggleComplete={handleToggleComplete}
            handleStartEditing={handleStartEditing}
            editIndex={editIndex}
            editValue={editValue}
            setEditValue={setEditValue}
            handleSaveEdit={handleSaveEdit}
            handleKeyDownEdit={handleKeyDownEdit}
          />
        </div>
        <Filterbot
          tasks={tasks}
          handleClearCompletedTasks={handleClearCompletedTasks}
          incompleteTasksCount={incompleteTasksCount}
          setFilter={setFilter}
          filter={filter}
        />
        <Footer />
      </div>
    </div>
  );
}

export default Filter;

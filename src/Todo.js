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

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/todos?limit=30&skip=220"
        );
        setTasks(response.data.todos);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, []);

  const incompleteTasksCount = tasks.filter((task) => !task.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { todo: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const onDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const completedTask = [...tasks];
    completedTask[index].completed = !completedTask[index].completed;
    setTasks(completedTask);
  };

  const handleToggleAllComplete = () => {
    const allCompleted = tasks.every((task) => task.completed);
    const updatedTasks = tasks.map((task) => ({
      ...task,
      completed: !allCompleted,
    }));
    setTasks(updatedTasks);
  };

  const handleClearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const handleStartEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index.todo]);
  };

  const handleSaveEdit = (index) => {
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
          addTask={addTask}
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

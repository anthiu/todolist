import React, { useState } from "react";
import "./App.css";
import TaskInput from "./TodoComponent/TaskInput";
import Footer from "./TodoComponent/Footer";
import Filterbot from "./TodoComponent/FilterCompleted";
import TaskList from "./TodoComponent/TaskList";
import ToggleAll from "./TodoComponent/ToggleAll";

function Filter() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "di hoc", completed: false },
    { id: 2, name: "di choi", completed: true },
    { id: 3, name: "di farm", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const incompleteTasksCount = tasks.filter((task) => !task.completed).length;
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { name: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  const toggleComplete = (index) => {
    const completedTask = [...tasks];
    completedTask[index].completed = !completedTask[index].completed;
    setTasks(completedTask);
  };

  const toggleAllComplete = () => {
    const allCompleted = tasks.every((task) => task.completed);
    const updatedTasks = tasks.map((task) => ({
      ...task,
      completed: !allCompleted,
    }));
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index.name]);
  };

  const saveEdit = (index) => {
    if (editValue.trim() !== "") {
      const editedTask = [...tasks];
      editedTask[index].name = editValue;
      setTasks(editedTask);
    }
    setEditIndex(null);
    setEditValue("");
  };

  const handleKeyDownEdit = (e, index) => {
    if (e.key === "Enter") saveEdit(index);
  };

  return (
    <div className={`todo-app ${tasks.length > 0 ? "has-tasks" : ""}`}>
      <h1 className="todos">todos</h1>
      <div className="container-input">
        <div className="toggle-all-box">
          {tasks.length > 0 && (
            <>
              <ToggleAll tasks={tasks} toggleAllComplete={toggleAllComplete} />
            </>
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
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            startEditing={startEditing}
            editIndex={editIndex}
            editValue={editValue}
            setEditValue={setEditValue}
            saveEdit={saveEdit}
            handleKeyDownEdit={handleKeyDownEdit}
          />
        </div>
        <Filterbot
          tasks={tasks}
          clearCompletedTasks={clearCompletedTasks}
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

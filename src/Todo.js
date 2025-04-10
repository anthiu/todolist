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
          "https://dummyjson.com/todos?limit=10&skip=0"
        );

        //   .sort(() => 0.5 - Math.random())
        //   .slice(0, 3);
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

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { todo: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

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

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index.todo]);
  };

  const saveEdit = (index) => {
    if (editValue.trim() !== "") {
      const editedTask = [...tasks];
      editedTask[index].todo = editValue;
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
              <ToggleAll
                tasks={tasks}
                handleToggleAllComplete={handleToggleAllComplete}
              />
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
            handleToggleComplete={handleToggleComplete}
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

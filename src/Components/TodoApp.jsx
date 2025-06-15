// src/components/TodoApp.jsx
import React, { useState, useEffect } from 'react';
import './TodoApp.css'; // import the CSS file

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortAsc, setSortAsc] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = newTask.trim();
    if (trimmed === '') return alert('Please enter a task.');
    setTasks([...tasks, { id: Date.now(), text: trimmed, completed: false }]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortAsc ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
  );

  return (
    <div className="todo-container">
      <h2>React To-Do List</h2>
      <div className="input-section">
        <input
          type="text"
          value={newTask}
          placeholder="Enter a new task..."
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Show All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort {sortAsc ? '↑' : '↓'}
        </button>
      </div>

      <ul className="task-list">
        {sortedTasks.length === 0 && <li className="empty">No tasks to show</li>}
        {sortedTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
            <button onClick={() => removeTask(task.id)} className="delete">✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

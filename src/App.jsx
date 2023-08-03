import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [importanceScore, setImportanceScore] = useState(5);
  const [urgencyScore, setUrgencyScore] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { task: taskInput, importance: importanceScore, urgency: urgencyScore };
    setTasks([...tasks, newTask]);
    setTaskInput('');
    setImportanceScore(5);
    setUrgencyScore(5);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <div>
          <label>Importance:</label>
          <input
            type="range"
            min="0"
            max="10"
            value={importanceScore}
            onChange={(e) => setImportanceScore(parseInt(e.target.value))}
          />
          <span>{importanceScore}</span>
        </div>
        <div>
          <label>Urgency:</label>
          <input
            type="range"
            min="0"
            max="10"
            value={urgencyScore}
            onChange={(e) => setUrgencyScore(parseInt(e.target.value))}
          />
          <span>{urgencyScore}</span>
        </div>
        <button type="submit">Add task</button>
      </form>
      <div className="matrix">
        <div className="quadrant important-urgent">
          <h3>Important & Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance >= 5 && task.urgency >= 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
        </div>
        <div className="quadrant important-not-urgent">
          <h3>Important & Not Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance >= 5 && task.urgency < 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
        </div>
        <div className="quadrant not-important-urgent">
          <h3>Not Important & Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance < 5 && task.urgency >= 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
        </div>
        <div className="quadrant not-important-not-urgent">
          <h3>Not Important & Not Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance < 5 && task.urgency < 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

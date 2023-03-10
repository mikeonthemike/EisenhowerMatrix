import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskCategory, setTaskCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { task: taskInput, category: taskCategory };
    setTasks([...tasks, newTask]);
    setTaskInput('');
    setTaskCategory('');
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
        <select
          value={taskCategory}
          onChange={(e) => setTaskCategory(e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="important-urgent">Important & Urgent</option>
          <option value="important-not-urgent">Important & Not Urgent</option>
          <option value="not-important-urgent">Not Important & Urgent</option>
          <option value="not-important-not-urgent">Not Important & Not Urgent</option>
        </select>
        <button type="submit">Add task</button>
      </form>
      <div class="divTable" className="matrix">
        <div class="divTableBody" >
         
            <div class="divTableRow">
              <div class="divTableCell"
                    className="quadrant important-urgent">
                  <h3>Important & Urgent</h3>
                  <ul>
                    {tasks
                      .filter((task) => task.category === 'important-urgent')
                      .map((task, index) => (
                        <li key={index}>{task.task}</li>
                      ))}
                  </ul>
                </div>
              
              <div class="divTableCell" className="quadrant important-not-urgent">
                  <h3>Important & Not Urgent</h3>
                  <ul>
                    {tasks
                      .filter((task) => task.category === 'important-not-urgent')
                      .map((task, index) => (
                        <li key={index}>{task.task}</li>
                      ))}
                  </ul>
                </div>
            </div>
            <div class="divTableRow">
              <div class="divTableCell" className="quadrant not-important-urgent">
                  <h3>Not Important & Urgent</h3>
                  <ul>
                    {tasks
                      .filter((task) => task.category === 'not-important-urgent')
                      .map((task, index) => (
                        <li key={index}>{task.task}</li>
                      ))}
                  </ul>
               
              </div>
              <div class="divTableCell" className="quadrant not-important-not-urgent">
                  <h3>Not Important & Not Urgent</h3>
                  <ul>
                    {tasks
                      .filter((task) => task.category === 'not-important-not-urgent')
                      .map((task, index) => (
                        <li key={index}>{task.task}</li>
                      ))}
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;

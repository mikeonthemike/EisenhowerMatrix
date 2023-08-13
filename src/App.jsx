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
    <div className="app" align="center">
      <header>
        <h1>Eisenhower Matrix App</h1>
        {/* Additional app-level functions can go here, e.g., login */}
      </header>
      <main>
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
        &nbsp;
        &nbsp;
        &nbsp;
        {/*   
 <table>
<tr>
  <td>      <h3>Important & Not Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance >= 5 && task.urgency < 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
   </td>
  <td>
    <h3>Important & Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance >= 5 && task.urgency >= 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
    </td>
</tr>
  <tr>
  <td>          <h3>Not Important & Not Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance < 5 && task.urgency < 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul></td>
    <td>       <h3>Not Important & Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance < 5 && task.urgency >= 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
</td>
  </tr>
</table>
        */}

        <div class="matrix">
        <div class="matrix-quadrant">
          <h3>Important & Not Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance >= 5 && task.urgency < 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
        </div>
        <div class="matrix-quadrant">
          <h3>Important & Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance >= 5 && task.urgency >= 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
        </div>
        <div class="matrix-quadrant">
          <h3>Not Important & Not Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance < 5 && task.urgency < 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
        </div>

        <div class="matrix-quadrant">
          <h3>Not Important & Urgent</h3>
          <ul>
            {tasks
              .filter((task) => task.importance < 5 && task.urgency >= 5)
              .map((task, index) => (
                <li key={index}>{task.task}</li>
              ))}
          </ul>
        </div>
      </div>
        </main>
      <footer>
        {/* Footer content, if any */}
      </footer>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TaskItem({ task, index, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask(index, editedTask);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-edit">
        <input
          type="text"
          value={editedTask.task}
          onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
        />
        <div>
          <label>Importance:</label>
          <input
            type="range"
            min="0"
            max="10"
            value={editedTask.importance}
            onChange={(e) => setEditedTask({ ...editedTask, importance: parseInt(e.target.value) })}
          />
          <span>{editedTask.importance}</span>
        </div>
        <div>
          <label>Urgency:</label>
          <input
            type="range"
            min="0"
            max="10"
            value={editedTask.urgency}
            onChange={(e) => setEditedTask({ ...editedTask, urgency: parseInt(e.target.value) })}
          />
          <span>{editedTask.urgency}</span>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    );
  }

  return (
    <div className="task-item">
      {task.task}
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

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

  const updateTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [reorderedItem] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedItem);

    // Update importance and urgency based on the new quadrant
    const [importance, urgency] = result.destination.droppableId.split('-').map(Number);
    reorderedItem.importance = importance === 1 ? 7 : 3;
    reorderedItem.urgency = urgency === 1 ? 7 : 3;

    setTasks(newTasks);
  };

  const quadrants = [
    { name: 'Important & Urgent', importance: 1, urgency: 1 },
    { name: 'Important & Not Urgent', importance: 1, urgency: 0 },
    { name: 'Not Important & Urgent', importance: 0, urgency: 1 },
    { name: 'Not Important & Not Urgent', importance: 0, urgency: 0 },
  ];

  return (
    <div className="app" align="center">
      <header>
        <h1>Eisenhower Matrix App</h1>
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

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="matrix">
            {quadrants.map((quadrant) => (
              <Droppable droppableId={`${quadrant.importance}-${quadrant.urgency}`} key={quadrant.name}>
                {(provided) => (
                  <div className="matrix-quadrant" ref={provided.innerRef} {...provided.droppableProps}>
                    <h3>{quadrant.name}</h3>
                    <ul>
                      {tasks
                        .filter((task) => {
                          return (quadrant.importance === 1 ? task.importance >= 5 : task.importance < 5) &&
                                 (quadrant.urgency === 1 ? task.urgency >= 5 : task.urgency < 5);
                        })
                        .map((task, index) => (
                          <Draggable key={`${quadrant.name}-task-${index}`} draggableId={`${quadrant.name}-task-${index}`} index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskItem task={task} index={index} updateTask={updateTask} />
                              </li>
                            )}
                          </Draggable>
                        ))}
                    </ul>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </main>
      <footer>
        {/* Footer content, if any */}
      </footer>
    </div>
  );
}

export default App;
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
      <div>
        <input
          type="text"
          value={editedTask.task}
          onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
        />
        <input
          type="range"
          min="0"
          max="10"
          value={editedTask.importance}
          onChange={(e) => setEditedTask({ ...editedTask, importance: parseInt(e.target.value) })}
        />
        <input
          type="range"
          min="0"
          max="10"
          value={editedTask.urgency}
          onChange={(e) => setEditedTask({ ...editedTask, urgency: parseInt(e.target.value) })}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    );
  }

  return (
    <div>
      {task.task}
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}
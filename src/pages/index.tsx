import { useState, useEffect, useMemo } from "react";


interface Task {
  activity: string;
  price: string;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
}

export default function Home() {
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("education");
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = { activity, price, type, bookingRequired, accessibility };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    setActivity("");
    setPrice("");
    setType("education");
    setBookingRequired(false);
    setAccessibility(0.5);
  };

  const handleDelete = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const taskCount = useMemo(() => tasks.length, [tasks]);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <p>Total tasks: <strong>{taskCount}</strong></p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
          placeholder="Enter activity"
        />
        
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="Enter price (RM)"
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="education">Education</option>
          <option value="recreational">Recreational</option>
          <option value="social">Social</option>
          <option value="diy">DIY</option>
          <option value="charity">Charity</option>
          <option value="cooking">Cooking</option>
          <option value="relaxation">Relaxation</option>
          <option value="music">Music</option>
          <option value="busywork">Busywork</option>
        </select>

        <label className="flexBox">
          <input
            type="checkbox"
            checked={bookingRequired}
            onChange={(e) => setBookingRequired(e.target.checked)}
            className="checkbox"
          />
          <span>Booking Required</span>
        </label>

        <label>
          Accessibility: {accessibility}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={accessibility}
            onChange={(e) => setAccessibility(parseFloat(e.target.value))}
            className="slider"
          />
        </label>

        <button type="submit">Add Task</button>
      </form>

      {tasks.length > 0 ? (
        <table>
          <thead>
            <tr>
            <th>Activity</th>
            <th>Price</th>
            <th>Type</th>
            <th>Booking</th>
            <th>Accessibility</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.activity}</td>
                <td>RM{task.price}</td>
                <td>{task.type}</td>
                <td>{task.bookingRequired ? "Yes" : "No"}</td>
                <td>{task.accessibility}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks added yet.</p>
      )}
    </div>
  );
}

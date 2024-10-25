import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (err) {
      setErrorMsg('Failed to fetch todos');
    }
  };

  const addTodo = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/todos',
        { description: newTask, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask('');
      fetchTodos();
    } catch (err) {
      setErrorMsg('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      setErrorMsg('Failed to delete todo');
    }
  };

  // Function to get the background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-success text-white'; // Green
      case 'Medium':
        return 'bg-warning text-dark'; // Yellow
      case 'High':
        return 'bg-danger text-white'; // Red
      default:
        return '';
    }
  };

  return (
    <div className="container mt-5">
      <h2>To-Do List</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <div className="form-group">
        <label>New Task</label>
        <input type="text" className="form-control" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <button onClick={addTodo} className="btn btn-success mt-3">Add Task</button>

      <h3 className="mt-5">Your Tasks</h3>
      <ul className="list-group">
        {todos.map((todo) => (
          <li className={`list-group-item d-flex justify-content-between align-items-center ${getPriorityColor(todo.priority)}`} key={todo.id}>
            {todo.description} - {todo.priority}
            <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger border">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

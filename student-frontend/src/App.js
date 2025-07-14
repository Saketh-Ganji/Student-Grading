import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = "http://localhost:2000";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch all students
  const getStudents = async () => {
    const res = await axios.get(`${api}/students`);
    setStudents(res.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Add or Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !marks) return alert("Enter both name and marks");

    if (editingId) {
      await axios.put(`${api}/student/${editingId}`, { name, marks: Number(marks) });
      setEditingId(null);
    } else {
      await axios.post(`${api}/students`, { name, marks: Number(marks) });
    }

    setName('');
    setMarks('');
    getStudents();
  };

  const handleEdit = (student) => {
    setName(student.name);
    setMarks(student.marks);
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${api}/student/${id}`);
    getStudents();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎓 Student Grading System</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={e => setMarks(e.target.value)}
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <hr />

      <h3>📋 Student List</h3>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <ul>
          {students.map(student => (
            <li key={student.id}>
              <b>{student.name}</b> - Marks: {student.marks} - Grade: {student.grade}
              <button onClick={() => handleEdit(student)}>✏️</button>
              <button onClick={() => handleDelete(student.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

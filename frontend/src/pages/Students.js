import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/api';

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', year: '', cgpa: '', skills: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, skills: form.skills.split(',').map(s => s.trim()) };
    if (editingId) {
      await updateStudent(editingId, data);
      setEditingId(null);
    } else {
      await createStudent(data);
    }
    setForm({ name: '', email: '', phone: '', department: '', year: '', cgpa: '', skills: '' });
    loadStudents();
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone || '',
      department: student.department,
      year: student.year,
      cgpa: student.cgpa,
      skills: student.skills.join(', ')
    });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      await deleteStudent(id);
      loadStudents();
    }
  };

  return (
    <div>
      <h2>Students</h2>
      <div className="form-card">
        <h3>{editingId ? 'Edit Student' : 'Add Student'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <select value={form.department} onChange={(e) => setForm({...form, department: e.target.value})} required>
                <option value="">Select</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="IT">IT</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="number" value={form.year} onChange={(e) => setForm({...form, year: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>CGPA</label>
              <input type="number" step="0.01" value={form.cgpa} onChange={(e) => setForm({...form, cgpa: e.target.value})} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Skills (comma separated)</label>
              <input value={form.skills} onChange={(e) => setForm({...form, skills: e.target.value})} placeholder="Java, Python, React" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Student</button>
          {editingId && <button type="button" className="btn" onClick={() => { setEditingId(null); setForm({ name: '', email: '', phone: '', department: '', year: '', cgpa: '', skills: '' }); }}>Cancel</button>}
        </form>
      </div>
      <div className="list-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>CGPA</th>
              <th>Skills</th>
              <th>Placed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.department}</td>
                <td>{s.year}</td>
                <td>{s.cgpa}</td>
                <td>{s.skills?.join(', ')}</td>
                <td>{s.placed ? `Yes (${s.placedCompany})` : 'No'}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(s)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
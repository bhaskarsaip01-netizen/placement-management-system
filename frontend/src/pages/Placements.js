import React, { useState, useEffect } from 'react';
import { getPlacements, createPlacement, updatePlacement, deletePlacement, getStudents, getRecruiters } from '../services/api';

function Placements() {
  const [placements, setPlacements] = useState([]);
  const [students, setStudents] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [form, setForm] = useState({ student: '', recruiter: '', jobTitle: '', package: '', status: 'Applied' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadPlacements();
    loadStudents();
    loadRecruiters();
  }, []);

  const loadPlacements = async () => {
    const res = await getPlacements();
    setPlacements(res.data);
  };

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  const loadRecruiters = async () => {
    const res = await getRecruiters();
    setRecruiters(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePlacement(editingId, form);
      setEditingId(null);
    } else {
      await createPlacement(form);
    }
    setForm({ student: '', recruiter: '', jobTitle: '', package: '', status: 'Applied' });
    loadPlacements();
  };

  const handleEdit = (p) => {
    setForm({
      student: p.student?._id || '',
      recruiter: p.recruiter?._id || '',
      jobTitle: p.jobTitle,
      package: p.package,
      status: p.status
    });
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this placement?')) {
      await deletePlacement(id);
      loadPlacements();
    }
  };

  return (
    <div>
      <h2>Placements</h2>
      <div className="form-card">
        <h3>{editingId ? 'Edit Placement' : 'Add Placement'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Student</label>
              <select value={form.student} onChange={(e) => setForm({...form, student: e.target.value})} required>
                <option value="">Select Student</option>
                {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Recruiter</label>
              <select value={form.recruiter} onChange={(e) => setForm({...form, recruiter: e.target.value})} required>
                <option value="">Select Recruiter</option>
                {recruiters.map(r => <option key={r._id} value={r._id}>{r.companyName}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Job Title</label>
              <input value={form.jobTitle} onChange={(e) => setForm({...form, jobTitle: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Package</label>
              <input value={form.package} onChange={(e) => setForm({...form, package: e.target.value})} required placeholder="e.g. 12 LPA" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Placement</button>
          {editingId && <button type="button" className="btn" onClick={() => { setEditingId(null); setForm({ student: '', recruiter: '', jobTitle: '', package: '', status: 'Applied' }); }}>Cancel</button>}
        </form>
      </div>
      <div className="list-card">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Company</th>
              <th>Job Title</th>
              <th>Package</th>
              <th>Status</th>
              <th>Offer Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {placements.map(p => (
              <tr key={p._id}>
                <td>{p.student?.name || 'N/A'}</td>
                <td>{p.recruiter?.companyName || 'N/A'}</td>
                <td>{p.jobTitle}</td>
                <td>{p.package}</td>
                <td><span className={`status-badge status-${p.status}`}>{p.status}</span></td>
                <td>{new Date(p.offerDate).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Placements;
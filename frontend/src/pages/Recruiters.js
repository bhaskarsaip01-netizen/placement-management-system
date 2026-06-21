import React, { useState, useEffect } from 'react';
import { getRecruiters, createRecruiter, updateRecruiter, deleteRecruiter } from '../services/api';

function Recruiters() {
  const [recruiters, setRecruiters] = useState([]);
  const [form, setForm] = useState({ companyName: '', email: '', phone: '', website: '', location: '', industry: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadRecruiters(); }, []);

  const loadRecruiters = async () => {
    const res = await getRecruiters();
    setRecruiters(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateRecruiter(editingId, form);
      setEditingId(null);
    } else {
      await createRecruiter(form);
    }
    setForm({ companyName: '', email: '', phone: '', website: '', location: '', industry: '', description: '' });
    loadRecruiters();
  };

  const handleEdit = (r) => {
    setForm({
      companyName: r.companyName,
      email: r.email,
      phone: r.phone || '',
      website: r.website || '',
      location: r.location || '',
      industry: r.industry || '',
      description: r.description || ''
    });
    setEditingId(r._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this recruiter?')) {
      await deleteRecruiter(id);
      loadRecruiters();
    }
  };

  return (
    <div>
      <h2>Recruiters</h2>
      <div className="form-card">
        <h3>{editingId ? 'Edit Recruiter' : 'Add Recruiter'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input value={form.companyName} onChange={(e) => setForm({...form, companyName: e.target.value})} required />
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
              <label>Website</label>
              <input value={form.website} onChange={(e) => setForm({...form, website: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <input value={form.industry} onChange={(e) => setForm({...form, industry: e.target.value})} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Description</label>
              <input value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Recruiter</button>
          {editingId && <button type="button" className="btn" onClick={() => { setEditingId(null); setForm({ companyName: '', email: '', phone: '', website: '', location: '', industry: '', description: '' }); }}>Cancel</button>}
        </form>
      </div>
      <div className="list-card">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Industry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map(r => (
              <tr key={r._id}>
                <td>{r.companyName}</td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
                <td>{r.location}</td>
                <td>{r.industry}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(r)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(r._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Recruiters;
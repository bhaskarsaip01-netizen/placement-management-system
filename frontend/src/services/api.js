import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Students API
export const getStudents = () => API.get('/students');
export const getStudent = (id) => API.get(`/students/${id}`);
export const createStudent = (data) => API.post('/students', data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// Recruiters API
export const getRecruiters = () => API.get('/recruiters');
export const getRecruiter = (id) => API.get(`/recruiters/${id}`);
export const createRecruiter = (data) => API.post('/recruiters', data);
export const updateRecruiter = (id, data) => API.put(`/recruiters/${id}`, data);
export const deleteRecruiter = (id) => API.delete(`/recruiters/${id}`);

// Placements API
export const getPlacements = () => API.get('/placements');
export const getPlacement = (id) => API.get(`/placements/${id}`);
export const createPlacement = (data) => API.post('/placements', data);
export const updatePlacement = (id, data) => API.put(`/placements/${id}`, data);
export const deletePlacement = (id) => API.delete(`/placements/${id}`);
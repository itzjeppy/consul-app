import axios from 'axios';

const API_BASE = 'http://localhost:5000/skills';


export async function addSkill(payload: {
  consultant_id: number;
  technologies_known: string;
  years_of_experience: number;
  strength_of_skill: string;
}) {
  return axios.post(`${API_BASE}/addSkill`, payload).then(res => res.data);
}

export async function getSkill(skill_id: number) {
  return axios.get(`${API_BASE}/getSkill/${skill_id}`).then(res => res.data);
}

export async function getSkillsByConsultant(consultant_id: number) {
  return axios.get(`${API_BASE}/getSkillsByConsultant/${consultant_id}`).then(res => res.data);
}

export async function getAllSkills() {
  return axios.get(`${API_BASE}/getAllSkills`).then(res => res.data);
}

export async function updateSkill(skill_id: number, data: any) {
  return axios.put(`${API_BASE}/updateSkill/${skill_id}`, data).then(res => res.data);
}

export async function deleteSkill(skill_id: number) {
  return axios.delete(`${API_BASE}/deleteSkill/${skill_id}`).then(res => res.data);
}

export async function getSkillsByEmpId(emp_id: number) {
  return axios.get(`${API_BASE}/getSkillsByEmpId/${emp_id}`).then(res => res.data);
}

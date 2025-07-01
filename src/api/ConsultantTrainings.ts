import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/consultantTraining';

// Add a new consultant training
export async function addConsultantTraining(data: {
    consultant_id: number,
    training_id: number,
    attended_hours: number,
  }) {
    // Log the data being sent to the backend for debugging
    console.log("Sending to backend:", data);
  
    const res = await fetch('http://127.0.0.1:5000/consultantTraining/addConsultantTraining', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      let errorMsg = 'Failed to add consultant training.';
      try {
        const err = await res.json();
        errorMsg = err.error || errorMsg;
        if (err.traceback) {
          // Log backend traceback for local debugging (not shown to user)
          console.error("Backend traceback:", err.traceback);
        }
      } catch (e) {}
      throw new Error(errorMsg);
    }
  
    return res.json();
  }

// Update consultant training by ID
export async function updateConsultantTraining(
  id: number,
  data: { consultant_id: number; training_id: number; attended_hours: number }
) {
  const res = await axios.put(`${BASE_URL}/updateConsultantTraining/${id}`, data);
  return res.data;
}

// Get consultant training by ID
export async function getConsultantTrainingById(id: number) {
  const res = await axios.get(`${BASE_URL}/getConsultantTraining/${id}`);
  return res.data;
}

// Delete consultant training by ID
export async function deleteConsultantTrainingById(id: number) {
  const res = await axios.delete(`${BASE_URL}/deleteConsultantTraining/${id}`);
  return res.data;
}

// Get all consultant trainings
export async function getAllConsultantTrainings() {
  const res = await axios.get(`${BASE_URL}/getAllConsultantTrainings`);
  return res.data;
}

// Get consultant trainings by consultant ID
export async function getConsultantTrainingsByConsultantId(consultant_id: number) {
  const res = await axios.get(`${BASE_URL}/getConsultantTrainingsByConsultantId/${consultant_id}`);
  return res.data;
}
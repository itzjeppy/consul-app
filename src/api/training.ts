import axios from 'axios';

// Backend base URL — change if needed
const BASE_URL = 'http://127.0.0.1:5000/training';

// Add a new training
export async function addTraining(training: {
  training_name: string;
  technologies_learnt: string;
  level_of_training: string; // should be 'Beginner', 'Intermediate', or 'Advanced'
  duration: string;
}) {
  const res = await axios.post(`${BASE_URL}/addTraining`, training);
  return res.data;
}

// Update an existing training
export async function updateTraining(
  training_id: number,
  updates: {
    training_name?: string;
    technologies_learnt?: string;
    level_of_training?: string;
    duration?: string;
  }
) {
  const res = await axios.put(`${BASE_URL}/updateTraining/${training_id}`, updates);
  return res.data;
}

// Get a single training by ID
export async function getTrainingById(training_id: number) {
  const res = await axios.get(`${BASE_URL}/getTraining/${training_id}`);
  return res.data;
}

// Get all trainings
export async function getAllTrainings() {
  const res = await axios.get(`${BASE_URL}/getAllTrainings`);
  // Returns { message, trainings: [...] }
  return res.data.trainings;
}

// Delete a training by ID
export async function deleteTraining(training_id: number) {
  const res = await axios.delete(`${BASE_URL}/deleteTraining/${training_id}`);
  return res.data;
}

// Get multiple trainings by IDs
export async function getTrainingsByIds(ids: number[]) {
  // POST body: { ids: [1,2,3] }
  const res = await axios.post(`${BASE_URL}/getTrainingsByIds`, { ids });
  // Returns a list of training objects
  return res.data;
}
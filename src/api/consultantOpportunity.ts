import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/consultantOpportunity';

async function handleAxiosError(error: any) {
  if (error.response && error.response.data) {
    // Log traceback if present
    if (error.response.data.traceback) {
      console.error("Python traceback:", error.response.data.traceback);
    }
    // Log error message
    console.error("Backend error:", error.response.data.error || error.response.data);
    // Throw the full error response for UI or further handling
    throw error.response.data;
  } else {
    console.error("Network or unknown error:", error);
    throw error;
  }
}

/**
 * Add a new consultant opportunity (apply for an opportunity)
 */
export async function addConsultantOpportunity(
  consultant_id: number,
  opportunity_id: number,
  selection_status: 'Selected' | 'Rejected' | 'Pending',
  remarks?: string
) {
  try {
    const response = await axios.post(`${BASE_URL}/addConsultantOpportunity`, {
      consultant_id,
      opportunity_id,
      selection_status,
      remarks,
    });
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
  }
}

/**
 * Get a consultant opportunity by its ID
 */
export async function getConsultantOpportunityById(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/getConsultantOpportunityById/${id}`);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
  }
}

/**
 * Update a consultant opportunity by its ID
 */
export async function updateConsultantOpportunity(
  id: number,
  updates: {
    consultant_id?: number;
    opportunity_id?: number;
    selection_status?: 'Selected' | 'Rejected' | 'Pending';
    remarks?: string;
  }
) {
  try {
    const response = await axios.put(`${BASE_URL}/updateConsultantOpportunity/${id}`, updates);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
  }
}

/**
 * Delete a consultant opportunity by its ID
 */
export async function deleteConsultantOpportunity(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteConsultantOpportunity/${id}`);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
  }
}

/**
 * Get all consultant opportunities
 */
export async function getAllConsultantOpportunities() {
  try {
    const response = await axios.get(`${BASE_URL}/getAllConsultantOpportunities`);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
  }
}
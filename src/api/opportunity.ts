import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/opportunity';

/**
 * Create a new opportunity
 */
export async function createOpportunity(opportunity: {
  name: string;
  skills_expected: string;
  years_of_experience_required: number;
  deadline: string;
}) {
  const response = await axios.post(`${BASE_URL}/createOpportunity`, opportunity, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data.opportunity;
}

/**
 * Get opportunity by ID
 */
export async function getOpportunityById(id: number) {
  const response = await axios.get(`${BASE_URL}/getOpportunityById/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data.opportunity;
}

/**
 * Update an opportunity by ID
 */
export async function updateOpportunity(
  id: number,
  updates: {
    name?: string;
    skills_expected?: string;
    years_of_experience_required?: number;
    deadline?: string;
  }
) {
  const response = await axios.put(`${BASE_URL}/updateOpportunity/${id}`, updates, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data.opportunity;
}

/**
 * Delete an opportunity by ID
 */
export async function deleteOpportunity(id: number) {
  const response = await axios.delete(`${BASE_URL}/deleteOpportunity/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

/**
 * Get all opportunities
 */
export async function getAllOpportunities() {
  const response = await axios.get(`${BASE_URL}/getAllOpportunities`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data.opportunities || [];
}

/**
 * Get opportunities by a list of IDs
 */
 export async function getOpportunitiesByIds(ids: number[]) {
    try {
        const response = await axios.post(
            'http://127.0.0.1:5000/opportunity/getOpportunities', { ids }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.opportunities;
    } catch (error: any) {
        // Log the full error response for debugging
        if (error.response && error.response.data) {
            console.error("Backend error:", error.response.data);
            // Optionally throw or return this data for further handling in the UI
            throw error.response.data;
        } else {
            console.error("Network or unknown error:", error);
            throw error;
        }
    }
}
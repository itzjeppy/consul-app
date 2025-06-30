import axios from 'axios';

export async function getOpportunitiesByIds(ids: number[]) {
    const response = await axios.post(
        'http://127.0.0.1:5000/opportunity/getOpportunities', { ids }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data.opportunities;
}

export async function getAllOpportunities() {
    const response = await axios.get(
        'http://127.0.0.1:5000/opportunity/getAllOpportunities', {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data.opportunities;
}
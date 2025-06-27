import axios from 'axios';

export async function addUser(body: object) {
  const response = await axios.post(
    'http://127.0.0.1:5000/user/addUser',
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}

export async function ValidateUser(body: object) {
  const response = await axios.post(
    'http://127.0.0.1:5000/user/login',
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}

export async function getUserByEmpId(emp_id: number) {
  const response = await axios.get(
    `http://127.0.0.1:5000/user/by-emp-id/${emp_id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}
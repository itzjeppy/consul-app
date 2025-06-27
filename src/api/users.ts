import axios from 'axios';

export async function addUser(body:object){
    const response = await axios.post(
    'http://127.0.0.1:5000/user/addUser',
    {
      data:body,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data
}

export async function ValidateUser(body:object){
    const response = await axios.post(
    'http://127.0.0.1:5000/user/login',
    {
      data:body,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data
}
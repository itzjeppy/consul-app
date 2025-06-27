import axios from 'axios';

export async function addConsultant(body:object){
    const response = await axios.post(
    'http://127.0.0.1:5000/consultant/addConsultant',
    {
      data:body,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data
}

export async function editConsultant(consultantId:number,body:object){
    const response = await axios.put(
    `http://127.0.0.1:5000/consultant/updateConsultant/${consultantId}`,
    {
      data:body,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data
}

export async function deleteConsultant(consultantId:number){
    const response = await axios.delete(
    `http://127.0.0.1:5000/consultant/deleteConsultant/${consultantId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data
}

export async function getConsultant(consultantId:number){
    const response = await axios.get(
    `http://127.0.0.1:5000/consultant/getConsultantById/${consultantId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data
}

export async function getAllConsultants(){
    const response = await axios.get(
    `http://127.0.0.1:5000/consultant/getAllConsultants`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data
}

export async function getConsultantByEmpId(emp_id: number) {
  const response = await axios.get(
    `http://127.0.0.1:5000/consultant/getConsultantByEmpId/${emp_id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}
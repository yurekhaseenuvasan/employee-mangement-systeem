import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';
export const getAllEmployees=()=>{
 return axios.get(`${BASE_URL}/employees/allemployees`);
}
export const getEmployeeById=(id)=>{
  return axios.get(`${BASE_URL}/employees/${id}`);
}
export const addEmployee=(employeeData)=>{
  return axios.post(`${BASE_URL}/employees/add`, employeeData);
}
export const updateEmployee=(id,employeeData)=>{
  return axios.put(`${BASE_URL}/employees/updateemployee/${id}`, employeeData);
}
import axios, { AxiosError, CanceledError } from "axios";

export default axios.create({
  // baseURL: 'http://localhost:3000/api/people'
  baseURL: 'https://swapi-app-production.up.railway.app/api/people'
});

export { AxiosError, CanceledError };
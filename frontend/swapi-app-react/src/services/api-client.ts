import axios, { AxiosError, CanceledError } from "axios";

export default axios.create({
  // baseURL: 'http://localhost:3000/api/people'
  baseURL: 'http://localhost:3000/api/people'
});

export { AxiosError, CanceledError };
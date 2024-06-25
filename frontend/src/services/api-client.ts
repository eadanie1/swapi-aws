import axios, { AxiosError, CanceledError } from "axios";

export default axios.create({
  // baseURL: 'https://swapi-app-production.up.railway.app/api/people'
  baseURL: 'https://9f728xt7e6.execute-api.eu-north-1.amazonaws.com/dev/api/people'
});

export { AxiosError, CanceledError };
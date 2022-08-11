import axios from 'axios';
export function getAPIClient() {
  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });

  return api;
}

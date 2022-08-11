import axios from 'axios';
export function getAPIClient() {
  const api = axios.create({
    baseURL: '',
  });

  return api;
}

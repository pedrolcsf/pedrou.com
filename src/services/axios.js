import axios from 'axios';
export function getAPIClient() {
  const api = axios.create({
    baseURL: 'pedroferreira.dev',
  });

  return api;
}

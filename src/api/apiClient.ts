import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  () => {
    toast.error('An error has occured');
  },
);

export default api;

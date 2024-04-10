import axios from 'axios';

const baseURL = 'http://localhost:3005';

const api = axios.create({
  baseURL,
});

const apiHelper = {
  get: (path, config) => api.get(path, config),
  post: (path, data, config) => api.post(path, data, config),
  put: (path, data, config) => api.put(path, data, config),
  delete: (path, config) => api.delete(path, config),
};

export default apiHelper;

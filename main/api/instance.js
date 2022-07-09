import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.resolve({error});
  },
);

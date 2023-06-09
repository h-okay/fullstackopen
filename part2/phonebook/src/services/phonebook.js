import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const phonebookService = {
  getAll: async () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
  },
  create: async (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
  },
  delete: async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
  },
  update: async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
  }
};

export default phonebookService;

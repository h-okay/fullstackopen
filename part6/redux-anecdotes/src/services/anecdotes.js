import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (content) => {
  const object = { content, id: getId(), votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const put = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object);
  return response.data;
};

// eslint-disable-next-line
export default { getAll, create, put, getOne };

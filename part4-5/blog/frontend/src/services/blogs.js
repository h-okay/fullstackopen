import axios from "axios";

const getAll = () => {
  const request = axios.get("/api/blog");
  return request.then((response) => response.data);
};

const login = ({ username, password }) => {
  const request = axios.post("/api/login", { username, password });
  return request.then((response) => response.data);
};

const create = ({ title, author, url, user }) => {
  const config = {
    headers: { Authorization: `Bearer ${user}` },
  };
  const request = axios.post("/api/blog", { title, author, url }, config);
  return request.then((response) => response.data);
};

const update = ({ id, title, author, url, likes }) => {
  const request = axios.put(`/api/blog/${id}`, { title, author, url, likes });
  return request.then((response) => response.data);
};

const remove = ({ id, user }) => {
  const config = {
    headers: { Authorization: `Bearer ${user}` },
  };
  const request = axios.delete(`/api/blog/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, login, create, update, remove };

import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (object, user) => {
  const request = await axios.post(baseUrl, object, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return request.data;
};

const update = async (object, user) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return request.data;
};

const remove = async (id, user) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};

const getOne = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const getComments = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}/comments`);
  return request.data;
};

const addComment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return request.data;
};

const deleteComment = async (id, commentId) => {
  await axios.delete(`${baseUrl}/${id}/comments/${commentId}`);
};

export default {
  getAll,
  create,
  update,
  remove,
  getOne,
  getComments,
  addComment,
  deleteComment,
};

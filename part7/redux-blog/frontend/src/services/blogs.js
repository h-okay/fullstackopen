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

export default { getAll, create, update, remove };

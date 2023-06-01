const KEY = "bloggappUser";

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

const loadUser = () => {
  return JSON.parse(window.localStorage.getItem(KEY));
};

const removeUser = () => {
  localStorage.removeItem(KEY);
};

const getToken = () => {
  const user = loadUser();
  return user ? `Bearer ${user.token}` : null;
};

export default {
  saveUser,
  loadUser,
  removeUser,
  getToken
};

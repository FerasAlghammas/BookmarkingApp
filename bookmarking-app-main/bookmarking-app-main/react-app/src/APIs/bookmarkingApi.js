import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const bookmarkApi = {
  getAll: () => axios.get(`${API_BASE_URL}/readAll.php`),
  getOne: (id) => axios.get(`${API_BASE_URL}/readOne.php?id=${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/create.php`, data),
  update: (data) => axios.put(`${API_BASE_URL}/update.php`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/delete.php`, { data: { id } }),
};

export default bookmarkApi;

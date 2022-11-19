import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV != "production"
      ? "http://localhost:5000/api"
      : process.env.REACT_APP_API_URL,
  "Content-Type": "application/json",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = "/login";
    }
  }
);

export default api;


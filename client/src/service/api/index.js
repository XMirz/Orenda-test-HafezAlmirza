import axios from "axios";

export const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: "http://localhost:5000/api"
});

export default apiClient;
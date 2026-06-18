import axios from "axios";

const api = axios.create({
  baseURL: "https://apivideopilotai.duckdns.org",
});

export default api;
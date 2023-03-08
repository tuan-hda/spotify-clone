import axios from "axios"

const https = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://localhost:8888",
  withCredentials: true,
})

export default https

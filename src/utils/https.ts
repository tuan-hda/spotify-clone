import axios, { AxiosError, isAxiosError } from 'axios'

const https = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://localhost:8888',
  withCredentials: true
})

export const spotify = axios.create({
  baseURL: 'https://api.spotify.com/v1'
})

export const handleError = (error: unknown, name?: string) => {
  if (isAxiosError(error)) {
    if (name) {
      console.log(`Axios ${name} Error`)
    }
    const axiosError = error as AxiosError
    if (axiosError.response) {
      console.log(axiosError.response.data)
      console.log(axiosError.response.status)
      console.log(axiosError.response.headers)
    }
  }
}

export default https

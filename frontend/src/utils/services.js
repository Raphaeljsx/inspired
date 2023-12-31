import axios from 'axios'

export const url_DEV = 'http://localhost:3333/'
export const url_PROD = 'https://inspired-database.onrender.com/'

const axiosInstance = axios.create({
  baseURL: url_PROD
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const api = {
  get(endpoint, options = null) {
    return axiosInstance.get(endpoint, options)
  },
  post(endpoint, body, options = null) {
    return axiosInstance.post(endpoint, body, options)
  },
  put(endpoint, body, options = null) {
    return axiosInstance.put(endpoint, body, options)
  },
  delete(endpoint, options = null) {
    return axiosInstance.delete(endpoint, options)
  },
  login(body) {
    return axiosInstance.post('/usuario/login/', body)
  }
}

export function fetchCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}

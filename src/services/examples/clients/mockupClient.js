import axios from 'axios'

const mockupClient = axios.create({
  baseURL: `http://localhost:3004`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/*
 * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
 */
mockupClient.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('user-token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default mockupClient

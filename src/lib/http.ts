import type { InternalAxiosRequestConfig } from 'axios'
import { toLogin } from '@/router'
import { HTTPError, RoboflowError } from '@/types/error'
import axios, { isAxiosError } from 'axios'
import { useNProgress } from './nprogress'
import 'nprogress/nprogress.css'

const nprogress = useNProgress()

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.doNotShowLoading) {
      nprogress.start()
    }

    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => {
    nprogress.done()
    return Promise.reject(err)
  },
)

function isTokenExpired(error: RoboflowError) {
  return error.errorCode === 'auth.invalidToken'
}

instance.interceptors.response.use(
  (response) => {
    nprogress.done()
    return Promise.resolve(response.data)
  },
  (error) => {
    nprogress.done()

    if (isAxiosError(error) && error.response && error.response.data) {
      const { status } = error.response
      const { code, message, details } = error.response.data

      if (status >= 400 && status < 500) {
        error = new RoboflowError(message, status, code, details)

        if (isTokenExpired(error)) {
          localStorage.removeItem('token')
          notification.error({
            title: 'Session expired',
            message: 'Please log in again',
            duration: 3000,
          })
          toLogin()
          return Promise.reject(error)
        }

        return Promise.reject(error)
      }

      return Promise.reject(new HTTPError(message || 'Unexpected error', status))
    }

    return Promise.reject(error)
  },
)

export default instance

import axios from 'axios'

export const AxiosRequest = axios.create({
	baseURL: 'https://2b28d574f3d0f0d6.mokky.dev',
})

AxiosRequest.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

AxiosRequest.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error.response?.status === 401) {
			localStorage.removeItem('token')
			window.location.href = '/login'
		}

		return Promise.reject(error)
	}
)

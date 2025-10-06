import { create } from 'zustand'
import { AxiosRequest } from './axiosRequest'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const useProducts = create(set => ({
	products: [],
	products_by_id: [],
	loading: false,
	del_loading: false,
	add_loading: false,
	edit_loading: false,
	getProducts: async () => {
		set({ loading: true })
		try {
			if (localStorage.getItem('token')) {
				const { data } = await AxiosRequest.get('/Products')
				set({ products: data, loading: false })
			} else {
				const { data } = await axios.get(
					'https://2b28d574f3d0f0d6.mokky.dev/products'
				)
				set({ products: data, loading: false })
			}
		} catch (error) {
			set({ loading: false })
		}
	},

	getProductsById: async id => {
		set({ loading: true })
		try {
			if (localStorage.getItem('token')) {
				const { data } = await AxiosRequest.get('/Products?id=' + id)
				set({ products_by_id: data[0], loading: false })
			} else {
				const { data } = await axios.get(
					'https://2b28d574f3d0f0d6.mokky.dev/products?id=' + id
				)
				set({ products_by_id: data[0], loading: false })
			}
		} catch (error) {
			set({ loading: false })
		}
	},
	getProductsByUserId: async userid => {
		set({ loading: true })
		try {
			if (localStorage.getItem('token')) {
				const { data } = await AxiosRequest.get('/Products?userId=' + userid)
				set({ products_by_id: data, loading: false })
			} else {
				const { data } = await axios.get(
					'https://2b28d574f3d0f0d6.mokky.dev/products?userId=' + userid
				)
				set({ products_by_id: data, loading: false })
			}
		} catch (error) {
			set({ loading: false })
		}
	},

	delProducts: async id => {
		set({ del_loading: true })
		try {
			await AxiosRequest.delete('/Products/' + id)
			await axios.delete('https://2b28d574f3d0f0d6.mokky.dev/products/' + id)
			set(prev => ({
				products: prev.products.filter(item => item.id !== id),
				products_by_id: prev.products_by_id.filter(item => item.id !== id),
				del_loading: false,
			}))
		} catch (error) {
			set({ del_loading: false })
		}
	},

	addProducts: async data => {
		set({ add_loading: true })
		try {
			await AxiosRequest.post('/Products', data)
			await axios.post('https://2b28d574f3d0f0d6.mokky.dev/products', data)
			set(prev => ({
				products: [...prev.products, data],
				add_loading: false,
				products_by_id: [...prev.products_by_id, data],
			}))
		} catch (error) {
			set({ add_loading: false })
		}
	},

	editProducts: async (id, data) => {
		set({ edit_loading: true })
		try {
			await AxiosRequest.put('/Products/' + id, data)
			await axios.put('https://2b28d574f3d0f0d6.mokky.dev/products/' + id, data)
			set(prev => ({
				products: prev.products.map(item =>
					item.id === id ? { ...item, ...data } : item
				),
				edit_loading: false,
				products_by_id: prev.products_by_id.map(item => {
					item.id === id ? { ...item, ...data } : item
				}),
			}))
		} catch (error) {
			set({ edit_loading: false })
		}
	},
}))

export const useProfile = create(set => ({
	user: null,
	loading: false,
	del_loading: false,
	edit_loading: false,
	error: null,
	getUser: async () => {
		set({ loading: true })
		try {
			const { data } = await AxiosRequest.get(
				'/users?id=' + jwtDecode(localStorage.getItem('token'))?.id
			)
			set({ user: data[0], loading: false })
		} catch (error) {
			set({ loading: false, error: error.message })
		}
	},

	delUser: async () => {
		set({ del_loading: true })
		try {
			await AxiosRequest.delete(
				'/users/' + jwtDecode(localStorage.getItem('token'))?.id
			)
			set({ del_loading: false })
			window.location.href = '/'
		} catch (error) {
			set({ del_loading: false, error: error.message })
		}
	},

	editUser: async data => {
		set({ edit_loading: true })
		try {
			await AxiosRequest.patch(
				'/users/' + jwtDecode(localStorage.getItem('token'))?.id,
				data
			)
			set({ edit_loading: false, user: data })
		} catch (error) {
			set({ edit_loading: false, error: error.message })
		}
	},
}))

import { create } from 'zustand'
import { AxiosRequest } from './axiosRequest'

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
			const { data } = await AxiosRequest.get('/Products')
			set({ products: data, loading: false })
		} catch (error) {
			set({ loading: false })
		}
	},

	getProductsById: async id => {
		set({ loading: true })
		try {
			const { data } = await AxiosRequest.get('/Products?userId=' + id)
			set({ products_by_id: data, loading: false })
		} catch (error) {
			set({ loading: false })
		}
	},

	delProducts: async id => {
		set({ del_loading: true })
		try {
			await AxiosRequest.delete('/Products/' + id)
			set(prev => ({
				products: prev.products.filter(item => item.id !== id),
				del_loading: false,
			}))
		} catch (error) {
			set({ del_loading: false })
		}
	},

	addProducts: async data => {
		set({ add_loading: true })
		try {
			await AxiosRequest.post('/Products', data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
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
			set(prev => ({
				products: prev.products.map(item =>
					item.id === id ? { ...item, ...data } : item
				),
				edit_loading: false,
			}))
		} catch (error) {
			set({ edit_loading: false })
		}
	},
}))

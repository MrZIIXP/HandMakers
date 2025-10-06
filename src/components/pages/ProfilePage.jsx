'use client'
import { useRouter } from '@/i18n/navigation'
import { useProducts, useProfile } from '@/store/StoreRequests'
import { jwtDecode } from 'jwt-decode'
import {
	DollarSign,
	Edit3,
	Eye,
	Package,
	Plus,
	Star,
	Upload,
	Video,
	X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { categories } from '../../data/mockData'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Textarea } from '../ui/textarea'
import axios from 'axios'

export function ProfilePage({ onNavigate }) {
	const { addProducts, loading, products_by_id, add_loading, getProductsByUserId } = useProducts()
	const { editUser, user, edit_loading, getUser } = useProfile()
	const [newProductOpen, setNewProductOpen] = useState(false)
	const [newVideoOpen, setNewVideoOpen] = useState(false)
	const [editProfileOpen, setEditProfileOpen] = useState(false)
	const [uploading, setUploading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			router.push("/login")
		}
		else {
			getUser()
		}
	}, [])

	const [newProduct, setNewProduct] = useState({
		title: '',
		description: '',
		category: '',
		userId: user?.id,
		userName: user?.name,
		userImage: user?.image?.image || "",
		Likes: [],
		comments: [],
		image: [],
		price: '',
	})

	useEffect(() => {
		if (localStorage.getItem("token")) {
			getProductsByUserId(jwtDecode(localStorage.getItem('token'))?.id)
		}
	}, [])

	const [error, setError] = useState("")

	const uploadImageToImgBB = async (file) => {

		if (user?.imgBB === "") {
			setError("Вы не можете загружать изображения, пожалуйста вставьте свой ключ в настройках")
			return
		}

		const formData = new FormData()
		formData.append('image', file)
		formData.append('key', user?.imgBB)
		setUploading(true)
		try {
			const { data } = await axios.post('https://api.imgbb.com/1/upload', formData)
			console.log(data)
			if (data.success) {
				setError("")
				return { url: data.data.url, id: data.data.id }
			} else {
				throw new Error(data.error.message || 'Ошибка загрузки')
			}
		} catch (error) {
			console.error('Ошибка загрузки на ImgBB:', error)
			throw error
		}
		finally {
			setUploading(false)
		}
	}


	if (!localStorage.getItem("token")) {
		return (
			<div className='container mx-auto px-4 py-16 text-center'>
				<h1 className='text-2xl font-bold text-gray-900 mb-4'>
					Вход в систему требуется
				</h1>
				<p className='text-gray-600 mb-8'>
					Для доступа к личному кабинету необходимо войти в систему
				</p>
				<div className='space-x-4'>
					<Button onClick={() => onNavigate('login')}>Войти</Button>
					<Button variant='outline' onClick={() => onNavigate('register')}>
						Регистрация
					</Button>
				</div>
			</div>
		)
	}

	const Submit = async (e) => {
		e.preventDefault()
		const obj = {
			name: e.target.name.value || user.name,
			email: e.target.email.value || user.email,
			imgBB: e.target.imgBB.value || user.imgBB,
			location: e.target.location.value || user.location,
			description: e.target.description.value || user.description
		}

		try {
			await editUser({ ...user, ...obj })
		} catch {

		}
	}

	const myProducts = [
		{
			id: '1',
			title: 'Керамическая ваза',
			price: 2500,
			image:
				'https://images.unsplash.com/photo-1675604587136-f91dc1a4473b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjZXJhbWljcyUyMHZhc2V8ZW58MXx8fHwxNzU4NjMyNDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
			category: 'керамика',
			status: 'active',
			views: 156,
			likes: 23,
		},
		{
			id: '2',
			title: 'Набор чашек',
			price: 3200,
			image:
				'https://images.unsplash.com/photo-1678791673777-57274271e434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4NjMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
			category: 'керамика',
			status: 'draft',
			views: 0,
			likes: 0,
		},
	]

	const myVideos = [
		{
			id: '1',
			title: 'Как создать керамическую вазу',
			thumbnail:
				'https://images.unsplash.com/photo-1675604587136-f91dc1a4473b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjZXJhbWljcyUyMHZhc2V8ZW58MXx8fHwxNzU4NjMyNDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
			duration: '12:34',
			views: 1250,
			status: 'published',
		},
	]

	const stats = [
		{
			icon: Package,
			label: 'Товаров',
			value: products_by_id?.length || 0,
			color: 'bg-blue-500',
		},
		{
			icon: Video,
			label: 'Видео',
			value: myVideos.length,
			color: 'bg-purple-500',
		},
	]

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<div className='bg-white border-b border-gray-200'>
				<div className='container mx-auto px-4 py-6'>
					<div className='flex flex-col lg:flex-row gap-6 items-start'>
						<div className='flex items-center space-x-6'>
							<Avatar className='w-24 h-24'>
								<AvatarImage src={user?.avatar} />
								<AvatarFallback className='text-2xl'>
									{user?.name?.charAt(0)}
								</AvatarFallback>
							</Avatar>
							<div>
								<h1 className='text-2xl font-bold text-gray-900'>
									{user?.name}
								</h1>
								<p className='text-gray-600'>{user?.email}</p>
								<p className='text-sm text-gray-500 mt-1'>{user?.location}</p>
							</div>
						</div>

						<div className='flex-1 lg:text-right'>
							<Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
								<DialogTrigger asChild>
									<Button variant='outline'>
										<Edit3 className='w-4 h-4 mr-2' />
										Редактировать профиль
									</Button>
								</DialogTrigger>
								<DialogContent className='sm:max-w-md'>
									<DialogHeader>
										<DialogTitle>Редактировать профиль</DialogTitle>
										<DialogDescription>
											Обновите информацию о себе
										</DialogDescription>
									</DialogHeader>
									<form className='space-y-4' onSubmit={Submit}>
										<div className='space-y-2'>
											<Label htmlFor='name'>Имя</Label>
											<Input name='name' id='name' defaultValue={user?.name} />
										</div>
										<div className='space-y-2'>
											<Label htmlFor='email'>Email</Label>
											<Input
												name='email'
												id='email'
												type='email'
												defaultValue={user?.email}
											/>
										</div>
										<div className='space-y-2'>
											<Label htmlFor='imgBB'>API key from ImgBB</Label>
											<Input
												name='imgBB'
												id='imgBB'
												type='text'
												placeholder='XXXXXXXXXXXXXXX'
											/>
										</div>
										<div className='space-y-2'>
											<Label htmlFor='location'>Местоположение</Label>
											<Input id='location' name='location' defaultValue={user?.location} />
										</div>
										<div className='space-y-2'>
											<Label htmlFor='description'>Описание</Label>
											<Textarea
												name='description'
												id='description'
												defaultValue={user?.description}
											/>
										</div>
										<Button className='w-full'>Сохранить</Button>
									</form>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</div>
			</div>

			{/* Stats */}
			<div className='container mx-auto px-4 py-6'>
				<div className='grid grid-cols-2 gap-4'>
					{stats.map((stat, index) => (
						<Card key={index} className='border-0 shadow-sm'>
							<CardContent className='p-4'>
								<div className='flex items-center space-x-3'>
									<div
										className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}
									>
										<stat.icon className='w-5 h-5 text-white' />
									</div>
									<div>
										<div className='text-2xl font-bold text-gray-900'>
											{stat.value}
										</div>
										<div className='text-sm text-gray-600'>{stat.label}</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<div className='container mx-auto px-4 pb-8'>
				<Tabs defaultValue='products' className='w-full'>
					<TabsList className='grid w-full lg:w-auto grid-cols-4'>
						<TabsTrigger value='products'>Мои товары</TabsTrigger>
						<TabsTrigger value='videos'>Мои видео</TabsTrigger>
						<TabsTrigger value='analytics'>Аналитика</TabsTrigger>
						<TabsTrigger value='settings'>Настройки</TabsTrigger>
					</TabsList>

					<TabsContent value='products' className='mt-6'>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-xl font-semibold'>
								Мои товары ({products_by_id?.length || 0})
							</h2>
							<Dialog open={newProductOpen} onOpenChange={setNewProductOpen}>
								<DialogTrigger asChild>
									<Button>
										<Plus className='w-4 h-4 mr-2' />
										Добавить товар
									</Button>
								</DialogTrigger>
								<DialogContent className='sm:max-w-lg'>
									<DialogHeader>
										<DialogTitle>Добавить новый товар</DialogTitle>
										<DialogDescription>
											Заполните информацию о вашем товаре
										</DialogDescription>
										<div className={`bg-red-100 ${!error && "hidden"} text-red-500 px-4 py-2 rounded-lg`}>
											{error}
										</div>
									</DialogHeader>
									<form style={{scrollbarWidth: "none"}} className='space-y-4 overflow-y-auto h-[60vh]' onSubmit={async (e) => {
										e.preventDefault()
										try {
											if (newProduct.title && newProduct.description && newProduct.price && newProduct.category && newProduct.image?.length > 0) {
												const files = []
												for (const file of Array.from(newProduct.image)) {
													const url = await uploadImageToImgBB(file)
													files.push(url)
												}

												if (files.length > 0 && !error && files.every((item) => typeof item?.url == "string")) {
													await addProducts({ ...newProduct, image: files })
													setNewProductOpen(false)
													setNewProduct({
														title: '',
														description: '',
														category: '',
														userId: user?.id,
														userName: user?.name,
														userImage: user?.image?.image || "",
														Likes: [],
														image: [],
														price: '',
													})
												}
											}
										} catch (error) {
											setError(error.message)
										}
									}}>
										<div className='flex flex-col gap-2'>
											<Label htmlFor='title'>Название</Label>
											<Input id='title' placeholder='Название товара' onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} />
										</div>
										<div className='flex flex-col gap-2'>
											<Label htmlFor='description'>Описание</Label>
											<Textarea
												id='description'
												placeholder='Описание товара'
												onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
											/>
										</div>
										<div className='grid grid-cols-2 gap-4'>
											<div className='flex flex-col gap-2'>
												<Label htmlFor='price'>Цена (₽)</Label>
												<Input id='price' type='number' onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder='0' />
											</div>
											<div className='flex flex-col gap-2'>
												<Label htmlFor='category'>Категория</Label>
												<Select onValueChange={category => setNewProduct({ ...newProduct, category })}>
													<SelectTrigger>
														<SelectValue placeholder='Выберите категорию' />
													</SelectTrigger>
													<SelectContent>
														{categories.slice(1).map(category => (
															<SelectItem key={category} value={category}>
																{category}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className='flex flex-col gap-2'>
											<Label htmlFor='images'>Изображения</Label>
											{newProduct.image.length === 0 ? (
												<label
													htmlFor='images'
													className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer'
												>
													<Upload className='w-8 h-8 text-gray-400 mx-auto mb-2' />
													<p className='text-sm text-gray-600'>Нажмите для загрузки изображений</p>
												</label>
											) : (
												<div className='grid gap-2'>
													{Array.from(newProduct.image).map((url, index) => (
														<div className='w-full h-full relative aspect-square' key={index}>
															<X
																className='p-3 bg-white/60 absolute top-0 right-0 cursor-pointer z-10'
																onClick={async () => {
																	setNewProduct((prev) => ({
																		...prev,
																		image: Array.from(prev.image).filter((_, i) => i !== index),
																	}))
																}}
															/>
															<ImageWithFallback
																src={URL.createObjectURL(url)}
																alt={`preview-${index}`}
																className='w-full h-full object-cover rounded-lg'
															/>
														</div>
													))}
												</div>
											)}
											<input
												type='file'
												accept='image/*'
												id='images'
												className='hidden'
												onChange={async (e) => {
													setNewProduct((prev) => ({
														...prev,
														image: e.target.files,
													}))
												}}
											/>
										</div>
										<Button type='submit' disabled={add_loading || uploading || !newProduct.title || !newProduct.description || !newProduct.price || !newProduct.category || newProduct.image.length === 0} className='w-full'>{add_loading || uploading ? 'Добавление...' : (newProduct.title && newProduct.description && newProduct.price && newProduct.category && newProduct.image?.length > 0) ? "Добавить товар" : "Заполните все поля"}</Button>
									</form>
								</DialogContent>
							</Dialog>
						</div>
						{(products_by_id) ?
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{products_by_id?.map(product => (
									<div key={product.id} className='relative'>
										<div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
											<div className='relative aspect-square'>
												<img
													src={product.image?.[0]?.url}
													alt={product.title}
													className='w-full h-full object-cover'
												/>
												<div className='absolute top-3 right-3'>
													<Button
														size='sm'
														variant='secondary'
														className='w-8 h-8 p-0'
													>
														<Edit3 className='w-4 h-4' />
													</Button>
												</div>
											</div>
											<div className='p-4'>
												<h3 className='font-semibold text-gray-900 mb-2'>
													{product.title}
												</h3>
												<p className='text-lg font-bold text-blue-600 mb-3'>
													{product.price?.toLocaleString()} ₽
												</p>
												<div className='flex items-center justify-between text-sm text-gray-500'>
													<div className='flex items-center space-x-1'>
														<Star className='w-4 h-4' />
														<span>{product.Likes?.length}</span>
													</div>
													<div className='flex items-center space-x-1'>
														<Eye className='w-4 h-4' />
														<span>{product.comments?.length}</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div> : (!loading) ?
								<div className='w-full h-[30vh] flex justify-center items-center bg-gradient-br bg-clip-text font-bold text-2xl from-blue-500 to-blue-100'>Network error</div> :
								<div className='w-full h-[30vh] flex justify-center items-center'><div className='size-[100px] rounded-full border-b-2 border-blue-500 animate-spin' /></div>
						}
					</TabsContent>

					<TabsContent value='videos' className='mt-6'>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-xl font-semibold'>
								Мои видео ({myVideos.length})
							</h2>
							<Dialog open={newVideoOpen} onOpenChange={setNewVideoOpen}>
								<DialogTrigger asChild>
									<Button>
										<Plus className='w-4 h-4 mr-2' />
										Добавить видео
									</Button>
								</DialogTrigger>
								<DialogContent className='sm:max-w-lg'>
									<DialogHeader>
										<DialogTitle>Добавить новое видео</DialogTitle>
										<DialogDescription>
											Загрузите обучающее видео или мастер-класс
										</DialogDescription>
									</DialogHeader>
									<div className='space-y-4'>
										<div>
											<Label htmlFor='videoTitle'>Название видео</Label>
											<Input id='videoTitle' placeholder='Название видео' />
										</div>
										<div>
											<Label htmlFor='videoDescription'>Описание</Label>
											<Textarea
												id='videoDescription'
												placeholder='Описание видео'
											/>
										</div>
										<div>
											<Label htmlFor='videoFile'>Видео файл</Label>
											<div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
												<Video className='w-8 h-8 text-gray-400 mx-auto mb-2' />
												<p className='text-sm text-gray-600'>
													Нажмите для загрузки видео
												</p>
											</div>
										</div>
										<Button className='w-full'>Загрузить видео</Button>
									</div>
								</DialogContent>
							</Dialog>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{myVideos.map(video => (
								<div key={video.id} className='relative'>
									<div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
										<div className='relative aspect-video'>
											<img
												src={video.thumbnail}
												alt={video.title}
												className='w-full h-full object-cover'
											/>
											<div className='absolute top-3 right-3'>
												<Button
													size='sm'
													variant='secondary'
													className='w-8 h-8 p-0'
												>
													<Edit3 className='w-4 h-4' />
												</Button>
											</div>
											<div className='absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded'>
												{video.duration}
											</div>
										</div>
										<div className='p-4'>
											<h3 className='font-semibold text-gray-900 mb-2'>
												{video.title}
											</h3>
											<div className='flex items-center justify-between text-sm text-gray-500'>
												<div className='flex items-center space-x-1'>
													<Eye className='w-4 h-4' />
													<span>{video.views}</span>
												</div>
												<span className='px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs'>
													{video.status === 'published'
														? 'Опубликовано'
														: 'Черновик'}
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</TabsContent>

					<TabsContent value='analytics' className='mt-6'>
						<div className='grid lg:grid-cols-2 gap-6'>
							<Card>
								<CardContent className='p-6'>
									<h3 className='text-lg font-semibold mb-4'>
										Статистика продаж
									</h3>
									<div className='space-y-4'>
										<div className='flex items-center justify-between'>
											<span>Продажи за месяц</span>
											<span className='font-semibold'>12 шт</span>
										</div>
										<div className='flex items-center justify-between'>
											<span>Доход за месяц</span>
											<span className='font-semibold'>34,500 ₽</span>
										</div>
										<div className='flex items-center justify-between'>
											<span>Средний чек</span>
											<span className='font-semibold'>2,875 ₽</span>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className='p-6'>
									<h3 className='text-lg font-semibold mb-4'>
										Популярные товары
									</h3>
									<div className='space-y-3'>
										{myProducts.map((product, index) => (
											<div
												key={product.id}
												className='flex items-center space-x-3'
											>
												<span className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium'>
													{index + 1}
												</span>
												<span className='flex-1'>{product.title}</span>
												<span className='text-sm text-gray-500'>
													{product.views} просмотров
												</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value='settings' className='mt-6'>
						<div className='max-w-2xl space-y-6'>
							<Card>
								<CardContent className='p-6'>
									<h3 className='text-lg font-semibold mb-4'>Уведомления</h3>
									<div className='space-y-4'>
										<div className='flex items-center justify-between'>
											<div>
												<div className='font-medium'>Новые заказы</div>
												<div className='text-sm text-gray-600'>
													Уведомления о новых заказах
												</div>
											</div>
											<Button variant='outline' size='sm'>
												Включено
											</Button>
										</div>
										<div className='flex items-center justify-between'>
											<div>
												<div className='font-medium'>Сообщения</div>
												<div className='text-sm text-gray-600'>
													Уведомления о новых сообщениях
												</div>
											</div>
											<Button variant='outline' size='sm'>
												Включено
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

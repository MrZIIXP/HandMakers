'use client'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { ProductCard } from '../ProductCard'
import { VideoCard } from '../VideoCard'
import { ArrowRight, Star, TrendingUp, Users, Award } from 'lucide-react'
import { mockVideos, mockSellers } from '../../data/mockData'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import { AxiosRequest } from '@/store/axiosRequest'
import { useProducts } from '@/store/StoreRequests'

export function HomePage() {
	const [mockSellers, setMockSellers] = useState(null)
	const [currentImg, setImg] = useState("https://images.unsplash.com/photo-1678791673777-57274271e434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4NjMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")
	const { products: mockProducts, getProducts } = useProducts()


	useEffect(() => {
		const mass = [
			"https://images.unsplash.com/photo-1678791673777-57274271e434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4NjMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
			"https://images.unsplash.com/photo-1715374033196-0ff662284a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBjcmFmdHN8ZW58MXx8fHwxNzU4NTI0MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
			"https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGVzJTIwY3JhZnRzfGVufDF8fHx8MTc1ODYzMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
			"https://images.unsplash.com/photo-1667508868067-4aa2a35cd93c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc1ODYzMjY5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
		]
		let i = 1
		const interval = setInterval(() => {
			if (i === 4) {
				i = 0
			}
			setImg(mass[i])
			i += 1
			console.log(i)
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	const Update = async () => {
		try {
			await getProducts()
			// const { data: data2 } = await AxiosRequest.get("/users")
			setMockSellers([])
		} catch (error) { }
	}

	useEffect(() => {
		Update()
	}, [])

	const featuredProducts = mockProducts?.slice(0, 4)
	const featuredVideos = mockVideos?.slice(0, 3)
	const topSellers = mockSellers?.sort((a, b) => b.subscribers?.length - a.subscribers?.length).slice(0, 3)

	const router = useRouter()

	return (
		<div className=''>
			{/* Hero Section */}
			<section className='relative py-20 bg-cover bg-center overflow-hidden'>
				<div className='absolute inset-0 blur-sm z-0 w-full transition-all duration-500 scale-110' style={{ backgroundImage: `url("${currentImg}")` }} />
				<div className='absolute inset-0 bg-black/20 z-[5] w-full' />
				<div className='container relative z-10 mx-auto px-4'>
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						<div className='space-y-6'>
							<Badge className='bg-blue-100 text-blue-700 hover:bg-blue-100'>
								🎨 Платформа для мастеров
							</Badge>
							<h1 className='text-4xl lg:text-6xl font-bold z-10 text-blue-900 leading-tight'>
								Мир рукоделия
								<span className='block text-blue-600'>в ваших руках</span>
							</h1>
							<p className='text-lg text-gray-300 leading-relaxed'>
								Откройте для себя уникальные изделия ручной работы, созданные
								талантливыми мастерами. Покупайте, продавайте и делитесь своим
								творчеством с сообществом единомышленников.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Button
									size='lg'
									className='bg-blue-600 hover:bg-blue-700 text-lg px-8'
									onClick={() => router.push('/marketplace')}
								>
									Исследовать маркет
									<ArrowRight className='w-5 h-5 ml-2' />
								</Button>
								<Button
									size='lg'
									variant='outline'
									className='border-blue-200 text-blue-600 hover:bg-blue-50 text-lg px-8'
									onClick={() => router.push('/videos')}
								>
									Смотреть видео
								</Button>
							</div>
						</div>
						<div className='relative'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-4'>
									<ImageWithFallback
										src='https://images.unsplash.com/photo-1678791673777-57274271e434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4NjMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
										alt='Керамика ручной работы'
										className='w-full h-48 object-cover rounded-xl'
									/>
									<ImageWithFallback
										src='https://images.unsplash.com/photo-1715374033196-0ff662284a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBjcmFmdHN8ZW58MXx8fHwxNzU4NTI0MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
										alt='Украшения ручной работы'
										className='w-full h-32 object-cover rounded-xl'
									/>
								</div>
								<div className='space-y-4 pt-8'>
									<ImageWithFallback
										src='https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGVzJTIwY3JhZnRzfGVufDF8fHx8MTc1ODYzMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
										alt='Текстиль ручной работы'
										className='w-full h-32 object-cover rounded-xl'
									/>
									<ImageWithFallback
										src='https://images.unsplash.com/photo-1667508868067-4aa2a35cd93c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc1ODYzMjY5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
										alt='Живопись ручной работы'
										className='w-full h-48 object-cover rounded-xl'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className='py-16 bg-blue-50'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						<div className='text-center space-y-2'>
							<div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto'>
								<Users className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-blue-900'>10K+</div>
							<div className='text-gray-600'>Активных мастеров</div>
						</div>
						<div className='text-center space-y-2'>
							<div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto'>
								<Star className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-blue-900'>50K+</div>
							<div className='text-gray-600'>Товаров в каталоге</div>
						</div>
						<div className='text-center space-y-2'>
							<div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto'>
								<TrendingUp className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-blue-900'>100K+</div>
							<div className='text-gray-600'>Довольных покупателей</div>
						</div>
						<div className='text-center space-y-2'>
							<div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto'>
								<Award className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-blue-900'>4.9</div>
							<div className='text-gray-600'>Средний рейтинг</div>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section className='container my-8 mx-auto px-4'>
				<div className='flex items-center justify-between mb-8'>
					<div>
						<h2 className='text-3xl font-bold text-blue-900 mb-2'>
							Рекомендуемые товары
						</h2>
						<p className='text-gray-600'>Лучшие изделия от наших мастеров</p>
					</div>
					<Button
						variant='outline'
						className='border-blue-200 text-blue-600 hover:bg-blue-50'
						onClick={() => router.push('/marketplace')}
					>
						Смотреть все
						<ArrowRight className='w-4 h-4 ml-2' />
					</Button>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{featuredProducts?.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section>

			{/* Top Sellers */}
			<section className='container mx-auto px-4'>
				<div className='flex items-center justify-between mb-8'>
					<div>
						<h2 className='text-3xl font-bold text-blue-900 mb-2'>
							Топ мастеров
						</h2>
						<p className='text-gray-600'>Познакомьтесь с лучшими создателями</p>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{topSellers?.map(seller => (
						<Card
							key={seller.id}
							className='border-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer'
							onClick={() => router.push('/seller', { sellerId: seller.id })}
						>
							<CardContent className='p-6 text-center space-y-4'>
								<div className='w-20 h-20 mx-auto'>
									<ImageWithFallback
										src={seller.avatar}
										alt={seller.name}
										className='w-full h-full object-cover rounded-full'
									/>
								</div>
								<div>
									<h3 className='font-semibold text-gray-900'>{seller.name}</h3>
									<p className='text-sm text-gray-600 mt-1'>
										{seller.location}
									</p>
								</div>
								<div className='flex items-center justify-center space-x-4 text-sm'>
									<div className='flex items-center space-x-1'>
										<Star className='w-4 h-4 text-yellow-500 fill-current' />
										<span>{seller.subscribers?.length}</span>
									</div>
								</div>
								<p className='text-sm text-gray-600 line-clamp-2'>
									{seller.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Featured Videos */}
			<section className='bg-blue-50 my-8 py-16'>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between mb-8'>
						<div>
							<h2 className='text-3xl font-bold text-blue-900 mb-2'>
								Популярные видео
							</h2>
							<p className='text-gray-600'>Учитесь у лучших мастеров</p>
						</div>
						<Button
							variant='outline'
							className='border-blue-200 text-blue-600 hover:bg-blue-50'
							onClick={() => router.push('/videos')}
						>
							Смотреть все
							<ArrowRight className='w-4 h-4 ml-2' />
						</Button>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{featuredVideos.map(video => (
							<VideoCard
								key={video.id}
								video={video}
								onVideoClick={id => console.log('Play video:', id)}
								onSellerClick={id => router.push(`/seller/${seller?.sellerId}`)}
							/>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='bg-gradient-to-r from-blue-600 to-blue-700 py-16'>
				<div className='container mx-auto px-4 text-center text-white'>
					<h2 className='text-3xl font-bold mb-4'>Готовы начать продавать?</h2>
					<p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
						Присоединяйтесь к тысячам мастеров, которые уже зарабатывают на
						своем творчестве
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							size='lg'
							variant='secondary'
							className='bg-white text-blue-600 hover:bg-blue-50 text-lg px-8'
							onClick={() => router.push('/register')}
						>
							Стать продавцом
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='border-blue-300 text-blue-600 hover:bg-blue-50 text-lg px-8'
							onClick={() => router.push('/about')}
						>
							Узнать больше
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}

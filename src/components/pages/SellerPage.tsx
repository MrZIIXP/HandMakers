'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ProductCard } from '../ProductCard'
import { VideoCard } from '../VideoCard'
import {
	MapPin,
	Star,
	Calendar,
	Award,
	MessageCircle,
	Heart,
	Share2,
	ChevronLeft,
	Package,
	Eye,
	Users,
} from 'lucide-react'
import { mockProducts, mockSellers, mockVideos } from '../../data/mockData'

export function SellerPage({ sellerId, onNavigate }) {
	const [isFollowing, setIsFollowing] = useState(false)

	const seller = mockSellers.find(s => s.id === sellerId)
	const sellerProducts = mockProducts.filter(p => p.sellerId === sellerId)
	const sellerVideos = mockVideos.filter(v => v.sellerId === sellerId)

	if (!seller) {
		return (
			<div className='container mx-auto px-4 py-16 text-center'>
				<h1 className='text-2xl font-bold text-gray-900 mb-4'>
					Продавец не найден
				</h1>
				<Button onClick={() => onNavigate('marketplace')}>
					Вернуться к каталогу
				</Button>
			</div>
		)
	}

	const stats = [
		{ icon: Package, label: 'Товаров', value: sellerProducts.length },
		{ icon: Star, label: 'Рейтинг', value: seller.rating },
		{ icon: Award, label: 'Продаж', value: seller.totalSales },
		{ icon: Users, label: 'Подписчиков', value: '1.2K' },
	]

	const achievements = [
		{
			id: '1',
			title: 'Лучший продавец месяца',
			icon: '🏆',
			date: 'Февраль 2024',
		},
		{ id: '2', title: 'Качественный сервис', icon: '⭐', date: 'Январь 2024' },
		{ id: '3', title: 'Надежный партнер', icon: '🛡️', date: 'Декабрь 2023' },
	]

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white'>
				<div className='container mx-auto px-4 py-8'>
					<Button
						variant='ghost'
						onClick={() => onNavigate('marketplace')}
						className='mb-6 text-white hover:bg-white/10'
					>
						<ChevronLeft className='w-4 h-4 mr-2' />
						Назад к каталогу
					</Button>

					<div className='flex flex-col lg:flex-row gap-8 items-start'>
						{/* Profile */}
						<div className='flex flex-col sm:flex-row gap-6 items-center sm:items-start'>
							<Avatar className='w-32 h-32'>
								<AvatarImage src={seller.avatar} />
								<AvatarFallback className='text-3xl'>
									{seller.name.charAt(0)}
								</AvatarFallback>
							</Avatar>

							<div className='text-center sm:text-left space-y-4'>
								<div>
									<h1 className='text-3xl font-bold mb-2'>{seller.name}</h1>
									<div className='flex items-center justify-center sm:justify-start space-x-4 text-blue-100'>
										<div className='flex items-center space-x-1'>
											<MapPin className='w-4 h-4' />
											<span>{seller.location}</span>
										</div>
										<div className='flex items-center space-x-1'>
											<Calendar className='w-4 h-4' />
											<span>
												С {new Date(seller.joinedDate).getFullYear()} года
											</span>
										</div>
									</div>
								</div>

								<p className='text-blue-100 max-w-md'>{seller.description}</p>

								<div className='flex flex-col sm:flex-row gap-3'>
									<Button
										variant='secondary'
										onClick={() => setIsFollowing(!isFollowing)}
										className='bg-white text-blue-600 hover:bg-blue-50'
									>
										<Heart
											className={`w-4 h-4 mr-2 ${
												isFollowing ? 'fill-current' : ''
											}`}
										/>
										{isFollowing ? 'Отписаться' : 'Подписаться'}
									</Button>
									<Button
										variant='outline'
										className='border-white text-white hover:bg-white/10'
									>
										<MessageCircle className='w-4 h-4 mr-2' />
										Написать
									</Button>
									<Button
										variant='outline'
										className='border-white text-white hover:bg-white/10'
									>
										<Share2 className='w-4 h-4' />
									</Button>
								</div>
							</div>
						</div>

						{/* Stats */}
						<div className='flex-1 w-full'>
							<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
								{stats.map((stat, index) => (
									<div
										key={index}
										className='bg-white/10 rounded-lg p-4 text-center'
									>
										<stat.icon className='w-6 h-6 mx-auto mb-2' />
										<div className='text-2xl font-bold'>{stat.value}</div>
										<div className='text-sm text-blue-100'>{stat.label}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 py-8'>
				<Tabs defaultValue='products' className='w-full'>
					<TabsList className='grid w-full lg:w-auto grid-cols-3'>
						<TabsTrigger value='products'>
							Товары ({sellerProducts.length})
						</TabsTrigger>
						<TabsTrigger value='videos'>
							Видео ({sellerVideos.length})
						</TabsTrigger>
						<TabsTrigger value='about'>О продавце</TabsTrigger>
					</TabsList>

					<TabsContent value='products' className='mt-8'>
						{sellerProducts.length > 0 ? (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{sellerProducts.map(product => (
									<ProductCard
										key={product.id}
										product={product}
										onProductClick={id =>
											onNavigate('product', { productId: id })
										}
										onSellerClick={id => onNavigate('seller', { sellerId: id })}
									/>
								))}
							</div>
						) : (
							<div className='text-center py-16'>
								<Package className='w-24 h-24 text-gray-300 mx-auto mb-4' />
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									Пока нет товаров
								</h3>
								<p className='text-gray-600'>
									Продавец еще не добавил товары в каталог
								</p>
							</div>
						)}
					</TabsContent>

					<TabsContent value='videos' className='mt-8'>
						{sellerVideos.length > 0 ? (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{sellerVideos.map(video => (
									<VideoCard
										key={video.id}
										video={video}
										onVideoClick={id => console.log('Play video:', id)}
										onSellerClick={id => onNavigate('seller', { sellerId: id })}
									/>
								))}
							</div>
						) : (
							<div className='text-center py-16'>
								<Eye className='w-24 h-24 text-gray-300 mx-auto mb-4' />
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									Пока нет видео
								</h3>
								<p className='text-gray-600'>
									Продавец еще не загрузил обучающие видео
								</p>
							</div>
						)}
					</TabsContent>

					<TabsContent value='about' className='mt-8'>
						<div className='grid lg:grid-cols-3 gap-8'>
							<div className='lg:col-span-2 space-y-6'>
								<Card>
									<CardContent className='p-6'>
										<h3 className='text-lg font-semibold mb-4'>О мастере</h3>
										<p className='text-gray-700 leading-relaxed mb-4'>
											{seller.description}
										</p>
										<p className='text-gray-700 leading-relaxed'>
											Занимаюсь керамикой уже более 10 лет. Начинала как хобби,
											а теперь это стало делом всей моей жизни. Каждое изделие
											создается с особой любовью и вниманием к деталям.
											Использую только экологически чистые материалы и
											традиционные техники ручной лепки.
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardContent className='p-6'>
										<h3 className='text-lg font-semibold mb-4'>
											Специализация
										</h3>
										<div className='flex flex-wrap gap-2'>
											<Badge variant='secondary'>Керамика</Badge>
											<Badge variant='secondary'>Посуда</Badge>
											<Badge variant='secondary'>Декор для дома</Badge>
											<Badge variant='secondary'>Вазы</Badge>
											<Badge variant='secondary'>Чашки</Badge>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardContent className='p-6'>
										<h3 className='text-lg font-semibold mb-4'>
											Условия работы
										</h3>
										<div className='space-y-3 text-sm'>
											<div>
												<span className='font-medium'>Время изготовления:</span>{' '}
												3-7 дней
											</div>
											<div>
												<span className='font-medium'>Минимальный заказ:</span>{' '}
												1 шт
											</div>
											<div>
												<span className='font-medium'>Доставка:</span> По всей
												России
											</div>
											<div>
												<span className='font-medium'>Оплата:</span> Наличными,
												картой, переводом
											</div>
											<div>
												<span className='font-medium'>Возврат:</span> В течение
												14 дней
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							<div className='space-y-6'>
								<Card>
									<CardContent className='p-6'>
										<h3 className='text-lg font-semibold mb-4'>Достижения</h3>
										<div className='space-y-3'>
											{achievements.map(achievement => (
												<div
													key={achievement.id}
													className='flex items-center space-x-3'
												>
													<span className='text-2xl'>{achievement.icon}</span>
													<div>
														<div className='font-medium text-sm'>
															{achievement.title}
														</div>
														<div className='text-xs text-gray-500'>
															{achievement.date}
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardContent className='p-6'>
										<h3 className='text-lg font-semibold mb-4'>Контакты</h3>
										<div className='space-y-3 text-sm'>
											<div className='flex items-center space-x-2'>
												<MapPin className='w-4 h-4 text-blue-500' />
												<span>{seller.location}</span>
											</div>
											<div className='flex items-center space-x-2'>
												<MessageCircle className='w-4 h-4 text-blue-500' />
												<span>Ответ в течение 2 часов</span>
											</div>
										</div>
										<Button className='w-full mt-4'>
											<MessageCircle className='w-4 h-4 mr-2' />
											Связаться
										</Button>
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

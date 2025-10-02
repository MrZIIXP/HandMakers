'use client'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ProductCard } from '../ProductCard'
import {
	Heart,
	Share2,
	Truck,
	Shield,
	RotateCcw,
	MessageCircle,
	ChevronLeft,
	ThumbsUp,
} from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { useParams } from 'next/navigation'
import { useProducts } from '@/store/StoreRequests'
import { useRouter } from '@/i18n/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"

export function ProductPage({ onNavigate }) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [isFavorited, setIsFavorited] = useState(false)
	const router = useRouter()
	const { marketById: productId } = useParams()
	const { products, products_by_id: product, getProducts, getProductsById } =
		useProducts()

	useEffect(() => {
		getProductsById(productId)
		getProducts()
	}, [])

	const relatedProducts = products
		?.filter(p => p?.category === product?.category && p?.id !== product?.id)

	if (!product) {
		return (
			<div className='container mx-auto px-4 py-16 text-center'>
				<h1 className='text-2xl font-bold text-gray-900 mb-4'>
					Товар не найден
				</h1>
				<Button onClick={() => router.push('/marketplace')}>
					Вернуться к каталогу
				</Button>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Breadcrumb */}
			<div className='bg-white border-b border-gray-200'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center space-x-2 text-sm text-gray-600'>
						<button
							onClick={() => router.push('/home')}
							className='hover:text-blue-600'
						>
							Главная
						</button>
						<span>/</span>
						<button
							onClick={() => router.push('/marketplace')}
							className='hover:text-blue-600'
						>
							Маркет
						</button>
						<span>/</span>
						<span className='text-gray-900'>{product.title}</span>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 py-8'>
				{/* Back Button */}
				<Button
					variant='ghost'
					onClick={() => router.push('/marketplace')}
					className='mb-6'
				>
					<ChevronLeft className='w-4 h-4 mr-2' />
					Назад к каталогу
				</Button>

				<div className='grid lg:grid-cols-2 gap-12'>
					{/* Images */}
					<div className='space-y-4'>
						<div className='aspect-square overflow-hidden rounded-xl bg-white border'>
							<ImageWithFallback
								src={product?.image?.[selectedImageIndex]?.url}
								alt={product?.title}
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='flex space-x-2'>
							{product?.image?.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImageIndex(index)}
									className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index
										? 'border-blue-500'
										: 'border-gray-200'
										}`}
								>
									<ImageWithFallback
										src={image.url}
										alt={`${product?.title} ${index + 1}`}
										className='w-full h-full object-cover'
									/>
								</button>
							))}
						</div>
					</div>

					{/* Product Info */}
					<div className='space-y-6'>
						<div>
							<Badge className='mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100'>
								{product?.category}
							</Badge>
							<h1 className='text-3xl font-bold text-gray-900 mb-4'>
								{product?.title}
							</h1>
							<div className='flex items-center space-x-4 mb-4'>
								<div className='flex items-center flex-row-reverse space-x-1'>
									<span className='text-2xl text-gray-600 ml-2'>
										{product?.Likes?.length || 0}
									</span>
									<ThumbsUp className='text-black fill-red-400'/>
								</div>
							</div>
							<p className='text-3xl font-bold text-blue-600 mb-6'>
								{product?.price?.toLocaleString()} ₽
							</p>
						</div>

						{/* Seller Info */}
						<Card className='border-blue-100'>
							<CardContent className='p-4'>
								<div className='flex items-center space-x-4'>
									<Avatar className='w-12 h-12'>
										<AvatarImage src={product?.userImage} />
										<AvatarFallback>{product?.userName?.charAt(0)}</AvatarFallback>
									</Avatar>
									<div className='flex-1'>
										<button
											onClick={() =>
												router.push('/seller/' + product?.userId)
											}
											className='font-semibold text-gray-900 hover:text-blue-600'
										>
											{product?.userName}
										</button>

									</div>
								</div>
							</CardContent>
						</Card>

						{/* Actions */}
						<div className='space-y-4'>

							<div className='flex flex-col sm:flex-row gap-3 items-center'>
								<Button variant='outline' className='flex-1 h-full'>
									<MessageCircle className='w-5 h-5 mr-2' />
									Написать продавцу
								</Button>
								<Button
									size='lg'
									variant='outline'
									onClick={() => setIsFavorited(!isFavorited)}
									className={isFavorited ? 'text-red-500 border-red-200' : ''}
								>
									<Heart
										className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`}
									/>
								</Button>
								<Button size='lg' variant='outline'>
									<Share2 className='w-5 h-5' />
								</Button>
							</div>
						</div>

						{/* Delivery Info */}
						<div className='space-y-3 pt-6 border-t border-gray-200'>
							<div className='flex items-center space-x-3 text-sm'>
								<Truck className='w-5 h-5 text-blue-500' />
								<span>Бесплатная доставка от 3000 ₽</span>
							</div>
							<div className='flex items-center space-x-3 text-sm'>
								<Shield className='w-5 h-5 text-green-500' />
								<span>Гарантия качества</span>
							</div>
							<div className='flex items-center space-x-3 text-sm'>
								<RotateCcw className='w-5 h-5 text-orange-500' />
								<span>Возврат в течение 14 дней</span>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs */}
				<div className='mt-16'>
					<Tabs defaultValue='description' className='w-full'>
						<TabsList className='grid w-full lg:w-auto grid-cols-2'>
							<TabsTrigger value='description'>Описание</TabsTrigger>
							<TabsTrigger value='reviews'>Отзывы ({product?.comments?.length})</TabsTrigger>
						</TabsList>

						<TabsContent value='description' className='mt-6'>
							<Card>
								<CardContent className='p-6'>
									<p className='text-gray-700 leading-relaxed'>
										{product?.description}
									</p>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value='reviews' className='mt-6'>
							<div className='space-y-6'>
								{product?.comments?.map(review => (
									<Card key={review.id}>
										<CardContent className='p-6'>
											<div className='flex items-start space-x-4'>
												<Avatar>
													<AvatarImage src={review.userImage} />
													<AvatarFallback>
														{review.userName.charAt(0)}
													</AvatarFallback>
												</Avatar>
												<div className='flex-1'>
													<div className='flex items-center space-x-2 mb-2'>
														<span className='font-medium'>
															{review.userName}
														</span>
														<span className='text-sm text-gray-500'>
															{review.date}
														</span>
													</div>
													<p className='text-gray-700'>{review.comment}</p>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</TabsContent>
					</Tabs>
				</div>

				{relatedProducts?.length > 0 && (
					<section className='mt-16'>
						<h2 className='text-2xl font-bold text-gray-900 mb-8'>
							Похожие товары
						</h2>
						<Swiper slidesPerView={4} spaceBetween={16} draggable>
							{relatedProducts?.map((product, ind) => (
								<SwiperSlide>
									<ProductCard key={ind} product={product} />
								</SwiperSlide>
							))}
						</Swiper>
					</section>
				)}
			</div>
		</div>
	)
}

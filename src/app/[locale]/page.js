'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowRight, Star, TrendingUp, Users, Award, Heart } from 'lucide-react'
import { usePathname } from '@/i18n/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { HomePage } from '@/components/pages/HomePage'
export default function Home() {
	const t = useTranslations('HomePage')
	const pathname = usePathname()
	const [products, setProducts] = useState()

	const get = async () => {
		try {
			const { data } = await axios.get(
				'https://2b28d574f3d0f0d6.mokky.dev/Products'
			)
			setProducts(data)
		} catch (error) {}
	}

	useEffect(() => {
		get()
	}, [])

	const thiss = false

	if (thiss) {
		return (
			<div className='space-y-16'>
				<section className='relative bg-gradient-to-br from-blue-50 to-white py-20'>
					<div className='container mx-auto px-4'>
						<div className='grid lg:grid-cols-2 gap-12 items-center'>
							<div className='space-y-6'>
								<div className='bg-blue-100 font-bold p-1 text-xs w-fit rounded-lg text-blue-700 hover:bg-blue-100'>
									🎨 Платформа для мастеров
								</div>
								<h1 className='text-4xl lg:text-6xl font-bold text-blue-900 leading-tight'>
									Мир рукоделия
									<span className='block text-blue-600'>в ваших руках</span>
								</h1>
								<p className='text-lg text-gray-600 leading-relaxed'>
									Откройте для себя уникальные изделия ручной работы, созданные
									талантливыми мастерами. Покупайте, продавайте и делитесь своим
									творчеством с сообществом единомышленников.
								</p>
								<div className='flex flex-col sm:flex-row gap-4'>
									<button className='bg-blue-600 flex items-center rounded-lg py-2 text-white hover:bg-blue-700 text-lg px-6'>
										Исследовать маркет
										<ArrowRight className='w-5 h-5 ml-2' />
									</button>
									<button className='border-blue-200 rounded-lg border text-blue-600 hover:bg-blue-50 text-lg px-8'>
										Смотреть видео
									</button>
								</div>
							</div>
							<div className='relative'>
								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-4 relative'>
										<div className='w-full relative h-48'>
											<Image
												src='/images/Home/photo-1678791673777-57274271e434.jpg'
												alt='Керамика ручной работы'
												className='w-full bg-gray-300 h-48 object-cover rounded-xl'
												fill
											/>
										</div>
										<div className='w-full relative h-32'>
											<Image
												src='/images/Home/photo-1715374033196-0ff662284a7e.jpg'
												alt='Украшения ручной работы'
												className='w-full bg-gray-300 h-32 object-cover rounded-xl'
												fill
											/>
										</div>
									</div>
									<div className='space-y-4 pt-8'>
										<div className='w-full relative h-32'>
											<Image
												src='/images/Home/photo-1755991699037-73eb5dff62f5.jpg'
												alt='Текстиль ручной работы'
												className='w-full bg-gray-300 h-32 object-cover rounded-xl'
												fill
											/>
										</div>
										<div className='w-full relative h-48'>
											<Image
												src='/images/Home/photo-1667508868067-4aa2a35cd93c.jpg'
												alt='Живопись ручной работы'
												className='w-full bg-gray-300 h-48 object-cover rounded-xl'
												fill
											/>
										</div>
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
				<section className='container mx-auto px-4'>
					<div className='flex items-center justify-between mb-8'>
						<div>
							<h2 className='text-3xl font-bold text-blue-900 mb-2'>
								Рекомендуемые товары
							</h2>
							<p className='text-gray-600'>Лучшие изделия от наших мастеров</p>
						</div>
						<button
							variant='outline'
							className='border-blue-200 text-blue-600 hover:bg-blue-50'
						>
							Смотреть все
							<ArrowRight className='w-4 h-4 ml-2' />
						</button>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{products?.slice(0, 4).map(item => (
							<div
								className='w-full rounded-3xl border border-blue-500'
								key={item?.id}
							>
								<div className='relative w-full h-72 rounded-t-3xl group scale-[1.005] overflow-hidden'>
									<Image
										alt=''
										src='/images/Home/photo-1667508868067-4aa2a35cd93c.jpg'
										fill
										className='bg-gray-500 object-cover cursor-pointer hover:scale-110 transition-all duration-300 rounded-t-3xl'
									/>
									<div className='size-10 transition-all duration-200 absolute top-5 right-5 items-center justify-center group-hover:opacity-100 flex opacity-0 rounded-full bg-white/60'>
										<Heart />
									</div>
								</div>
								<div className='p-5 gap-2 flex flex-col justify-between'>
									<p className='hover:text-blue-500 font-semibold transition-all duration-200 leading-4 cursor-pointer'>
										{item.product}
									</p>
									<p className='hover:text-blue-500 transition-all font-light duration-200 leading-4 cursor-pointer'>
										{item.description?.slice(0, 80)}
									</p>
								</div>
							</div>
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
							<p className='text-gray-600'>
								Познакомьтесь с лучшими создателями
							</p>
						</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'></div>
				</section>

				{/* Featured Videos */}
				<section className='bg-blue-50 py-16'>
					<div className='container mx-auto px-4'>
						<div className='flex items-center justify-between mb-8'>
							<div>
								<h2 className='text-3xl font-bold text-blue-900 mb-2'>
									Популярные видео
								</h2>
								<p className='text-gray-600'>Учитесь у лучших мастеров</p>
							</div>
							<button
								variant='outline'
								className='border-blue-200 text-blue-600 hover:bg-blue-50'
							>
								Смотреть все
								<ArrowRight className='w-4 h-4 ml-2' />
							</button>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'></div>
					</div>
				</section>

				{/* CTA Section */}
				<section className='bg-gradient-to-r from-blue-600 to-blue-700 py-16'>
					<div className='container mx-auto px-4 text-center text-white'>
						<h2 className='text-3xl font-bold mb-4'>
							Готовы начать продавать?
						</h2>
						<p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
							Присоединяйтесь к тысячам мастеров, которые уже зарабатывают на
							своем творчестве
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<button
								variant='secondary'
								className='bg-white text-blue-600 hover:bg-blue-50 text-lg px-8'
								onClick={() => onNavigate('register')}
							>
								Стать продавцом
							</button>
							<button
								variant='outline'
								className='border-blue-300 hover:bg-blue-600 text-lg px-8'
								onClick={() => onNavigate('about')}
							>
								Узнать больше
							</button>
						</div>
					</div>
				</section>
			</div>
		)
	}

	return(<HomePage />)
}

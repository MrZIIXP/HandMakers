'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { VideoCard } from '../VideoCard'
import { Search, Filter, Play, Clock, Eye } from 'lucide-react'
import { mockVideos } from '../../data/mockData'

export function VideosPage({ onNavigate }) {
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState('recent')
	const [categoryFilter, setCategoryFilter] = useState('all')

	const categories = [
		'all',
		'керамика',
		'живопись',
		'украшения',
		'вязание',
		'текстиль',
		'дерево',
	]

	const filteredVideos = mockVideos.filter(video => {
		const matchesSearch = video.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
		const matchesCategory =
			categoryFilter === 'all' ||
			video.title.toLowerCase().includes(categoryFilter)
		return matchesSearch && matchesCategory
	})

	const sortedVideos = [...filteredVideos].sort((a, b) => {
		switch (sortBy) {
			case 'views':
				return b.views - a.views
			case 'recent':
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			default:
				return 0
		}
	})

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='bg-gradient-to-br from-blue-600 to-blue-700 py-16 text-white'>
				<div className='container mx-auto px-4 text-center'>
					<div className='max-w-3xl mx-auto space-y-6'>
						<h1 className='text-4xl font-bold'>Мастер-классы и видео</h1>
						<p className='text-xl text-blue-100'>
							Изучайте техники рукоделия от профессиональных мастеров. Пошаговые
							инструкции и секреты мастерства.
						</p>
						<div className='flex items-center justify-center space-x-8 pt-4'>
							<div className='flex items-center space-x-2'>
								<Play className='w-5 h-5' />
								<span>200+ видео</span>
							</div>
							<div className='flex items-center space-x-2'>
								<Clock className='w-5 h-5' />
								<span>100+ часов контента</span>
							</div>
							<div className='flex items-center space-x-2'>
								<Eye className='w-5 h-5' />
								<span>50K+ просмотров</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Filters */}
			<section className='bg-white border-b border-gray-200 py-6'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
						<div className='flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl'>
							<div className='relative flex-1'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
								<Input
									placeholder='Поиск видео...'
									value={searchQuery}
									onChange={e => setSearchQuery(e.target.value)}
									className='pl-10 border-gray-300'
								/>
							</div>
							<Select value={categoryFilter} onValueChange={setCategoryFilter}>
								<SelectTrigger className='w-full sm:w-48'>
									<SelectValue placeholder='Категория' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>Все категории</SelectItem>
									{categories.slice(1).map(category => (
										<SelectItem key={category} value={category}>
											{category.charAt(0).toUpperCase() + category.slice(1)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2 text-sm text-gray-600'>
								<Filter className='w-4 h-4' />
								<span>Сортировка:</span>
							</div>
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className='w-40'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='recent'>Новые</SelectItem>
									<SelectItem value='views'>По просмотрам</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</section>

			{/* Videos Grid */}
			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<div className='mb-6'>
						<p className='text-gray-600'>
							Найдено {sortedVideos.length} видео
							{sortedVideos.length !== 1 && sortedVideos.length < 5 ? 'а' : ''}
						</p>
					</div>

					{sortedVideos.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{sortedVideos.map(video => (
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
							<div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Play className='w-12 h-12 text-gray-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Видео не найдены
							</h3>
							<p className='text-gray-600 mb-6'>
								Попробуйте изменить параметры поиска
							</p>
							<Button
								variant='outline'
								onClick={() => {
									setSearchQuery('')
									setCategoryFilter('all')
									setSortBy('recent')
								}}
							>
								Сбросить фильтры
							</Button>
						</div>
					)}
				</div>
			</section>

			{/* Popular Categories */}
			<section className='bg-blue-50 py-16'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-blue-900 mb-4'>
							Популярные категории
						</h2>
						<p className='text-gray-600 max-w-2xl mx-auto'>
							Изучайте различные техники рукоделия от профессиональных мастеров
						</p>
					</div>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
						{categories.slice(1).map(category => (
							<Button
								key={category}
								variant='outline'
								className='h-16 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
								onClick={() => setCategoryFilter(category)}
							>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</Button>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

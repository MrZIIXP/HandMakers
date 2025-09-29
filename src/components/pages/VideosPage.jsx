'use client'
import { Button } from '../ui/button'
import { VideoCard } from '../VideoCard'
import { mockVideos } from '../../data/mockData'
import { PlayCircle } from 'lucide-react'

export function VideosPage() {
	return (
		<div className='min-h-screen bg-gray-50'>

			<section className='py-12'>
				<div className='container mx-auto px-4'>
					{mockVideos.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{mockVideos.map(video => (
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
								<PlayCircle className='w-12 h-12 text-gray-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Видео не найдены
							</h3>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}

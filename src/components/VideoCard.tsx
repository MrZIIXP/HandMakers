import { Play, Eye, Clock, User } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function VideoCard({ video, onVideoClick, onSellerClick }) {
	return (
		<div className='bg-white rounded-xl border border-blue-100 overflow-hidden hover:shadow-lg transition-all duration-300 group'>
			{/* Thumbnail */}
			<div className='relative aspect-video overflow-hidden'>
				<ImageWithFallback
					src={video.thumbnail}
					alt={video.title}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer'
					onClick={() => onVideoClick(video.id)}
				/>
				<div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
					<div className='w-12 h-12 bg-white/90 rounded-full flex items-center justify-center'>
						<Play className='w-6 h-6 text-blue-600 ml-1' />
					</div>
				</div>
				<div className='absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded'>
					{video.duration}
				</div>
			</div>

			{/* Content */}
			<div className='p-4 space-y-3'>
				<h3
					className='font-semibold text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors'
					onClick={() => onVideoClick(video.id)}
				>
					{video.title}
				</h3>

				{/* Seller */}
				<div className='flex items-center space-x-2'>
					<div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
						<User className='w-4 h-4 text-blue-600' />
					</div>
					<button
						onClick={() => onSellerClick(video.sellerId)}
						className='text-sm text-gray-600 hover:text-blue-600 transition-colors'
					>
						{video.sellerName}
					</button>
				</div>

				{/* Stats */}
				<div className='flex items-center justify-between text-sm text-gray-500'>
					<div className='flex items-center space-x-1'>
						<Eye className='w-4 h-4' />
						<span>{video.views.toLocaleString()} просмотров</span>
					</div>
					<div className='flex items-center space-x-1'>
						<Clock className='w-4 h-4' />
						<span>{new Date(video.createdAt).toLocaleDateString('ru-RU')}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

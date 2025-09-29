import { Heart, Star, Eye } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useRouter } from '@/i18n/navigation'

export function ProductCard({ product }) {
	const router = useRouter()
	return (
		<div className='bg-white flex flex-col justify-between rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 group'>
			{/* Image */}
			<div className='relative aspect-square overflow-hidden'>
				<ImageWithFallback
					src={product?.image?.[0]?.url}
					alt={product?.product}
					onClick={() => router.push(`/marketplace/${product?.id}`)}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer'
				/>
				<div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
					<Button
						size='sm'
						variant='secondary'
						className='w-8 h-8 p-0 rounded-full bg-white/90'
					>
						<Heart className='w-4 h-4' />
					</Button>
				</div>
				{/* <Badge className='absolute top-3 left-3 bg-blue-500 hover:bg-blue-500'>
					{product?.category}
				</Badge> */}
			</div>

			{/* Content */}
			<div className='p-4 h-full grid items-end'>
				<div className='self-start	'>
					<h3
						className='font-semibold text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors'
						onClick={() => router.push(`/marketplace/${product?.id}`)}
					>
						{product?.product}
					</h3>
					<p className='text-sm text-gray-600 line-clamp-2 mt-1'>
						{product?.description}
					</p>
				</div>

				{/* Seller */}
				<div className='flex items-center space-x-2'>
					<div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
						<span className='text-xs font-semibold text-blue-600'>
							{product?.userName?.charAt(0)}
						</span>
					</div>
					<button
						onClick={e => {
							e.stopPropagation()
							router.push(`/seller/${product?.UserId}`)
						}}
						className='text-sm text-gray-600 hover:text-blue-600 transition-colors'
					>
						{product?.userName}
					</button>
				</div>

				{/* Price and Actions */}
				<div className='flex items-center justify-between pt-2'>
					<div className='flex items-center space-x-2'>
						<span className='text-lg font-semibold text-blue-600'>
							{product?.price?.toLocaleString()} ₽
						</span>
					</div>
					<div className='flex items-center space-x-2'>
						<div className='flex items-center space-x-1 text-yellow-500'>
							<Star className='w-4 h-4 fill-current' />
							<span className='text-sm text-gray-600'>{product?.Likes}</span>
						</div>
						<div className='flex items-center space-x-1 text-gray-500'>
							<Eye className='w-4 h-4' />
							<span className='text-sm'>156</span>
						</div>
						<div className='flex items-center space-x-1 text-gray-500'>
							<Heart className='w-4 h-4 text-red-500' />
							<span className='text-sm'>{product?.Favourites}</span>
						</div>
					</div>
				</div>

				<Button
					className='w-full bg-blue-600 hover:bg-blue-700'
					onClick={() => router.push(`/marketplace/${product?.id}`)}
				>
					Подробнее
				</Button>
			</div>
		</div>
	)
}

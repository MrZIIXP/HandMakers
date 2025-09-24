"use client"

import { useState } from 'react'
import { Heart, Search, ShoppingCart, User, Menu, X } from 'lucide-react'

export function Header({ currentPage, onNavigate, isLoggedIn }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const navigationItems = [
		{ id: 'home', label: 'Главная' },
		{ id: 'videos', label: 'Видео' },
		{ id: 'marketplace', label: 'Маркет' },
		{ id: 'about', label: 'О нас' },
		{ id: 'contact', label: 'Контакты' }
	]

	return (
		<header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div
						className="flex items-center space-x-2 cursor-pointer"
					>
						<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
							<Heart className="w-5 h-5 text-white" />
						</div>
						<span className="text-xl font-semibold text-blue-900">Рукоделие</span>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-6">
						{navigationItems.map((item) => (
							<button
								key={item.id}
								className={`px-3 py-2 rounded-lg transition-colors ${currentPage === item.id
									? 'text-blue-600 bg-blue-50'
									: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
									}`}
							>
								{item.label}
							</button>
						))}
					</nav>

					{/* Search */}
					<div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
						<Search className="pl-10 border-blue-200 focus:border-blue-400" />
					</div>
				</div>

				{/* Right Actions */}
				<div className="flex items-center space-x-3">
					{isLoggedIn ? (
						<>
							<button
								variant="ghost"
								size="sm"
								className="hidden sm:flex text-gray-600 hover:text-blue-600"
							>
								<User className="w-4 h-4 mr-2" />
								Профиль
							</button>
							<button
								variant="ghost"
								size="sm"
								className="relative"
							>
								<ShoppingCart className="w-4 h-4" />
								<Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-blue-500">
									3
								</Badge>
							</button>
						</>
					) : (
						<div className="hidden sm:flex items-center space-x-2">
							<button
								variant="ghost"
								size="sm"
								className="text-gray-600 hover:text-blue-600"
							>
								Войти
							</button>
							<button
								size="sm"
								className="bg-blue-600 hover:bg-blue-700"
							>
								Регистрация
							</button>
						</div>
					)}

					{/* Mobile Menu button */}
					<button
						variant="ghost"
						size="sm"
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden border-t border-blue-100 py-4">
					<nav className="flex flex-col space-y-2">
						{navigationItems.map((item) => (
							<button
								key={item.id}
								onClick={() => {
									setIsMenuOpen(false)
								}}
								className={`text-left px-4 py-2 rounded-lg transition-colors ${currentPage === item.id
									? 'text-blue-600 bg-blue-50'
									: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
									}`}
							>
								{item.label}
							</button>
						))}
						{!isLoggedIn && (
							<div className="flex flex-col space-y-2 pt-2 border-t border-blue-100 mt-2">
								<button
									variant="ghost"
									size="sm"
									onClick={() => {
										setIsMenuOpen(false)
									}}
									className="justify-start text-gray-600 hover:text-blue-600"
								>
									Войти
								</button>
								<button
									size="sm"
									onClick={() => {
										setIsMenuOpen(false)
									}}
									className="justify-start bg-blue-600 hover:bg-blue-700"
								>
									Регистрация
								</button>
							</div>
						)}
					</nav>
				</div>
			)}
		</header >
	)
}
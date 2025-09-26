'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Heart, Search, ShoppingCart, User, Menu, X } from 'lucide-react'

export function Header({ login = false }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Определяем текущую страницу по pathname
  const getCurrentPage = () => {
    if (pathname === '/en'|| pathname === "/tj" || pathname === "en") return 'home'
    if (pathname.includes('/videos')) return 'videos'
    if (pathname.includes('/marketplace')) return 'marketplace'
    if (pathname.includes('/about')) return 'about'
    if (pathname.includes('/contact')) return 'contact'
    if (pathname.includes('/profile')) return 'profile'
    return ''
  }

  const currentPage = getCurrentPage()

  const navigationItems = [
    { id: 'home', label: 'Главная', href: '/' },
    { id: 'videos', label: 'Видео', href: '/videos' },
    { id: 'marketplace', label: 'Маркет', href: '/marketplace' },
    { id: 'about', label: 'О нас', href: '/about' },
    { id: 'contact', label: 'Контакты', href: '/contact' }
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-blue-900">Рукоделие</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`px-3 py-2 rounded-lg transition-colors ${currentPage === item.id
                    ? 'text-blue-600 bg-blue-50 font-medium'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск товаров..."
                className="pl-10 border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {login ? (
              <>
                <Link href="/profile" className="hidden sm:flex">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Профиль
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-blue-500">
                    3
                  </Badge>
                </Button>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Войти
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Регистрация
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-100 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${currentPage === item.id
                      ? 'text-blue-600 bg-blue-50 font-medium'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              {!login && (
                <div className="flex flex-col space-y-2 pt-2 border-t border-blue-100 mt-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start text-gray-600 hover:text-blue-600 w-full"
                    >
                      Войти
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      size="sm"
                      className="justify-start bg-blue-600 hover:bg-blue-700 w-full"
                    >
                      Регистрация
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
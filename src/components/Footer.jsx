import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-blue-50 border-t border-blue-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-blue-900">Рукоделие</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Платформа для мастеров и любителей рукоделия. Продавайте и покупайте уникальные изделия ручной работы.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-900">Навигация</h3>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Главная', href: '/' },
                { id: 'videos', label: 'Видео', href: '/videos' },
                { id: 'marketplace', label: 'Маркет', href: '/marketplace' },
                { id: 'about', label: 'О нас', href: '/about' }
              ].map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-900">Категории</h3>
            <ul className="space-y-2">
              {[
                'Керамика',
                'Живопись',
                'Украшения',
                'Вязание',
                'Текстиль',
                'Деревянные изделия'
              ].map((category) => (
                <li key={category}>
                  <Link href="/marketplace" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-900">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 text-sm">info@rukodelie.ru</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 text-sm">+7 (800) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 text-sm">Москва, Россия</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Рукоделие. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
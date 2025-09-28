"use client"

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Heart, Users, Award, Target, Shield, Zap, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Качество',
      description: 'Мы тщательно отбираем мастеров и проверяем качество каждого изделия'
    },
    {
      icon: Users,
      title: 'Сообщество',
      description: 'Объединяем мастеров и покупателей в единое сообщество любителей рукоделия'
    },
    {
      icon: Shield,
      title: 'Надежность',
      description: 'Гарантируем безопасные сделки и защиту интересов всех участников'
    },
    {
      icon: Zap,
      title: 'Инновации',
      description: 'Используем современные технологии для удобства покупок и продаж'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Активных мастеров' },
    { number: '50,000+', label: 'Товаров в каталоге' },
    { number: '100,000+', label: 'Довольных покупателей' },
    { number: '5 лет', label: 'На рынке' }
  ];

  const team = [
    {
      name: 'Анна Петрова',
      role: 'Основатель и CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      description: 'Мастер керамики с 15-летним опытом. Создала платформу для поддержки талантливых рукодельников.'
    },
    {
      name: 'Ахроров Зиёдулло',
      role: 'SEO и главный разработчик',
      image: '',
      description: 'Опытный разработчик с экспертизой в создании e-commerce решений.'
    },
    {
      name: 'Елена Морозова',
      role: 'Директор по маркетингу',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      description: 'Специалист по продвижению творческих проектов и развитию сообществ.'
    }
  ];

  const milestones = [
    { year: '2019', title: 'Запуск платформы', description: 'Первые 100 мастеров присоединились к платформе' },
    { year: '2020', title: 'Расширение', description: 'Запуск видео-контента и мастер-классов' },
    { year: '2021', title: 'Рост', description: 'Достигли отметки в 1000 активных продавцов' },
    { year: '2022', title: 'Инновации', description: 'Внедрили AR-примерку для украшений' },
    { year: '2023', title: 'Международный рынок', description: 'Запуск в странах СНГ' },
    { year: '2024', title: 'Новые возможности', description: 'Платформа для обучения и сертификации мастеров' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                🎨 О платформе
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-blue-900 leading-tight">
                Наша миссия —
                <span className="block text-blue-600">поддержать творчество</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Мы создали платформу, где талантливые мастера могут представить свои работы, 
                а покупатели — найти уникальные изделия ручной работы. Каждый товар на нашей 
                платформе создан с любовью и вниманием к деталям.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Стать частью сообщества
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1678791673777-57274271e434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4NjMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Мастер за работой"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Наши ценности</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся в работе и которые помогают нам создавать лучший сервис
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Наша история</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Все началось в 2019 году, когда наш основатель Анна Петрова, мастер керамики, 
                  столкнулась с проблемой продажи своих изделий. Существующие платформы не понимали 
                  специфику рукоделия и не предоставляли нужных инструментов для мастеров.
                </p>
                <p>
                  Тогда родилась идея создать специализированную платформу, которая объединит 
                  мастеров ручной работы и ценителей уникальных изделий. Платформу, где каждый 
                  мастер сможет рассказать историю своего творчества, а покупатели — найти 
                  по-настоящему особенные вещи.
                </p>
                <p>
                  Сегодня мы — крупнейшая в России платформа для рукоделия, объединяющая 
                  тысячи мастеров и сотни тысяч покупателей. Но наша миссия остается неизменной: 
                  поддерживать творчество и помогать талантам находить своих покупателей.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1667508868067-4aa2a35cd93c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc1ODYzMjY5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Художник за работой"
                className="w-full h-48 object-cover rounded-lg"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1715374033196-0ff662284a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBjcmFmdHN8ZW58MXx8fHwxNzU4NTI0MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Изготовление украшений"
                className="w-full h-48 object-cover rounded-lg mt-8"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGVzJTIwY3JhZnRzfGVufDF8fHx8MTc1ODYzMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Текстильное рукоделие"
                className="w-full h-48 object-cover rounded-lg -mt-8"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1661873482206-4e2fa0ba455d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjcmFmdCUyMGhhbmRtYWRlfGVufDF8fHx8MTc1ODU2ODEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Деревянные изделия"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Наш путь</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Основные вехи развития платформы
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="border-blue-100">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Наша команда</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Люди, которые создают и развивают платформу каждый день
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Присоединяйтесь к нашему сообществу</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Станьте частью крупнейшего сообщества мастеров и ценителей рукоделия
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Начать продавать
            </Button>
            <Button size="lg" variant="outline" className="border-blue-300 text-white hover:bg-blue-600">
              Исследовать товары
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
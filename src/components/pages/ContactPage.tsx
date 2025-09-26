"use client"
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
    alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@rukodelie.ru',
      description: 'Ответим в течение 24 часов'
    },
    {
      icon: Phone,
      title: 'Телефон',
      value: '+7 (800) 123-45-67',
      description: 'Ежедневно с 9:00 до 21:00'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      value: 'Москва, Россия',
      description: 'Главный офис'
    },
    {
      icon: Clock,
      title: 'Часы работы',
      value: 'Пн-Вс: 9:00-21:00',
      description: 'Поддержка 24/7'
    }
  ];

  const faqItems = [
    {
      question: 'Как начать продавать на платформе?',
      answer: 'Зарегистрируйтесь на сайте, заполните профиль продавца и загрузите ваши товары. Мы проверим их и опубликуем в каталоге.'
    },
    {
      question: 'Какую комиссию берет платформа?',
      answer: 'Мы берем комиссию 5% с каждой продажи. Это включает обработку платежей и поддержку продавцов.'
    },
    {
      question: 'Как происходит доставка товаров?',
      answer: 'Доставка организуется продавцом. Мы предоставляем инструменты для управления заказами и отслеживания доставки.'
    },
    {
      question: 'Что делать, если товар не соответствует описанию?',
      answer: 'Свяжитесь с нашей службой поддержки. Мы поможем решить проблему и при необходимости организуем возврат.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Свяжитесь с нами</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Мы всегда готовы помочь вам. Напишите нам, и мы ответим в кратчайшие сроки.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Отправить сообщение</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Введите ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Категория обращения</Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Общие вопросы</SelectItem>
                          <SelectItem value="seller">Вопросы продавца</SelectItem>
                          <SelectItem value="buyer">Вопросы покупателя</SelectItem>
                          <SelectItem value="technical">Техническая поддержка</SelectItem>
                          <SelectItem value="partnership">Партнерство</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Тема сообщения</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="Кратко опишите тему"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Подробно опишите ваш вопрос или проблему"
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-5 h-5 mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <HeadphonesIcon className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold">Контактная информация</h3>
                </div>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-blue-600">{item.value}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Office Image */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="aspect-video">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg2MzI3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Наш офис"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Наш офис</h4>
                <p className="text-sm text-gray-600">
                  Приходите к нам в офис для личных встреч и консультаций.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Возможно, ответ на ваш вопрос уже есть в нашем FAQ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Свяжитесь с нашей службой поддержки, и мы обязательно поможем вам
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                <MessageCircle className="w-5 h-5 mr-2" />
                Написать в поддержку
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
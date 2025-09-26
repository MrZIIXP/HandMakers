"use client"
import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ProductCard } from '../ProductCard';
import { 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  MessageCircle,
  ShoppingCart,
  Eye,
  ChevronLeft,
  MapPin,
  Award
} from 'lucide-react';
import { mockProducts, mockSellers } from '../../data/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ProductPage({ productId, onNavigate }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.id === productId);
  const seller = mockSellers.find(s => s.id === product?.sellerId);
  const relatedProducts = mockProducts.filter(p => 
    p.category === product?.category && p.id !== productId
  ).slice(0, 4);

  if (!product || !seller) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Товар не найден</h1>
        <Button onClick={() => onNavigate('marketplace')}>
          Вернуться к каталогу
        </Button>
      </div>
    );
  }

  // Mock additional images for demonstration
  const productImages = [
    product.image,
    product.image,
    product.image
  ];

  const reviews = [
    {
      id: '1',
      userName: 'Мария К.',
      rating: 5,
      date: '2024-02-15',
      comment: 'Отличное качество! Очень довольна покупкой. Упаковано аккуратно, доставили быстро.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      userName: 'Александр С.',
      rating: 5,
      date: '2024-02-10',
      comment: 'Превосходная работа мастера! Именно то, что искал. Рекомендую всем.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button 
              onClick={() => onNavigate('home')}
              className="hover:text-blue-600"
            >
              Главная
            </button>
            <span>/</span>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="hover:text-blue-600"
            >
              Маркет
            </button>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('marketplace')}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-white border">
              <ImageWithFallback
                src={productImages[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.8 (23 отзыва)</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">156 просмотров</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-6">
                {product.price.toLocaleString()} ₽
              </p>
            </div>

            {/* Seller Info */}
            <Card className="border-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={seller.avatar} />
                    <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <button
                      onClick={() => onNavigate('seller', { sellerId: seller.id })}
                      className="font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {seller.name}
                    </button>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{seller.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{seller.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>{seller.totalSales} продаж</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">В наличии: 5 шт.</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Добавить в корзину
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={isFavorited ? 'text-red-500 border-red-200' : ''}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <Button size="lg" variant="outline" className="w-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                Написать продавцу
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="w-5 h-5 text-blue-500" />
                <span>Бесплатная доставка от 3000 ₽</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Гарантия качества</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw className="w-5 h-5 text-orange-500" />
                <span>Возврат в течение 14 дней</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full lg:w-auto grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы (2)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-6 space-y-2">
                    <p><strong>Материал:</strong> Высококачественная керамика</p>
                    <p><strong>Техника изготовления:</strong> Ручная лепка</p>
                    <p><strong>Время изготовления:</strong> 3-5 дней</p>
                    <p><strong>Уход:</strong> Мыть теплой водой без абразивных средств</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div><span className="font-medium">Размеры:</span> 20 x 15 см</div>
                      <div><span className="font-medium">Вес:</span> 800 г</div>
                      <div><span className="font-medium">Цвет:</span> Натуральный</div>
                    </div>
                    <div className="space-y-3">
                      <div><span className="font-medium">Страна производства:</span> Россия</div>
                      <div><span className="font-medium">Гарантия:</span> 6 месяцев</div>
                      <div><span className="font-medium">Артикул:</span> VAS-{product.id}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{review.userName}</span>
                            <div className="flex items-center space-x-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Похожие товары</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={(id) => onNavigate('product', { productId: id })}
                  onSellerClick={(id) => onNavigate('seller', { sellerId: id })}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
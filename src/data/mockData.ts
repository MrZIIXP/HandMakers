import { Product, Seller, Video } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Керамическая ваза ручной работы',
    description: 'Уникальная керамическая ваза, созданная с любовью. Идеально подходит для декора дома.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1675604587136-f91dc1a4473b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjZXJhbWljcyUyMHZhc2V8ZW58MXx8fHwxNzU4NjMyNDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'керамика',
    sellerId: '1',
    sellerName: 'Анна Гончарова',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Акварельная картина "Весна"',
    description: 'Нежная акварельная работа с весенними мотивами. Размер 30x40 см.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1669823115182-8e7731ff79ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBhaW50aW5nJTIwd2F0ZXJjb2xvciUyMGFydHxlbnwxfHx8fDE3NTg2MzI0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'живопись',
    sellerId: '2',
    sellerName: 'Елена Художница',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Серебряный браслет с камнями',
    description: 'Элегантный серебряный браслет с натуральными камнями.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1661009603404-200d20353dac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBicmFjZWxldHxlbnwxfHx8fDE3NTg2MzI0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'украшения',
    sellerId: '3',
    sellerName: 'Мария Ювелир',
    createdAt: '2024-01-25'
  },
  {
    id: '4',
    title: 'Вязаный шарф из мериноса',
    description: 'Теплый и мягкий шарф из натуральной шерсти мериноса.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1706864685919-abccadda8d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGtuaXR0aW5nJTIwd29vbCUyMGNyYWZ0fGVufDF8fHx8MTc1ODYzMjQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'вязание',
    sellerId: '4',
    sellerName: 'Ольга Мастерица',
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    title: 'Вышитая подушка',
    description: 'Декоративная подушка с ручной вышивкой в традиционном стиле.',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1676893140081-6eb8925c8559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGVtYnJvaWRlcnklMjB0ZXh0aWxlfGVufDF8fHx8MTc1ODYzMjQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'текстиль',
    sellerId: '5',
    sellerName: 'Татьяна Вышивка',
    createdAt: '2024-02-05'
  },
  {
    id: '6',
    title: 'Деревянная шкатулка',
    description: 'Резная деревянная шкатулка ручной работы для украшений.',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1722412084496-77d9c4b72edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHdvb2RlbiUyMGNyYWZ0JTIwY2FydmluZ3xlbnwxfHx8fDE3NTg2MzI0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'дерево',
    sellerId: '6',
    sellerName: 'Дмитрий Резчик',
    createdAt: '2024-02-10'
  },
  {
    id: '7',
    title: 'Керамический набор посуды',
    description: 'Элегантный набор керамической посуды на 4 персоны. Включает тарелки, чашки и блюдца.',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1678791673777-57274271e434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4NjMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'керамика',
    sellerId: '1',
    sellerName: 'Анна Гончарова',
    createdAt: '2024-02-12'
  },
  {
    id: '8',
    title: 'Масляная картина "Закат"',
    description: 'Живописная работа маслом на холсте. Размер 50x70 см. Готова к оформлению.',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1667508868067-4aa2a35cd93c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc1ODYzMjY5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'живопись',
    sellerId: '2',
    sellerName: 'Елена Художница',
    createdAt: '2024-02-14'
  },
  {
    id: '9',
    title: 'Золотые серьги с жемчугом',
    description: 'Изысканные золотые серьги с натуральным жемчугом. Ручная работа.',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1715374033196-0ff662284a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBjcmFmdHN8ZW58MXx8fHwxNzU4NTI0MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'украшения',
    sellerId: '3',
    sellerName: 'Мария Ювелир',
    createdAt: '2024-02-16'
  },
  {
    id: '10',
    title: 'Вязаный плед из альпаки',
    description: 'Мягкий и теплый плед из натуральной шерсти альпаки. Размер 150x200 см.',
    price: 6700,
    image: 'https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGVzJTIwY3JhZnRzfGVufDF8fHx8MTc1ODYzMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'вязание',
    sellerId: '4',
    sellerName: 'Ольга Мастерица',
    createdAt: '2024-02-18'
  },
  {
    id: '11',
    title: 'Скатерть с вышивкой',
    description: 'Льняная скатерть с ручной вышивкой в народном стиле. Размер 140x180 см.',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGVzJTIwY3JhZnRzfGVufDF8fHx8MTc1ODYzMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'текстиль',
    sellerId: '5',
    sellerName: 'Татьяна Вышивка',
    createdAt: '2024-02-20'
  },
  {
    id: '12',
    title: 'Деревянная разделочная доска',
    description: 'Функциональная разделочная доска из дуба с гравировкой. Размер 40x25 см.',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1661873482206-4e2fa0ba455d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjcmFmdCUyMGhhbmRtYWRlfGVufDF8fHx8MTc1ODU2ODEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'дерево',
    sellerId: '6',
    sellerName: 'Дмитрий Резчик',
    createdAt: '2024-02-22'
  }
];

export const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'Анна Гончарова',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    description: 'Керамист с 10-летним опытом. Создаю уникальную посуду и декор.',
    location: 'Москва',
    rating: 4.9,
    totalSales: 156,
    joinedDate: '2020-03-15'
  },
  {
    id: '2',
    name: 'Елена Художница',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    description: 'Художник-акварелист. Рисую природу и абстракции.',
    location: 'Санкт-Петербург',
    rating: 4.8,
    totalSales: 89,
    joinedDate: '2021-01-20'
  },
  {
    id: '3',
    name: 'Мария Ювелир',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    description: 'Создаю украшения из серебра и натуральных камней.',
    location: 'Екатеринбург',
    rating: 4.7,
    totalSales: 234,
    joinedDate: '2019-11-10'
  },
  {
    id: '4',
    name: 'Ольга Мастерица',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    description: 'Вяжу теплые и уютные вещи из натуральной шерсти.',
    location: 'Новосибирск',
    rating: 4.9,
    totalSales: 178,
    joinedDate: '2020-08-12'
  },
  {
    id: '5',
    name: 'Татьяна Вышивка',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    description: 'Мастер ручной вышивки. Создаю текстиль в традиционном стиле.',
    location: 'Казань',
    rating: 4.6,
    totalSales: 92,
    joinedDate: '2021-05-03'
  },
  {
    id: '6',
    name: 'Дмитрий Резчик',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    description: 'Работаю с деревом более 15 лет. Создаю функциональные и декоративные изделия.',
    location: 'Краснодар',
    rating: 4.8,
    totalSales: 203,
    joinedDate: '2019-07-25'
  }
];

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Как создать керамическую вазу',
    thumbnail: 'https://images.unsplash.com/photo-1675604587136-f91dc1a4473b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjZXJhbWljcyUyMHZhc2V8ZW58MXx8fHwxNzU4NjMyNDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sellerId: '1',
    sellerName: 'Анна Гончарова',
    duration: '12:34',
    views: 1250,
    createdAt: '2024-02-01'
  },
  {
    id: '2',
    title: 'Акварельная техника для начинающих',
    thumbnail: 'https://images.unsplash.com/photo-1669823115182-8e7731ff79ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBhaW50aW5nJTIwd2F0ZXJjb2xvciUyMGFydHxlbnwxfHx8fDE3NTg2MzI0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sellerId: '2',
    sellerName: 'Елена Художница',
    duration: '8:15',
    views: 890,
    createdAt: '2024-02-05'
  },
  {
    id: '3',
    title: 'Создание серебряного браслета',
    thumbnail: 'https://images.unsplash.com/photo-1661009603404-200d20353dac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBicmFjZWxldHxlbnwxfHx8fDE3NTg2MzI0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sellerId: '3',
    sellerName: 'Мария Ювелир',
    duration: '15:22',
    views: 2340,
    createdAt: '2024-01-28'
  },
  {
    id: '4',
    title: 'Глазуровка керамики - секреты мастера',
    thumbnail: 'https://images.unsplash.com/photo-1678791673777-57274271e434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4NjMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sellerId: '1',
    sellerName: 'Анна Гончарова',
    duration: '18:45',
    views: 3450,
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    title: 'Вязание спицами: базовые петли',
    thumbnail: 'https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGVzJTIwY3JhZnRzfGVufDF8fHx8MTc1ODYzMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sellerId: '4',
    sellerName: 'Ольга Мастерица',
    duration: '22:10',
    views: 1890,
    createdAt: '2024-02-12'
  },
  {
    id: '6',
    title: 'Вышивка гладью: первые шаги',
    thumbnail: 'https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGVzJTIwY3JhZnRzfGVufDF8fHx8MTc1ODYzMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sellerId: '5',
    sellerName: 'Татьяна Вышивка',
    duration: '16:30',
    views: 1340,
    createdAt: '2024-02-14'
  },
  {
    id: '7',
    title: 'Резьба по дереву: инструменты и техники',
    thumbnail: 'https://images.unsplash.com/photo-1661873482206-4e2fa0ba455d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjcmFmdCUyMGhhbmRtYWRlfGVufDF8fHx8MTc1ODU2ODEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sellerId: '6',
    sellerName: 'Дмитрий Резчик',
    duration: '25:15',
    views: 2780,
    createdAt: '2024-02-16'
  },
  {
    id: '8',
    title: 'Живопись маслом: работа с цветом',
    thumbnail: 'https://images.unsplash.com/photo-1667508868067-4aa2a35cd93c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc1ODYzMjY5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sellerId: '2',
    sellerName: 'Елена Художница',
    duration: '19:45',
    views: 1567,
    createdAt: '2024-02-18'
  }
];

export const categories = [
  'Все категории',
  'керамика',
  'живопись',
  'украшения',
  'вязание',
  'текстиль',
  'дерево',
  'стекло',
  'металл'
];
'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Eye, EyeOff, Mail, Lock, User, Heart, MapPin } from 'lucide-react'
import { AxiosRequest } from '@/store/axiosRequest'

export function RegisterPage({ onNavigate }) {
	const [step, setStep] = useState(1)

	const registerUser = async (userData) => {
		try {
			const { confirmPassword, ...dataToSend } = userData
			const response = await axios.post(`/register`, dataToSend)

			if (response?.data?.token) {
				localStorage.setItem("token", response?.data?.token)
			}	
			return response.data
		} catch (error) {
			console.error('Ошибка регистрации:', error)
			throw error
		}
	}

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		location: '',
		userType: 'buyer',
		storeName: '',
		description: '',
		categories: [],
		agreeTerms: false,
		agreeNewsletter: false,
	})
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const categories = [
		'керамика',
		'живопись',
		'украшения',
		'вязание',
		'текстиль',
		'дерево',
	]

	const handleSubmit = async e => {
		e.preventDefault()

		if (step < 3) {
			setStep(step + 1)
			return
		}

		// Валидация
		if (formData.password !== formData.confirmPassword) {
			setError('Пароли не совпадают')
			return
		}

		if (formData.password.length < 6) {
			setError('Пароль должен содержать минимум 6 символов')
			return
		}

		if (!formData.agreeTerms) {
			setError('Необходимо согласиться с условиями использования')
			return
		}

		setIsLoading(true)
		setError('')

		try {
			// Регистрация через Mokky.dev
			await registerUser(formData)

			// Успешная регистрация
			onRegister()
		} catch (error) {
			console.error('Ошибка регистрации:', error)
			setError(
				error.response?.data?.message ||
				'Ошибка регистрации. Попробуйте еще раз.'
			)
		} finally {
			setIsLoading(false)
		}
	}

	const handleChange = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		// Очищаем ошибку при изменении данных
		if (error) setError('')
	}

	const handleCategoryToggle = category => {
		setFormData(prev => ({
			...prev,
			categories: prev.categories.includes(category)
				? prev.categories.filter(c => c !== category)
				: [...prev.categories, category],
		}))
	}

	const canProceed = () => {
		switch (step) {
			case 1:
				return (
					formData.name &&
					formData.email &&
					formData.password &&
					formData.confirmPassword
				)
			case 2:
				return formData.location && formData.userType
			case 3:
				if (formData.userType === 'seller') {
					return (
						formData.storeName && formData.description && formData.agreeTerms
					)
				}
				return formData.agreeTerms
			default:
				return false
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4'>
			<div className='max-w-md w-full space-y-8'>
				{/* Header */}
				<div className='text-center'>
					<div className='flex items-center justify-center space-x-2 mb-6'>
						<div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center'>
							<Heart className='w-6 h-6 text-white' />
						</div>
						<span className='text-2xl font-bold text-blue-900'>Рукоделие</span>
					</div>
					<h2 className='text-3xl font-bold text-gray-900'>Создать аккаунт</h2>
					<p className='mt-2 text-gray-600'>
						{step === 1 && 'Основная информация'}
						{step === 2 && 'Дополнительная информация'}
						{step === 3 && 'Настройки профиля'}
					</p>
				</div>

				{/* Progress Bar */}
				<div className='flex items-center justify-center space-x-2'>
					{[1, 2, 3].map(i => (
						<div key={i} className='flex items-center'>
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i <= step
									? 'bg-blue-600 text-white'
									: 'bg-gray-200 text-gray-600'
									}`}
							>
								{i}
							</div>
							{i < 3 && (
								<div
									className={`w-12 h-1 mx-2 ${i < step ? 'bg-blue-600' : 'bg-gray-200'
										}`}
								/>
							)}
						</div>
					))}
				</div>

				{/* Error Message */}
				{error && (
					<div className='bg-red-50 border border-red-200 rounded-md p-4'>
						<p className='text-red-600 text-sm'>{error}</p>
					</div>
				)}

				{/* Registration Form */}
				<Card className='border-0 shadow-xl'>
					<CardContent className='p-8'>
						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* Step 1: Basic Information */}
							{step === 1 && (
								<>
									<div>
										<Label htmlFor='name'>Полное имя</Label>
										<div className='relative mt-1'>
											<User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
											<Input
												id='name'
												type='text'
												value={formData.name}
												onChange={e => handleChange('name', e.target.value)}
												placeholder='Ваше имя'
												className='pl-10'
												required
											/>
										</div>
									</div>

									<div>
										<Label htmlFor='email'>Email</Label>
										<div className='relative mt-1'>
											<Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
											<Input
												id='email'
												type='email'
												value={formData.email}
												onChange={e => handleChange('email', e.target.value)}
												placeholder='your@email.com'
												className='pl-10'
												required
											/>
										</div>
									</div>

									<div>
										<Label htmlFor='password'>Пароль</Label>
										<div className='relative mt-1'>
											<Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
											<Input
												id='password'
												type={showPassword ? 'text' : 'password'}
												value={formData.password}
												onChange={e => handleChange('password', e.target.value)}
												placeholder='Минимум 6 символов'
												className='pl-10 pr-10'
												required
												minLength={6}
											/>
											<button
												type='button'
												onClick={() => setShowPassword(!showPassword)}
												className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
											>
												{showPassword ? (
													<EyeOff className='w-5 h-5' />
												) : (
													<Eye className='w-5 h-5' />
												)}
											</button>
										</div>
									</div>

									<div>
										<Label htmlFor='confirmPassword'>Подтвердите пароль</Label>
										<div className='relative mt-1'>
											<Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
											<Input
												id='confirmPassword'
												type={showConfirmPassword ? 'text' : 'password'}
												value={formData.confirmPassword}
												onChange={e =>
													handleChange('confirmPassword', e.target.value)
												}
												placeholder='Повторите пароль'
												className='pl-10 pr-10'
												required
											/>
											<button
												type='button'
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
												className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
											>
												{showConfirmPassword ? (
													<EyeOff className='w-5 h-5' />
												) : (
													<Eye className='w-5 h-5' />
												)}
											</button>
										</div>
									</div>
								</>
							)}

							{/* Step 2: Profile Information */}
							{step === 2 && (
								<>
									<div>
										<Label htmlFor='location'>Местоположение</Label>
										<div className='relative mt-1'>
											<MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
											<Input
												id='location'
												type='text'
												value={formData.location}
												onChange={e => handleChange('location', e.target.value)}
												placeholder='Город, страна'
												className='pl-10'
												required
											/>
										</div>
									</div>

									<div>
										<Label>Я хочу</Label>
										<RadioGroup
											value={formData.userType}
											onValueChange={value => handleChange('userType', value)}
											className='mt-2'
										>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem value='buyer' id='buyer' />
												<Label htmlFor='buyer'>
													Покупать изделия ручной работы
												</Label>
											</div>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem value='seller' id='seller' />
												<Label htmlFor='seller'>Продавать свои изделия</Label>
											</div>
										</RadioGroup>
									</div>
								</>
							)}

							{/* Step 3: Seller Information */}
							{step === 3 && (
								<>
									{formData.userType === 'seller' && (
										<>
											<div>
												<Label htmlFor='storeName'>Название магазина</Label>
												<Input
													id='storeName'
													type='text'
													value={formData.storeName}
													onChange={e =>
														handleChange('storeName', e.target.value)
													}
													placeholder='Название вашего магазина'
													required
												/>
											</div>

											<div>
												<Label htmlFor='description'>Описание</Label>
												<textarea
													id='description'
													value={formData.description}
													onChange={e =>
														handleChange('description', e.target.value)
													}
													placeholder='Расскажите о себе и своем творчестве'
													className='w-full p-3 border border-gray-300 rounded-md resize-none'
													rows={4}
													required
												/>
											</div>

											<div>
												<Label>Категории товаров</Label>
												<div className='grid grid-cols-2 gap-2 mt-2'>
													{categories.map(category => (
														<div
															key={category}
															className='flex items-center space-x-2'
														>
															<Checkbox
																id={category}
																checked={formData.categories.includes(category)}
																onCheckedChange={() =>
																	handleCategoryToggle(category)
																}
															/>
															<Label
																htmlFor={category}
																className='text-sm capitalize'
															>
																{category}
															</Label>
														</div>
													))}
												</div>
											</div>
										</>
									)}

									<div className='space-y-3'>
										<div className='flex items-center space-x-2'>
											<Checkbox
												id='agreeTerms'
												checked={formData.agreeTerms}
												onCheckedChange={checked =>
													handleChange('agreeTerms', checked)
												}
												required
											/>
											<Label htmlFor='agreeTerms' className='text-sm'>
												Я согласен с условиями использования и политикой
												конфиденциальности
											</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<Checkbox
												id='agreeNewsletter'
												checked={formData.agreeNewsletter}
												onCheckedChange={checked =>
													handleChange('agreeNewsletter', checked)
												}
											/>
											<Label htmlFor='agreeNewsletter' className='text-sm'>
												Получать новости и специальные предложения
											</Label>
										</div>
									</div>
								</>
							)}

							{/* Navigation Buttons */}
							<div className='flex space-x-4'>
								{step > 1 && (
									<Button
										type='button'
										variant='outline'
										onClick={() => setStep(step - 1)}
										className='flex-1'
									>
										Назад
									</Button>
								)}
								<Button
									type='submit'
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									disabled={!canProceed() || isLoading}
								>
									{isLoading
										? 'Регистрация...'
										: step === 3
											? 'Создать аккаунт'
											: 'Далее'}
								</Button>
							</div>
						</form>

						{step === 1 && (
							<>
								<Separator className='my-6' />
								<div className='text-center'>
									<p className='text-sm text-gray-600'>
										Уже есть аккаунт?{' '}
										<button
											type='button'
											onClick={() => onNavigate('login')}
											className='text-blue-600 hover:text-blue-500 font-medium'
										>
											Войти
										</button>
									</p>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

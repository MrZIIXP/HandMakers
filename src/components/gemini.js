// pages/api/gemini.js
import { GoogleGenAI } from '@google/genai'
import axios from 'axios'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// Вспомогательная функция: ищем товары через твой текущий API
async function searchProducts({ category, q, id }) {
	// подставь свой endpoint / логику (AxiosRequest или локальную БД).
	// Пример обращения к мок-серверу:
	if (id) {
		const { data } = await axios.get(
			`https://2b28d574f3d0f0d6.mokky.dev/products?id=${id}`
		)
		return Array.isArray(data) ? data[0] ?? null : data
	}
	const url = q
		? `https://2b28d574f3d0f0d6.mokky.dev/products?title_like=${encodeURIComponent(
				q
		  )}`
		: `https://2b28d574f3d0f0d6.mokky.dev/products?category=${encodeURIComponent(
				category || ''
		  )}`
	const { data } = await axios.get(url)
	return data
}

export default async function handler(req, res) {
	try {
		const { prompt } = req.body
		if (!prompt) return res.status(400).json({ error: 'No prompt' })

		// 1) Первый вызов: отправляем prompt в Gemini
		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash', // или 'gemini-2.5-pro' / другой — выбери подходящий
			contents: prompt,
			// config: { ... } // сюда можно добавить параметры (temperature, max tokens и т.д.)
		})

		// 2) Если модель вернула functionCalls (то есть хочет вызвать внешний инструмент)
		const functionCalls = response.functionCalls || []
		if (functionCalls.length) {
			// возьмём первый (простая логика), распарсим аргументы
			const fc = functionCalls[0]
			let args = {}
			try {
				args = JSON.parse(fc.arguments || '{}')
			} catch (e) {
				args = {}
			}

			// реализуем нужную функцию: например searchProducts
			if (fc.name === 'searchProducts') {
				const products = await searchProducts(args)

				// 3) Передаём результат обратно модели, чтобы она сгенерировала "человеческий" ответ
				const followupPrompt = [
					`User: ${prompt}`,
					`Tool (${fc.name}) returned:\n${JSON.stringify(products).slice(
						0,
						20_000
					)}`, // урежь, если большой
					'Используй этот результат, чтобы составить короткий понятный ответ для пользователя на русском.',
				].join('\n\n')

				const finalResp = await ai.models.generateContent({
					model: 'gemini-2.5-flash',
					contents: followupPrompt,
				})

				return res.json({ answer: finalResp.text, raw: finalResp })
			}
		}

		// иначе просто вернём текст, который вернула модель
		return res.json({ answer: response.text, raw: response })
	} catch (err) {
		console.error('Gemini error:', err)
		return res
			.status(500)
			.json({ error: 'Server error', details: err?.message })
	}
}

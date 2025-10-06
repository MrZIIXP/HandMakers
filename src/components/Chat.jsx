import React, { useState } from "react";

const products = [
	{
		title: "Керамическая ваза",
		description: "Красивая ручной работы ваза для цветов",
		category: "украшения",
		userId: 2,
		userName: "John",
		userImage: "",
		Likes: [],
		comments: [
			{
				userId: "1",
				userName: "Мария К.",
				date: "2024-02-15",
				comment: "Отличное качество! Очень довольна покупкой.",
				userImage:
					"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
			},
		],
		image: [
			{
				url: "https://i.ibb.co/Tqm5YMq5/2025-09-29-164243.png",
				id: "R4zWYT4W",
			},
		],
		price: "1234",
		id: 3,
		user_id: 2,
	},
	{
		title: "Стеклянная ваза",
		description: "Минималистичная ваза под сухоцветы",
		category: "украшения",
		userId: 3,
		userName: "Anna",
		userImage: "",
		Likes: [],
		comments: [],
		image: [
			{
				url: "https://i.ibb.co/bMwwWZm7/2025-09-28-112416.png",
				id: "VcnnjZ93",
			},
		],
		price: "250",
		id: 5,
		user_id: 3,
	},
	{
		title: "Фарфоровая ваза с цветами",
		description: "Элегантная ваза с росписью цветов",
		category: "украшения",
		userId: 4,
		userName: "Maria",
		userImage: "",
		Likes: [],
		comments: [],
		image: [
			{
				url: "https://i.ibb.co/Tqm5YMq5/2025-09-29-164243.png",
				id: "R4zWYT4W",
			},
		],
		price: "450",
		id: 6,
		user_id: 4,
	},
];

// Маппинг разговорных слов → категории
const CATEGORY_KEYWORDS = {
	ваза: "украшения",
	вазы: "украшения",
	украшения: "украшения",
};

const Chat = () => {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState([
		{ from: "bot", text: "Здравствуйте! Напишите, что ищете 😊 Например: «вазы от 300 рублей» или «украшения с цветами от Maria»" },
	]);
	const [input, setInput] = useState("");

	const handleSend = () => {
		if (!input.trim()) return;

		const userMessage = input.trim();
		setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
		setInput("");

		// Классифицируем тип запроса
		let commandType = "unknown";
		const lower = userMessage.toLowerCase();

		if (lower.includes("ваз") || lower.includes("украшен")) {
			commandType = "search_products";
		} else if (lower.includes("привет") || lower.includes("здрав")) {
			commandType = "greeting";
		} else if (lower.includes("помощь") || lower.includes("что умеешь")) {
			commandType = "help";
		}

		// Обработка через switch/case
		switch (commandType) {
			case "greeting":
				setMessages((prev) => [
					...prev,
					{ from: "bot", text: "Привет! Я помогу найти товары. Попробуйте: «вазы от 300 рублей»." },
				]);
				break;

			case "help":
				setMessages((prev) => [
					...prev,
					{
						from: "bot",
						text: "Вы можете искать так:\n• «вазы от 300 рублей»\n• «украшения с цветами от Maria»\n• «найди вазу до 500 от Anna»",
					},
				]);
				break;

			case "search_products": {
				// Парсинг параметров
				let minPrice = 0;
				let maxPrice = Infinity;
				let seller = null;
				let category = null;
				let keywords = [];

				// Категория
				for (const [word, cat] of Object.entries(CATEGORY_KEYWORDS)) {
					if (lower.includes(word)) {
						category = cat;
						break;
					}
				}

				// Цена "от"
				const fromMatch = lower.match(/от\s+(\d+)/);
				if (fromMatch) minPrice = parseInt(fromMatch[1], 10);

				// Цена "до"
				const toMatch = lower.match(/до\s+(\d+)/);
				if (toMatch) maxPrice = parseInt(toMatch[1], 10);

				// Продавец "от ..."
				const sellerMatch = lower.match(/от\s+([а-яa-z]+)/i);
				if (sellerMatch) seller = sellerMatch[1];

				// Очистка запроса от служебных слов
				let clean = lower
					.replace(/от\s+\d+/g, "")
					.replace(/до\s+\d+/g, "")
					.replace(/от\s+[а-яa-z]+/gi, "")
					.replace(/ваз[аы]?/g, "")
					.replace(/украшен[ия]/g, "")
					.replace(/рубл[ейя]/g, "")
					.trim();

				if (clean) {
					keywords = clean.split(/\s+/).filter((w) => w.length > 2);
				}

				// Фильтрация
				const results = products.filter((p) => {
					// Категория
					if (category && p.category !== category) return false;

					// Цена
					const price = parseInt(p.price, 10);
					if (price < minPrice || price > maxPrice) return false;

					// Продавец
					if (seller && !p.userName.toLowerCase().includes(seller.toLowerCase())) return false;

					// Ключевые слова в названии или описании
					if (keywords.length > 0) {
						const titleDesc = (p.title + " " + p.description).toLowerCase();
						return keywords.every((kw) => titleDesc.includes(kw));
					}

					return true;
				});

				if (results.length === 0) {
					setMessages((prev) => [
						...prev,
						{ from: "bot", text: "К сожалению, ничего не найдено по вашему запросу 😕" },
					]);
				} else {
					setMessages((prev) => [
						...prev,
						{
							from: "bot",
							text: `Нашёл ${results.length} подходящих товар${results.length === 1 ? "" : "ов"}:`,
							products: results,
						},
					]);
				}
				break;
			}

			default:
				setMessages((prev) => [
					...prev,
					{
						from: "bot",
						text: "Я пока понимаю только запросы про вазы и украшения. Например: «вазы от 300 рублей».",
					},
				]);
		}
	};

	return (
		<div>
			{/* Кнопка открытия чата */}
			<button
				onClick={() => setOpen(!open)}
				className="px-4 py-2 text-transparent bg-clip-text font-bold bg-gradient-to-bl from-blue-500 to-pink-500 rounded"
			>
				Чат
			</button>

			{/* Окно чата */}
			{open && (
				<div
					onClick={() => setOpen(false)}
					className="w-full fixed left-0 top-0 bg-black/50 z-[10] h-[100vh]"
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className="h-[70vh] w-[50%] max-w-2xl m-auto my-[15vh] bg-white shadow-xl rounded-lg border flex flex-col"
					>
						<div className="p-3 border-b font-bold text-lg">Ассистент</div>
						<div className="flex-1 overflow-y-auto p-3 space-y-3">
							{messages.map((m, i) => (
								<div
									key={i}
									className={`p-3 rounded-lg max-w-[85%] ${m.from === "bot" ? "bg-gray-100 self-start" : "bg-blue-100 self-end ml-auto"
										}`}
								>
									<div>{m.text}</div>
									{/* Отображаем карточки товаров, если есть */}
									{m.products && (
										<div className="mt-3 space-y-2">
											{m.products.map((product) => (
												<div
													key={product.id}
													className="border rounded p-2 flex items-start gap-2"
												>
													<img
														src={product.image[0]?.url?.trim()}
														alt={product.title}
														className="w-12 h-12 object-cover rounded"
														onError={(e) => (e.target.style.display = "none")}
													/>
													<div className="text-sm">
														<div className="font-medium">{product.title}</div>
														<div className="text-gray-600">от {product.userName}</div>
														<div className="font-bold text-blue-600">{parseInt(product.price).toLocaleString()} ₽</div>
														<a
															href={`/marketplace/${product.id}`}
															target="_blank"
															rel="noopener noreferrer"
															className="text-blue-500 hover:underline text-xs"
														>
															Подробнее →
														</a>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
						<div className="p-2 border-t flex gap-2">
							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSend()}
								placeholder="Например: вазы от 300 рублей с цветами от Maria"
								className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
							<button
								onClick={handleSend}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
							>
								➤
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Chat;
// components/ChatBotClient.jsx
"use client"
import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export default function ChatBotClient() {
	const [open, setOpen] = useState(false)
	const [messages, setMessages] = useState([{ role: "bot", text: "Привет! Я помогу с поиском товаров и заказами." }])
	const [input, setInput] = useState("")

	async function send() {
		if (!input.trim()) return
		const userText = input.trim()
		setMessages(prev => [...prev, { role: "user", text: userText }])
		setInput("")

		// отправляем запрос на сервер
		const res = await fetch("/api/gemini", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ prompt: userText })
		})
		const data = await res.json()
		const answer = data?.answer || "Ошибка: пустой ответ"
		setMessages(prev => [...prev, { role: "bot", text: answer }])
	}

	return (
		<>
			<button
				onClick={() => setOpen(v => !v)}
				className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
				aria-label="Открыть чат"
			>
				<MessageCircle className="w-5 h-5" />
			</button>

			{open && (
				<div className="fixed bottom-20 right-6 w-80 bg-white border border-blue-100 rounded-xl shadow-lg flex flex-col z-50">
					<div className="flex items-center justify-between p-2 bg-blue-600 text-white">
						<div>Помощник</div>
						<button onClick={() => setOpen(false)}><X className="w-4 h-4" /></button>
					</div>

					<div className="flex-1 p-2 overflow-y-auto space-y-2 text-sm">
						{messages.map((m, i) => (
							<div key={i} className={`p-2 rounded ${m.role === "bot" ? "bg-blue-50 text-gray-800" : "bg-blue-600 text-white self-end"}`}>
								{m.text}
							</div>
						))}
					</div>

					<div className="p-2 flex gap-2 border-t">
						<input
							value={input}
							onChange={e => setInput(e.target.value)}
							onKeyDown={e => e.key === "Enter" && send()}
							className="flex-1 border rounded px-2 py-1"
							placeholder="Напишите сообщение..."
						/>
						<button className="bg-blue-600 text-white px-3 rounded" onClick={send}>Отпр.</button>
					</div>
				</div>
			)}
		</>
	)
}

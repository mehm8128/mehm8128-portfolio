import { useState } from 'react'

import { send } from '@emailjs/browser'

import { Header } from '../components/Header'

import type { NextPage } from "next"
const Contact: NextPage = () => {
	const [name, setName] = useState("")
	const [mail, setMail] = useState("")
	const [message, setMessage] = useState("")

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
		const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
		const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
		if (
			serviceId === undefined ||
			templateId === undefined ||
			publicKey === undefined
		) {
			alert("エラー発生")
			return
		}
		if (name === "" || message === "") {
			alert("名前と本文は必須です")
			return
		}
		const templateParams = {
			toName: "mehm8128",
			name: name,
			mail: mail,
			message: message,
		}
		send(serviceId, templateId, templateParams, publicKey).then(() => {
			setName("")
			setMail("")
			setMessage("")
			alert("送信されました")
		})
	}
	return (
		<>
			<Header />
			<main>
				<div className="flex justify-center py-8">
					<h2 className="text-3xl flex items-center">お問い合わせ</h2>
				</div>
				<div className="w-1/2 container mx-auto px-12">
					<p className="pb-8">
						何かありましたらご連絡ください。名前と本文のみ必須ですが、メールアドレスが記入されていない場合返信できません。
					</p>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<input
							type="text"
							value={name}
							placeholder="名前"
							className="border border-gray-300 h-12 pl-2"
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="email"
							value={mail}
							placeholder="メールアドレス"
							className="border border-gray-300 h-12 pl-2"
							onChange={(e) => setMail(e.target.value)}
						/>
						<textarea
							value={message}
							placeholder="本文"
							className="border border-gray-300 min-h-32 pl-2 pt-2"
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button type="submit" className="border border-gray-300 h-12">
							送信
						</button>
					</form>
				</div>
			</main>
		</>
	)
}

export default Contact

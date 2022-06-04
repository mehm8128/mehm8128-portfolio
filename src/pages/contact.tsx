import { sendForm } from '@emailjs/browser'
import type { NextPage } from "next"
import { useRef, useState } from 'react'


import { Header } from '../components/Header'


const Contact: NextPage = () => {
	const formRef = useRef<HTMLFormElement>(null)

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
			publicKey === undefined ||
			formRef.current === null
		) {
			alert("エラー発生")
			return
		}
		if (name === "" || message === "") {
			alert("名前と本文は必須です")
			return
		}
		sendForm(serviceId, templateId, formRef.current, publicKey).then(() => {
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
				<div className="flex justify-center py-12">
					<h2 className="text-3xl flex items-center">お問い合わせ</h2>
				</div>
				<div className="w-1/2 container mx-auto px-12">
					<p className="pb-8">
						何かありましたらご連絡ください。名前と本文のみ必須ですが、メールアドレスが記入されていない場合返信できません。
					</p>
					<form
						ref={formRef}
						onSubmit={(e) => handleSubmit(e)}
						className="flex flex-col gap-4"
					>
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
							className="border border-gray-300 min-h-32 pl-2"
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

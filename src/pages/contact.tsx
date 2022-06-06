import { send } from "@emailjs/browser"
import type { NextPage } from "next"
import { useState } from "react"

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
			<div className="flex py-8 justify-center">
				<h2 className="flex text-3xl items-center">お問い合わせ</h2>
			</div>
			<div className="mx-auto w-4/5 md:w-1/2">
				<p className="pb-8">
					何かありましたらご連絡ください。名前と本文のみ必須ですが、メールアドレスが記入されていない場合返信できません。
				</p>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<input
						type="text"
						value={name}
						placeholder="名前"
						className="border border-gray-300 h-12 pl-2 focus:outline-cyan-300"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="email"
						value={mail}
						placeholder="メールアドレス"
						className="border border-gray-300 h-12 pl-2 focus:outline-cyan-300"
						onChange={(e) => setMail(e.target.value)}
					/>
					<textarea
						value={message}
						placeholder="本文"
						className="border border-gray-300 min-h-32 pt-2 pl-2 focus:outline-cyan-300"
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button
						type="submit"
						className="border-2 border-gray-300 h-12 hover:border-cyan-300"
					>
						送信
					</button>
				</form>
			</div>
		</>
	)
}

export default Contact

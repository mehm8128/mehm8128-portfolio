import { send } from '@emailjs/browser';
import type { NextPage } from 'next';
import { useState } from 'react';

const Contact: NextPage = () => {
	const [name, setName] = useState('');
	const [mail, setMail] = useState('');
	const [message, setMessage] = useState('');
	const [isSending, setIsSending] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
		const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
		const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
		if (serviceId === undefined || templateId === undefined || publicKey === undefined) {
			alert('エラー発生');
			return;
		}
		if (name === '' || message === '') {
			alert('名前と本文は必須です');
			return;
		}
		const templateParams = {
			toName: 'mehm8128',
			name: name,
			mail: mail,
			message: message,
		};
		setIsSending(true);
		await send(serviceId, templateId, templateParams, publicKey);
		setName('');
		setMail('');
		setMessage('');
		alert('送信されました');
		setIsSending(false);
	}
	return (
		<>
			<div className='flex justify-center py-8'>
				<h2 className='flex items-center text-3xl'>お問い合わせ</h2>
			</div>
			<div className='mx-auto w-4/5 md:w-1/2'>
				<p className='pb-8'>
					何かありましたらご連絡ください。名前と本文のみ必須ですが、メールアドレスが記入されていない場合返信できません。
				</p>
				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					<input
						className='h-12 border border-gray-300 pl-2 focus:outline-cyan-300'
						disabled={isSending}
						placeholder='名前'
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						className='h-12 border border-gray-300 pl-2 focus:outline-cyan-300'
						disabled={isSending}
						placeholder='メールアドレス'
						type='email'
						value={mail}
						onChange={(e) => setMail(e.target.value)}
					/>
					<textarea
						className='min-h-32 border border-gray-300 pt-2 pl-2 focus:outline-cyan-300'
						disabled={isSending}
						placeholder='本文'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button
						className={`h-12 border-2 border-gray-300 ${!isSending && 'hover:border-cyan-300'} ${
							isSending && 'cursor-not-allowed'
						}`}
						disabled={isSending}
						type='submit'
					>
						送信
					</button>
				</form>
			</div>
		</>
	);
};

export default Contact;

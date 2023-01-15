interface Props {
	onClose: () => void
	children: React.ReactNode
}

export const ModalWrapper: React.FC<Props> = ({ children, onClose }) => {
	return (
		<div className='z-3 fixed top-0 left-0 h-full w-full bg-gray-300/50' onClick={onClose}>
			<div
				className='h-6/7 w-6/7 md:w-5/7 absolute inset-0 my-auto mx-auto overflow-y-scroll bg-white p-4 shadow-lg'
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}

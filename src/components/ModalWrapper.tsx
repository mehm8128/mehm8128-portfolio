/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React, { forwardRef } from 'react'

const ModalWrapper = forwardRef<
	HTMLDialogElement,
	{
		onClose: () => void
		children: React.ReactNode
	}
>(({ children, onClose }, ref) => {
	return (
		<dialog
			className='h-6/7 w-6/7 md:w-4/7 absolute inset-0 mx-auto my-auto overflow-y-scroll bg-white px-12 pb-4 pt-12 shadow-lg'
			ref={ref}
			onClick={onClose}
		>
			<div onClick={e => e.stopPropagation()}>{children}</div>
		</dialog>
	)
})
ModalWrapper.displayName = 'ModalWrapper'
export default ModalWrapper

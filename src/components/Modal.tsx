/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import { css, Box } from '@kuma-ui/core'
import React, { forwardRef } from 'react'

const Modal = forwardRef<
	HTMLDialogElement,
	{
		onClose: () => void
		children: React.ReactNode
	}
>(({ children, onClose }, ref) => {
	return (
		<dialog
			className={css`
				color: #2d2d2d;
				height: 85%;
				width: 57%;
				position: absolute;
				inset: 0;
				outline: none;
				margin: auto;
				box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
				overflow-y: scroll;
				@media (max-width: 768px) {
					width: 85%;
				}
			`}
			ref={ref}
			onClick={onClose}
		>
			<Box px={48} pt={48} pb={16} onClick={e => e.stopPropagation()}>
				{children}
			</Box>
		</dialog>
	)
})
Modal.displayName = 'Modal'
export default Modal

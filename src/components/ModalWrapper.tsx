/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import { css } from '@kuma-ui/core'
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
			className={css`
				height: 85%;
				width: 57%;
				position: absolute;
				inset: 0;
				margin: auto;
				padding: 48px 48px 16px;
				box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
				overflow-y: scroll;
			`}
			ref={ref}
			onClick={onClose}
		>
			<div onClick={e => e.stopPropagation()}>{children}</div>
		</dialog>
	)
})
ModalWrapper.displayName = 'ModalWrapper'
export default ModalWrapper

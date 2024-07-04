// Modal.jsx

import React, { useState } from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'

const Modal = ({ isOpen, onClose }) => {
	if (!isOpen) return null

	const [open, setOpen] = useState(false)

	return (
		<div className='modal'>
			<div className='modal-content'>
				{/*  */}
				<span className='close' onClick={onClose}>
					&times;
				</span>
				<p>erg</p>
				<div className='text-red-600'>TTTTT</div>
			</div>
		</div>
	)
}

export default Modal

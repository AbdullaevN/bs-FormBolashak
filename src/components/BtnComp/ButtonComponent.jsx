// ButtonComponent.jsx

import React, { useState } from 'react'
import Modal from '../Modal/ Modal'

const ButtonComponent = () => {
	const [modalOpen, setModalOpen] = useState(false)

	const openModal = () => {
		setModalOpen(true)
	}

	const closeModal = () => {
		setModalOpen(false)
	}

	return (
		<div>
			{/* Кнопка для открытия модального окна */}
			<button onClick={openModal}>Открыть модальное окно</button>

			{/* Модальное окно */}
			<Modal isOpen={modalOpen} onClose={closeModal} />
		</div>
	)
}

export default ButtonComponent

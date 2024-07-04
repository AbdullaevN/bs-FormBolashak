import { useState } from 'react'
import ModalRegistration from '../Modal/ModalRegistration'

import { Dialog } from '@headlessui/react'
import ButtonComponent from '../BtnComp/ButtonComponent'

const MainForm = () => {
	// const [openFile, setOpenFile] = useState(false)

	// const [modalIsOpen, setModalIsOpen] = useState(false)

	// const openModal = () => {
	// 	setModalIsOpen(true)
	// }

	// const closeModal = () => {
	// 	setModalIsOpen(false)
	// }

	return (
		<>
			<form>
				<div className='space-y-12'>
					<div className='border-b border-gray-900/10 pb-12'>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>
							Personal
						</h2>
						<p className='mt-1 text-sm leading-6 text-gray-600'>
							Lorem, ipsum dolor sit amet consectetur adipisicing.
						</p>

						<div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 '>
							<div className='sm:col-span-3'>
								<label
									htmlFor='first-name'
									className='block text-3xl font-medium leading-6 text-gray-900'
								>
									Почта
								</label>
								<div className='mt-2'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										autoComplete='given-name'
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-4xl sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='last-name'
									className='block text-3xl font-medium leading-6 text-gray-900'
								>
									Пароль
								</label>
								<div className='mt-2'>
									<input
										type='text'
										name='last-name'
										id='last-name'
										autoComplete='family-name'
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-4xl sm:leading-6'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-10'>
					<button
						type='submit'
						className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Отправить
					</button>
				</div>
			</form>

			<div className='flex justify-between py-10 text-lg'>
				<div>
					<button className='bg-slate-600 py-5 px-4 rounded-md w-56'>
						Забыли пароль?
					</button>
				</div>
				<div>
					<button
						onClick={() => setOpenFile(true)}
						className='bg-slate-600 py-5 px-4 rounded-md w-56'
					>
						Регистрация
					</button>
				</div>
			</div>
			{/* <ModalRegistration /> */}
			{/* 
			<div>
				<button onClick={openModal}>Открыть модальное окно</button>
				<Dialog isOpen={modalIsOpen} onRequestClose={closeModal}>
					{modalContent}
				</Dialog>
			</div> */}

			{/* <button onClick={ModalRegistration.openModal}>
				Открыть модальное окно
			</button> */}
			<ButtonComponent />
		</>
	)
}

export default MainForm

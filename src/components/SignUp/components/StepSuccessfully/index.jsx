// import { useNavigate } from 'react-router-dom'
import done from './done.png'

const StepSuccessfully = ({ setStep }) => {
	const hanldeCloseButton = () => {
		setStep(1)
		console.log('close')
		// useNavigate('/')
	}
	return (
		<div className='flex flex-col items-center justify-center min-h-screen   p-4'>
			<div className='bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-md'>
				<img src={done} alt='Success' className='w-24 h-24 mx-auto mb-4' />
				<h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-4'>
					Ваша форма успешно отправлена!
				</h2>
				<p className='text-gray-600 mb-6'>Спасибо за ваше обращение.</p>
				<button
					type='button'
					onClick={hanldeCloseButton}
					className='px-4 py-2 md:px-6 md:py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'
				>
					Закрыть
				</button>
			</div>
		</div>
	)
}

export default StepSuccessfully

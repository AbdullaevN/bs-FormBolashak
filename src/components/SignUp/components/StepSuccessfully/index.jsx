import done from './done.png'

const StepSuccessfully = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 p-4'>
			<div className='bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-md'>
				<img src={done} alt='Success' className='w-24 h-24 mx-auto mb-4' />
				<h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-4'>
					Ваша форма успешно отправлена!
				</h2>
				<p className='text-gray-600 mb-6'>Спасибо за ваше обращение.</p>
				{/* Uncomment the button if you want to use it */}
				{/* <button
					onClick={() => window.close()}
					className='px-4 py-2 md:px-6 md:py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'
				>
					Close Page
				</button> */}
			</div>
		</div>
	)
}

export default StepSuccessfully

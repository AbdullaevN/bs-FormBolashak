const BreadcrumbItem = ({ step, setStep, label, isLast }) => (
	<>
		{/* <li className='px-2'>
			<button
				onClick={() => setStep(step)}
				className='no-underline text-indigo'
			>
				{label}
			</button>
		</li> */}
		{/* <li className={`flex items-center ${isLast ? '' : 'mr-2'}`}>
			<button
				onClick={() => setStep(step)}
				className={`text-blue-500 hover:underline ${
					isLast ? 'text-gray-500' : ''
				}`}
				disabled={isLast}
			>
				{label}
			</button>
			{!isLast && <span className='mx-2 text-gray-400'>/</span>}
		</li> */}

		<div className='bg-white p-4 flex items-center flex-wrap'>
			<ul className='flex items-center'>
				<li className={`flex items-center ${isLast ? '' : 'mr-2'}`}>
					<button
						onClick={() => setStep(step)}
						className={`text-blue-500 hover:underline ${
							isLast ? 'text-gray-500' : ''
						}`}
						disabled={isLast}
					>
						{label}
					</button>
					{!isLast && <span className='mx-2 text-gray-400'>/</span>}
				</li>
			</ul>
		</div>
	</>
)

export default BreadcrumbItem

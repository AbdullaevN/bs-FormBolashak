import { ErrorMessage, Field } from 'formik'

const FieldOfIssue = ({ label, name }) => {
	return (
		<>
			<div className='container mx-auto h-full flex flex-col text-start items-start'>
				<label
					htmlFor={name}
					className='block mb-2 text-start items-start place-content-start '
				>
					{label}:
				</label>
				<Field
					name='dateOfIssue'
					type='date'
					// className='  rounded-md  bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset text-5xl focus:ring-indigo-600 sm:text-sm h-14 border-zinc-700 border-2'
					className='w-full p-2 mb-2 border border-gray-300 rounded'
				/>
				<ErrorMessage
					name='dateOfIssue'
					component='div'
					className='text-red-500 mb-2'
				/>
			</div>
		</>
	)
}

export default FieldOfIssue

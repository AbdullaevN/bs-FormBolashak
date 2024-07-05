import { ErrorMessage, Field } from 'formik'

const FieldThree = ({ label, name }) => {
	return (
		<>
			<div>
				<label htmlFor={name} className='block mb-2'>
					{label}:
				</label>
				<Field
					type='text'
					id={name}
					name={name}
					className='w-full p-2 mb-2 border border-gray-300 rounded'
				/>
				<ErrorMessage
					name={name}
					component='div'
					className='text-red-500 mb-2'
				/>
			</div>
		</>
	)
}

export default FieldThree

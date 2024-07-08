import { Field, ErrorMessage } from 'formik'
import FieldErrorMessage from '../components/FieldErrorMessage'

const FieldInput = ({ label, name }) => {
	return (
		<>
			<div className='w-full'>
				<label htmlFor={name} className='block mb-2'>
					{label}:
				</label>
				<Field
					type='text'
					id={name}
					name={name}
					className='w-full p-2 mb-2 border border-gray-300 rounded'
				/>
				<FieldErrorMessage name={name} />
			</div>
		</>
	)
}

export default FieldInput

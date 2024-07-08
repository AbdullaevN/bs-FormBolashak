import { Field, Form, Formik } from 'formik'
import FieldErrorMessage from '../components/FieldErrorMessage'

const FieldConfirmCode = ({ label, name, ...props }) => {
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
					// className='w-full p-2 mb-2 border border-gray-300 rounded'
					className='w-full p-2 py-2 mb-2 border border-gray-300 rounded text-4xl'
				/>

				<FieldErrorMessage name={name} />
			</div>
		</>
	)
}

export default FieldConfirmCode

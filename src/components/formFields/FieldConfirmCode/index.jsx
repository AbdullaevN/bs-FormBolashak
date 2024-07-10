import { Field, Form, Formik, useField } from 'formik'
import FieldErrorMessage from '../components/FieldErrorMessage'

const FieldConfirmCode = ({ label, name, ...props }) => {
	// const [field, meta] = useField(props)
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
					maxLength='6'
					// className='w-full p-2 mb-2 border border-gray-300 rounded'
					className='w-full p-2 py-2 mb-2 border border-gray-300 rounded text-4xl'
				/>

				<FieldErrorMessage name={name} />
			</div>
			{/* <div className='flex flex-col items-center'>
				<label htmlFor={props.id || props.name}>{label}</label>
				<input
					className='mt-2 px-4 py-2 border border-gray-300 rounded'
					{...field}
					{...props}
				/>
				{meta.touched && meta.error ? (
					<div className='text-red-600 mt-2'>{meta.error}</div>
				) : null}
			</div> */}
		</>
	)
}

export default FieldConfirmCode

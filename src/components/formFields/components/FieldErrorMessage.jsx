import { ErrorMessage } from 'formik'

const FieldErrorMessage = ({ name }) => {
	return (
		<>
			<ErrorMessage name={name} component='div' className='text-red-500 mb-2' />
		</>
	)
}

export default FieldErrorMessage

import { ErrorMessage, Field } from 'formik'
import FieldErrorMessage from '../components/FieldErrorMessage'

const FieldCheckbox = ({ label, name }) => {
	return (
		<>
			<div className='my-2 flex justify-start items-start text-start w-full'>
				<label className='w-full'>
					<Field type='checkbox' name={name} className='mr-2 py-4' />
					{label}
				</label>
				<FieldErrorMessage name={name} />
			</div>
		</>
	)
}

export default FieldCheckbox

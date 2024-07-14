import { ErrorMessage, Field } from 'formik'
import FieldErrorMessage from '../components/FieldErrorMessage'

const FieldCheckbox = ({ label, name }) => {
	return (
		<>
			<div className='my-2 flex justify-start items-start text-start w-full    md:text-black    '>
				<label className='w-full sm:text-lg md:text-xl text-xs'>
					<Field
						type='checkbox'
						name={name}
						className='mr-2 py-4 sm:text-lg text-xs  md:text-black'
					/>
					{label}
				</label>
				<FieldErrorMessage name={name} />
			</div>
		</>
	)
}

export default FieldCheckbox

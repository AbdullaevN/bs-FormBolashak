import { ErrorMessage, Field, Form, Formik } from 'formik'
import FieldErrorMessage from '../components/FieldErrorMessage'

const FieldSelect = ({ label, name, optionsList, placeholder }) => {
	return (
		<>
			<div className='container mx-auto px-4 h-full flex flex-col text-start items-start'>
				<label htmlFor={name} className='block mb-2 text-start '>
					{label}:
				</label>
				<div className='flex items-center justify-center h-full w-full'>
					<div
						className='relative mb-2 flex items-center
            after:w-[8px] after:h-[8px] after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:absolute after:right-3'
					>
						<Field
							as='select'
							// component='select'
							name={name}
							className='text-black/70 bg-white px-3 py-2 transition-all cursor-pointer hover:border-blue-600/30 border border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black w-64'
						>
							<option value='' disabled selected>
								{placeholder}
							</option>
							{optionsList?.map((item, index) => {
								// console.log(item, 'item')
								return (
									<option key={index} value={item.value}>
										{item.label}
									</option>
								)
							})}
							{/* <option value='female'></option> */}
						</Field>
					</div>
				</div>
				<FieldErrorMessage name={name} />
			</div>
		</>
	)
}

export default FieldSelect

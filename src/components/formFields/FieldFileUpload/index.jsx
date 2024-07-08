import { ErrorMessage } from 'formik'
import { useState } from 'react'

const FieldFileUpload = ({ setFieldValue, label, name }) => {
	const [passportFrontPreview, setPassportFrontPreview] = useState(null)

	return (
		<>
			<div>
				<div className='col-span-full'>
					<label
						htmlFor={name}
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						{label}:
					</label>
					<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5'>
						<div className='text-center'>
							<img
								src='https://cdn.icon-icons.com/icons2/38/PNG/512/PaperClip_4895.png'
								alt=''
								className='w-10 h-10'
							/>
							{/* </svg> */}

							<div className='mt-4 flex text-sm leading-6 text-gray-600'>
								<label
									htmlFor={name}
									className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
								>
									<span>Выберите фотографию</span>
									<input
										id={name}
										name={name}
										type='file'
										className='sr-only w-full p-2 mb-2 border border-gray-300 rounded'
										onChange={event => {
											setFieldValue(name, event.currentTarget.files[0])
											setPassportFrontPreview(
												URL.createObjectURL(event.currentTarget.files[0])
											)
										}}
									/>

									<ErrorMessage
										name={name}
										component='div'
										className='text-red-500 mb-2'
									/>
								</label>
							</div>
							<p className='text-xs leading-5 text-gray-600'>
								PNG, JPG, GIF - 10MB
							</p>
						</div>
						{passportFrontPreview && (
							<img
								src={passportFrontPreview}
								alt='Preview'
								className='mb-2 h-32'
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default FieldFileUpload

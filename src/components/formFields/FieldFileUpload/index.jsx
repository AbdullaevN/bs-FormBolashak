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
							<svg
								className='mx-auto h-12 w-12 text-gray-300'
								viewBox='0 0 24 24'
								fill='currentColor'
								aria-hidden='true'
							>
								<path
									fillRule='evenodd'
									d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
									clipRule='evenodd'
								/>
							</svg>
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

import { ErrorMessage, Field } from 'formik'
import { useState } from 'react'

const FieldDocFilesUpload = ({ setFieldValue, label, name }) => {
	const [selectedFile, setSelectedFile] = useState('Файл не выбран')

	const handleFileChange = e => {
		const file = e.target.files[0]
		setSelectedFile(file ? file.name : 'Файл не выбран')
		// setFieldValue(name, file)
		setFieldValue(name, e.currentTarget.files)
	}
	return (
		<>
			<Field name={name}>
				{({ field }) => (
					<div className='flex flex-row items-center justify-between  text-center py-3 '>
						<div className='w-full flex'>
							<input
								type='file'
								id={name}
								onChange={handleFileChange}
								multiple
								// onChange={event => {
								// 	setFieldValue(name, event.currentTarget.files)
								// }}
								hidden
								// className='flex justify-center'
							/>

							<label
								htmlFor={name}
								className='flex justify-center items-center text-center w-full  text-slate-500 mr-4 py-2 px-20 rounded-md border-0 text-sm font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 cursor-pointer'
							>
								{label}
							</label>
						</div>
						<div className='w-full flex'>
							{selectedFile && (
								<span className='text-sm text-slate-500'>{selectedFile}</span>
							)}
						</div>
					</div>
				)}
			</Field>
			<ErrorMessage name={name} component='div' className='text-red-500 mb-2' />
		</>
	)
}

export default FieldDocFilesUpload

import { ErrorMessage, Field } from 'formik'
import { useState } from 'react'

const FieldDocFilesUpload = ({ setUpload, label, name }) => {
	const [selectedFile, setSelectedFile] = useState('Файл не выбран')

	return (
		<>
			<Field name={name}>
				{({ field }) => (
					<div className='flex flex-row items-center'>
						<input
							type='file'
							id={name}
							onChange={e => {
								setUpload({ name }, e.target.files[0])
								setSelectedFile(e.target.files[0].name || 'Файл не выбран')
							}}
							hidden
						/>
						<label
							htmlFor={name}
							className='block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 cursor-pointer'
						>
							{label}
						</label>
						<span className='text-sm text-slate-500'>{selectedFile}</span>
					</div>
				)}
			</Field>
			<ErrorMessage name={name} component='div' className='text-red-500 mb-2' />
		</>
	)
}

export default FieldDocFilesUpload

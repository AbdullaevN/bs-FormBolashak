import { useField } from 'formik'
import FieldErrorMessage from '../components/FieldErrorMessage'
import React, { useState, useEffect } from 'react'

const FieldConfirmCode = ({ label, name, ...props }) => {
	const [field, meta, helpers] = useField(name)
	const [inputValues, setInputValues] = useState(Array(6).fill(''))

	useEffect(() => {
		const code = inputValues.join('')
		helpers.setValue(code)
	}, [inputValues])

	const handleInputChange = (index, value) => {
		if (/^[0-9]$/.test(value) || value === '') {
			const newInputValues = [...inputValues]
			newInputValues[index] = value
			setInputValues(newInputValues)

			// Move focus to the next input
			if (value && index < 5) {
				const nextInput = document.getElementById(`code-input-${index + 1}`)
				if (nextInput) {
					nextInput.focus()
				}
			}
		}
	}

	const handleKeyDown = (index, e) => {
		if (e.key === 'Backspace' && !inputValues[index] && index > 0) {
			const prevInput = document.getElementById(`code-input-${index - 1}`)
			if (prevInput) {
				prevInput.focus()
			}
		}
	}

	return (
		<div>
			<label htmlFor={name} className='block mb-2'>
				{label}:
			</label>
			<div className='flex gap-2'>
				{inputValues.map((value, index) => (
					<input
						key={index}
						id={`code-input-${index}`}
						name={`${name}-${index}`}
						type='text'
						inputMode='numeric'
						autoComplete='one-time-code'
						maxLength='1'
						className='w-12 h-12 text-center border border-gray-950 rounded text-2xl'
						value={value}
						onChange={e => handleInputChange(index, e.target.value)}
						onKeyDown={e => handleKeyDown(index, e)}
					/>
				))}
			</div>
			<FieldErrorMessage name={name} />
		</div>
	)
}

export default FieldConfirmCode

// import { Field } from 'formik'
// import MaskedInput from 'react-text-mask'
// import FieldErrorMessage from '../components/FieldErrorMessage'
// import { PHONE_NUMBER_MASK_DEFAULT } from './consts'

// const FieldPhoneNumber = ({ label, name, ...props }) => {
// 	return (
// 		<div>
// 			<label htmlFor={name} className='block  text-xl pb-10'>
// 				{label}:
// 			</label>
// 			<Field name={name} className='py-5 '>
// 				{({ field, form }) => (
// 					<MaskedTextInput field={field} form={form} {...props} />
// 				)}
// 			</Field>
// 			<FieldErrorMessage name={name} />
// 		</div>
// 	)
// }

// export default FieldPhoneNumber

// const MaskedTextInput = ({ field, form, ...props }) => {
// 	return (
// 		<MaskedInput
// 			{...field}
// 			{...props}
// 			mask={PHONE_NUMBER_MASK_DEFAULT}
// 			onChange={e => form.setFieldValue(field.name, e.target.value)}
// 			className='w-full p-2 py-2 mb-2 border border-gray-300 rounded text-auto'
// 			placeholder='Введите номер телефона'
// 			guide={false}
// 		/>
// 	)
// }
import { Field } from 'formik'
import React, { useState, useEffect } from 'react'
import FieldErrorMessage from '../components/FieldErrorMessage'

const FieldPhoneNumber = ({ label, name, ...props }) => {
	return (
		<div>
			<label htmlFor={name} className='block text-xl pb-10'>
				{label}:
			</label>
			<Field name={name} className='py-5'>
				{({ field, form }) => (
					<PhoneNumberInput field={field} form={form} {...props} />
				)}
			</Field>
			<FieldErrorMessage name={name} />
		</div>
	)
}

export default FieldPhoneNumber

const PhoneNumberInput = ({ field, form, ...props }) => {
	const [inputValues, setInputValues] = useState(Array(10).fill(''))

	useEffect(() => {
		const phoneNumber = `+996 ${inputValues.slice(0, 3).join('')} ${inputValues
			.slice(3, 5)
			.join('')} ${inputValues.slice(5, 7).join('')} ${inputValues
			.slice(7, 9)
			.join('')}`
		form.setFieldValue(field.name, phoneNumber)
	}, [inputValues])

	const handleInputChange = (index, value) => {
		if (/^[0-9]$/.test(value) || value === '') {
			const newInputValues = [...inputValues]
			newInputValues[index] = value
			setInputValues(newInputValues)

			// Move focus to the next input
			if (value && index < inputValues.length - 1) {
				const nextInput = document.getElementById(`phone-input-${index + 1}`)
				if (nextInput) {
					nextInput.focus()
				}
			}
		}
	}

	const handleKeyDown = (index, e) => {
		if (e.key === 'Backspace' && !inputValues[index] && index > 0) {
			const prevInput = document.getElementById(`phone-input-${index - 1}`)
			if (prevInput) {
				prevInput.focus()
			}
		}
	}

	const inputStyle =
		'w-10 h-10 text-center border border-gray-300 rounded text-xl'

	return (
		<div className='flex items-center gap-1 w-[50%]'>
			<span className='text-xl'>+996</span>
			{inputValues.slice(0, 3).map((value, index) => (
				<input
					key={index}
					id={`phone-input-${index}`}
					name={`${field.name}-${index}`}
					type='text'
					inputMode='numeric'
					autoComplete='tel'
					maxLength='1'
					className={inputStyle}
					value={value}
					onChange={e => handleInputChange(index, e.target.value)}
					onKeyDown={e => handleKeyDown(index, e)}
				/>
			))}
			<span className='text-xl'>&nbsp;</span>
			{inputValues.slice(3, 5).map((value, index) => (
				<input
					key={index + 3}
					id={`phone-input-${index + 3}`}
					name={`${field.name}-${index + 3}`}
					type='text'
					inputMode='numeric'
					autoComplete='tel'
					maxLength='1'
					className={inputStyle}
					value={value}
					onChange={e => handleInputChange(index + 3, e.target.value)}
					onKeyDown={e => handleKeyDown(index + 3, e)}
				/>
			))}
			<span className='text-xl'>&nbsp;</span>
			{inputValues.slice(5, 7).map((value, index) => (
				<input
					key={index + 5}
					id={`phone-input-${index + 5}`}
					name={`${field.name}-${index + 5}`}
					type='text'
					inputMode='numeric'
					autoComplete='tel'
					maxLength='1'
					className={inputStyle}
					value={value}
					onChange={e => handleInputChange(index + 5, e.target.value)}
					onKeyDown={e => handleKeyDown(index + 5, e)}
				/>
			))}
			<span className='text-xl'>&nbsp;</span>
			{inputValues.slice(7, 9).map((value, index) => (
				<input
					key={index + 7}
					id={`phone-input-${index + 7}`}
					name={`${field.name}-${index + 7}`}
					type='text'
					inputMode='numeric'
					autoComplete='tel'
					maxLength='1'
					className={inputStyle}
					value={value}
					onChange={e => handleInputChange(index + 7, e.target.value)}
					onKeyDown={e => handleKeyDown(index + 7, e)}
				/>
			))}
		</div>
	)
}

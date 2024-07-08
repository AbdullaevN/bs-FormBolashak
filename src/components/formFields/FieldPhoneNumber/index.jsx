import { Field } from 'formik'
import MaskedInput from 'react-text-mask'
import FieldErrorMessage from '../components/FieldErrorMessage'
import { PHONE_NUMBER_MASK_DEFAULT } from './consts'

const FieldPhoneNumber = ({ label, name, ...props }) => {
	return (
		<div>
			<label htmlFor={name} className='block  text-xl'>
				{label}:
			</label>
			<Field name={name} className='py-12'>
				{({ field, form }) => (
					<MaskedTextInput field={field} form={form} {...props} />
				)}
			</Field>
			<FieldErrorMessage name={name} />
		</div>
	)
}

export default FieldPhoneNumber

const MaskedTextInput = ({ field, form, ...props }) => {
	return (
		<MaskedInput
			{...field}
			{...props}
			mask={PHONE_NUMBER_MASK_DEFAULT}
			onChange={e => form.setFieldValue(field.name, e.target.value)}
			className='w-full p-2 py-2 mb-2 border border-gray-300 rounded text-4xl'
			placeholder='Введите номер телефона'
			guide={false}
		/>
	)
}

// const FieldPhoneNumber = ({ label, name }) => {
// 	return (
// 		<>
// 			<div>
// 				<label htmlFor={name} className='block mb-2'>
// 					{label}:
// 				</label>
// 				<MaskedInput
// 					mask={[
// 						'+',

// 						/[1-9]/,
// 						/\d/,
// 						/\d/,
// 						' ',
// 						'(',
// 						/\d/,
// 						/\d/,
// 						/\d/,
// 						')',

// 						'-',
// 						/\d/,
// 						/\d/,
// 						'-',
// 						/\d/,
// 						/\d/,
// 						'-',
// 						/\d/,
// 						/\d/,
// 					]}
// 					// className='form-control'
// 					className='w-full p-2 mb-2 border border-gray-300 rounded'
// 					name={name}
// 					placeholder='Введите номер телефона'
// 					guide={false}
// 					id='my-input-id'
// 					onBlur={() => {}}
// 					onChange={() => {}}
// 				/>
// 			</div>
// 		</>
// 	)
// }

// export default FieldPhoneNumber

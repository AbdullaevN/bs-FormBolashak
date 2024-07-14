import * as Yup from 'yup'

const REQUARED_TEXT = 'Поле не может быть пустым'
const CHOOSE_FILE = 'Выберите файл'
const PHONE_INVALID_TEXT = 'Номер телефона недействителен'

export const stepFieldCheckbox = Yup.object({
	agreed1: Yup.bool().oneOf([true], 'Необходимо согласиться с условиями'),
	agreed2: Yup.bool().oneOf(
		[true],
		'Необходимо согласиться с политикой конфиденциальности'
	),
	// Другие поля
})

// export const stepConfirmPhoneValidation = Yup.object({
// 	phone: Yup.string().required(REQUARED_TEXT),
// })
export const stepConfirmPhoneValidation = Yup.object({
	phone: Yup.string()
		.required(REQUARED_TEXT)
		.matches(/^\+996\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/, PHONE_INVALID_TEXT),
})

export const stepConfirmCodeValidation = Yup.object({
	code: Yup.string()
		.max(6, 'Код должен состоять из 6 цифр')
		.required(REQUARED_TEXT),
})
export const stepMainFieldsValidation = Yup.object({
	name: Yup.string().required(REQUARED_TEXT),
	lastName: Yup.string().required(REQUARED_TEXT),
	inn: Yup.string()
		.length(14, 'Поле ИНН должен иметь 14 символов')
		.matches(
			/^\d{14}$/,
			'Поле ИНН должно состоять только из цифр и иметь 14 символов'
		)
		.required(REQUARED_TEXT),
	idNumber: Yup.string().required(REQUARED_TEXT),
	nationality: Yup.string().required(REQUARED_TEXT),
	dateOfBirthday: Yup.date().required(REQUARED_TEXT),
	sex: Yup.string().required(REQUARED_TEXT),
	authority: Yup.string().required(REQUARED_TEXT),
	placeOfBirth: Yup.string().required(REQUARED_TEXT),
	dateOfIssue: Yup.date().required(REQUARED_TEXT),

	email: Yup.string().email('Некорректная почта').required(REQUARED_TEXT),
	// phone: Yup.string().required(REQUARED_TEXT),
	address: Yup.string().required(REQUARED_TEXT),
	city: Yup.string().required(REQUARED_TEXT),
	passportFront: Yup.mixed().required(CHOOSE_FILE),
	passportBack: Yup.mixed().required(CHOOSE_FILE),
	selfieWithPassport: Yup.mixed().required(CHOOSE_FILE),
})

export const stepAddFilesValidation = Yup.object({
	file1: Yup.mixed().required(CHOOSE_FILE),
	file2: Yup.mixed().required(CHOOSE_FILE),
	file3: Yup.mixed().required(CHOOSE_FILE),
	file4: Yup.mixed().required(CHOOSE_FILE),
	file5: Yup.mixed().required(CHOOSE_FILE),
	file6: Yup.mixed().required(CHOOSE_FILE),
	file7: Yup.mixed().required(CHOOSE_FILE),
	file8: Yup.mixed().required(CHOOSE_FILE),
})

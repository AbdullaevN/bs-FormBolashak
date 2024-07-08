import { useLocalStorage } from 'react-use'
import { SERVER_DATE_FORMAT } from '../globalConsts/timeFormats'
import dayjs from 'dayjs'

const CONFIRM_CODE_DEFAULT_MINUTES_DILATION = 2

// Request fromBackend backend
export const confirmPhoneRequest = (
	phone,
	setStorageConfirmPhone,
	setStorageCodeExpired,
	setStep
) => {
	console.log('setStep', setStep)
	//fetch
	// if success then ()
	let digitsOnly = phone?.replace(/\D/g, '')
	setStorageConfirmPhone(`${digitsOnly}`)
	// срок действия кода
	const TIME_FROM_BACKEND = dayjs()
		.add(100, 'seconds')
		.format(SERVER_DATE_FORMAT)
	const codeTime =
		TIME_FROM_BACKEND && dayjs(TIME_FROM_BACKEND, SERVER_DATE_FORMAT).isValid()
			? TIME_FROM_BACKEND
			: dayjs()
					.add(CONFIRM_CODE_DEFAULT_MINUTES_DILATION, 'minutes')
					.format(SERVER_DATE_FORMAT)
	setStorageCodeExpired(codeTime)
	if (setStep) {
		setStep(3)
	}

	// if failure catch()
	//  выводишь всплывашку, что запрос не прошёл
}

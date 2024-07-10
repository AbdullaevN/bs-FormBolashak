import { SERVER_DATE_FORMAT } from '../globalConsts/timeFormats'
import dayjs from 'dayjs'
import axios from 'axios'

const CONFIRM_CODE_DEFAULT_MINUTES_DILATION = 2

export const confirmPhoneRequest = async (
	phone,
	setStorageConfirmPhone,
	setStorageCodeExpired,
	setStorageAccessToken,
	setStep
) => {
	try {
		const digitsOnly = phone.replace(/\D/g, '')

		const response = await axios.post(
			'http://77.235.20.172:3605/api/users/send_otp_code',
			{ phone: digitsOnly }
		)

		// console.log('Response1:', digitsOnly)

		if (response.data && response.data.result.success) {
			console.log('Success !!!!!!!!!!!', response.data)
			setStorageAccessToken(response.data.result.accessToken)
			setStorageConfirmPhone(digitsOnly)

			const TIME_FROM_BACKEND = dayjs()
				.add(10, 'seconds')
				.format(SERVER_DATE_FORMAT)
			const codeTime =
				TIME_FROM_BACKEND &&
				dayjs(TIME_FROM_BACKEND, SERVER_DATE_FORMAT).isValid()
					? TIME_FROM_BACKEND
					: dayjs()
							.add(CONFIRM_CODE_DEFAULT_MINUTES_DILATION, 'minutes')
							.format(SERVER_DATE_FORMAT)
			setStorageCodeExpired(codeTime)

			setStep(3)

			// console.log('Code expiration time:', setStep(3))
		} else {
			if (response.data && response.data.result.message) {
				alert(response.data.message) // Display specific error message to the user
			} else {
				alert('Ошибка при отправке кода, попробуйте снова1') // Generic error message
			}
			alert('Ошибка при отправке кода, попробуйте снова2')
		}
	} catch (error) {
		console.error('Error:', error) // Выводим ошибку для отладки
		alert('Ошибка при отправке кода, попробуйте снова3')
	}
}

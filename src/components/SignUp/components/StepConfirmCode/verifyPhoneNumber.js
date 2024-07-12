import axios from 'axios'

export const verifyPhoneNumber = async (code, phone, accessToken) => {
	try {
		const requestData = {
			otpCode: code,
			phone: phone,
		}

		console.log()
		const response = await axios.post(
			'http://77.235.20.172:3605/api/users/verifi_phone',
			requestData,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		// console.log(response.data.result.userCodeid, 'hhhheeer')
		let codeID = response.data.result.userCodeid
		console.log(codeID, 'zaraza')

		if (response.status === 200) {
			console.log('Verification success:', response.data)
			return codeID
		} else if (response.status === 401) {
			console.log('Verification failed:', response.data)
			throw new Error('Не зарегистрирован')
		} else {
			console.error('Verification failed:', response.data.message)
			throw new Error(response.data.message)
		}
	} catch (error) {
		console.error('Error verifying phone number:', error.message)
		throw error
	}
}

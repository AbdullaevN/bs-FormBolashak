import { Form, Formik } from 'formik'
import { stepConfirmCodeValidation } from '../../formAttributes'
import FieldConfirmCode from '../../../formFields/FieldConfirmCode'
import CountdownTimer from '../../../globalComponents/CountdownTimer'
import { useLocalStorage } from 'react-use'
import {
	ACCESS_TOKEN_STORAGE_KEY,
	CODE_EXPIRED_STORAGE_KEY,
	CODE_SUCCESS_EXPIRED_STORAGE_KEY,
	CONFIRM_PHONE_STORAGE_KEY,
} from '../../consts'
import { useCallback, useEffect, useState } from 'react'
import { getNextRetryTimeValue } from '../../../../helpers/timeHelpers'
import { confirmPhoneRequest } from '../../../../request/requestConfirmPhone'
import { SERVER_DATE_FORMAT } from '../../../../globalConsts/timeFormats'
import dayjs from 'dayjs'
import { verifyPhoneNumber } from './verifyPhoneNumber'
import FieldErrorMessage from '../../../formFields/components/FieldErrorMessage'

const StepConfirmCode = ({ setStep }) => {
	const [codeSuccess, setCodeSuccess] = useLocalStorage(
		CODE_SUCCESS_EXPIRED_STORAGE_KEY,
		false
	)

	const [isWaitingCode, setIsWaitingCode] = useState(false)
	const [validationError, setValidationError] = useState('')

	const [
		storageConfirmPhone,
		setStorageConfirmPhone,
		removeStorageConfirmPhone,
	] = useLocalStorage(CONFIRM_PHONE_STORAGE_KEY)
	const [storageCodeExpired, setStorageCodeExpired, removeStorageCodeExpired] =
		useLocalStorage(CODE_EXPIRED_STORAGE_KEY)

	const [storageAccessToken, setStorageAccessToken] = useLocalStorage(
		ACCESS_TOKEN_STORAGE_KEY
	)
	const nextRetryTimeValue = getNextRetryTimeValue(storageCodeExpired)

	useEffect(() => {
		if (nextRetryTimeValue && storageConfirmPhone) {
			setIsWaitingCode(true)
		} else {
			setIsWaitingCode(false)
		}
	}, [nextRetryTimeValue, storageConfirmPhone])

	return (
		<>
			<div className='flex justify-center items-center flex-col h-[100%] gap-10 pb-20'>
				<h2 className='text-2xl font-semibold mb-4 pt-10'>
					Введите код который к вам пришел на номер телефона
				</h2>
				<Formik
					initialValues={{
						code: '',
					}}
					validationSchema={stepConfirmCodeValidation}
					// onSubmit={values => {
					// 	try {
					// 		verifyPhoneNumber(
					// 			values.code,
					// 			storageConfirmPhone,
					// 			storageAccessToken
					// 		).then(() => {
					// 			removeStorageCodeExpired()
					// 			setCodeSuccess(
					// 				dayjs().add(5, 'minutes').format(SERVER_DATE_FORMAT)
					// 			)
					// 			setStep(4)
					// 		})
					// 	} catch (error) {
					// 		setValidationError('Ошибка верификации: ' + error.message)

					// 		console.error('Verification error:', error.message)
					// 	}
					// }}
					onSubmit={(values, { setSubmitting }) => {
						setValidationError('') // Clear previous error message
						verifyPhoneNumber(
							values.code,
							storageConfirmPhone,
							storageAccessToken
						)
							.then(() => {
								removeStorageCodeExpired()
								setCodeSuccess(
									dayjs().add(5, 'minutes').format(SERVER_DATE_FORMAT)
								)
								setStep(4)
							})
							.catch(error => {
								setValidationError('Ошибка верификации, не правильный код ')
								console.error('Verification error:', error.message)
							})
							.finally(() => {
								setSubmitting(false)
							})
					}}
				>
					{({ isValid, dirty, values }) => {
						// console.log('	isalid', isValid)
						// console.log('values,', values)
						return (
							<Form className='flex justify-between  flex-col gap-10 items-center pt-10'>
								{validationError && (
									<div className='text-red-500'>{validationError}</div>
								)}

								{}
								<FieldConfirmCode
									label='Введите код подтверждения'
									name='code'
								/>

								<div className=' mt-4 flex gap-8 justify-between w-full'>
									<button
										type='button'
										onClick={() => setStep(2)}
										// disabled={isWaitingCode}
										className={`px-6 w-36  py-2 text-white bg-blue-500 rounded`}
									>
										Назад
									</button>
									<button
										type='submit'
										className={`px-6 w-36  py-2  text-white rounded ${
											isValid && dirty
												? 'bg-blue-500'
												: 'bg-gray-400 cursor-not-allowed'
										}`}
									>
										Вперёд
									</button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</div>
		</>
	)
}

export default StepConfirmCode

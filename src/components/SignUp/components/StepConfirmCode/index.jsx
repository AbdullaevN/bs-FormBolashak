import { Form, Formik } from 'formik'
import { stepConfirmCodeValidation } from '../../formAttributes'
import FieldConfirmCode from '../../../formFields/FieldConfirmCode'
import CountdownTimer from '../../../globalComponents/CountdownTimer'
import { useLocalStorage } from 'react-use'
import {
	CODE_EXPIRED_STORAGE_KEY,
	CODE_SUCCESS_EXPIRED_STORAGE_KEY,
	CONFIRM_PHONE_STORAGE_KEY,
} from '../../consts'
import { useCallback, useEffect, useState } from 'react'
import { getNextRetryTimeValue } from '../../../../helpers/timeHelpers'
import { confirmPhoneRequest } from '../../../../request/requestConfirmPhone'
import { SERVER_DATE_FORMAT } from '../../../../globalConsts/timeFormats'
import dayjs from 'dayjs'

const StepConfirmCode = ({ setStep }) => {
	const [codeSuccess, setCodeSuccess] = useLocalStorage(
		CODE_SUCCESS_EXPIRED_STORAGE_KEY,
		false
	)

	const [isWaitingCode, setIsWaitingCode] = useState(false)

	const [
		storageConfirmPhone,
		setStorageConfirmPhone,
		removeStorageConfirmPhone,
	] = useLocalStorage(CONFIRM_PHONE_STORAGE_KEY)
	const [storageCodeExpired, setStorageCodeExpired, removeStorageCodeExpired] =
		useLocalStorage(CODE_EXPIRED_STORAGE_KEY)

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
						phone: '',
					}}
					validationSchema={stepConfirmCodeValidation}
					onSubmit={values => {
						setStep(4)
						removeStorageCodeExpired()
						setCodeSuccess(dayjs().add(1, 'day').format(SERVER_DATE_FORMAT))
					}}
				>
					{({ isValid, dirty, values }) => {
						console.log('	isalid', isValid)
						console.log('values,', values)
						return (
							<Form className='flex justify-between  flex-col gap-10 items-center pt-10'>
								<FieldConfirmCode
									label='Введите код подтверждения'
									name='phone'
								/>
								{isWaitingCode && (
									<div>
										Повторная отправка кода через :
										<CountdownTimer
											onFinish={() => {
												removeStorageCodeExpired()
											}}
											targetTime={storageCodeExpired}
										/>
									</div>
								)}
								{!isWaitingCode ? (
									<button
										type='button'
										onClick={() => {
											confirmPhoneRequest(
												storageConfirmPhone,
												setStorageConfirmPhone,
												setStorageCodeExpired
											)
										}}
										className={`px-8  w-auto py-4  text-white bg-blue-500 rounded
							
											`}
									>
										Отправить код повторно
									</button>
								) : null}

								<div className=' mt-4 flex gap-8 justify-between '>
									<button
										type='button'
										onClick={() => setStep(2)}
										disabled={isWaitingCode}
										className={`px-8  w-36 py-4  text-white bg-blue-500 rounded
											${!isWaitingCode ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'}
											`}
									>
										Назад
									</button>
									<button
										type='submit'
										className={`px-8 w-36  py-4  text-white rounded ${
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

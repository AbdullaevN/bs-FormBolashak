import { Form, Formik } from 'formik'
import FieldPhoneNumber from '../../../formFields/FieldPhoneNumber'
import { stepConfirmPhoneValidation } from '../../formAttributes'
import { useLocalStorage } from 'react-use'
import {
	CODE_EXPIRED_STORAGE_KEY,
	CONFIRM_PHONE_STORAGE_KEY,
} from '../../consts'
import dayjs from 'dayjs'
import { SERVER_DATE_FORMAT } from '../../../../globalConsts/timeFormats'
import { confirmPhoneRequest } from '../../../../request/requestConfirmPhone'

const StepConfirmPhone = ({ setStep }) => {
	const [storageConfirmPhone, setStorageConfirmPhone] = useLocalStorage(
		CONFIRM_PHONE_STORAGE_KEY
	)
	const [storageCodeExpired, setStorageCodeExpired] = useLocalStorage(
		CODE_EXPIRED_STORAGE_KEY
	)

	// // Request fromBackend backend
	// const confirmPhoneRequest = phone => {
	// 	//fetch
	// 	// if success then ()
	// 	let digitsOnly = phone?.replace(/\D/g, '')
	// 	setStorageConfirmPhone(`${digitsOnly}`)
	// 	// срок действия кода
	// 	const TIME_FROM_BACKEND = dayjs()
	// 		.add(10, 'seconds')
	// 		.format(SERVER_DATE_FORMAT)
	// 	const codeTime =
	// 		TIME_FROM_BACKEND &&
	// 		dayjs(TIME_FROM_BACKEND, SERVER_DATE_FORMAT).isValid()
	// 			? TIME_FROM_BACKEND
	// 			: dayjs()
	// 					.add(CONFIRM_CODE_DEFAULT_MINUTES_DILATION, 'minutes')
	// 					.format(SERVER_DATE_FORMAT)
	// 	setStorageCodeExpired(codeTime)
	// 	setStep(3)
	// 	console.log('code time', codeTime)

	// 	// if failure catch()
	// 	//  выводишь всплывашку, что запрос не прошёл
	// }

	return (
		<>
			<div className='flex justify-center items-center flex-col gap-10'>
				<h2 className='text-2xl font-semibold mb-4 pt-10'>
					Подтверждение кода по СМС
				</h2>
				<Formik
					initialValues={{
						phone: '',
					}}
					validationSchema={stepConfirmPhoneValidation}
					onSubmit={values => {
						confirmPhoneRequest(
							values?.phone,
							setStorageConfirmPhone,
							setStorageCodeExpired,
							setStep
						)
					}}
				>
					{({ isValid, dirty, values }) => {
						// console.log('	isalid', isValid)
						// console.log('values,', values)
						return (
							<Form className='flex justify-between flex-col gap-10 items-center pt-10'>
								<FieldPhoneNumber
									label='Пожалуйста, введите ваш номер телефона. Вам придет СМС код для подтверждения'
									name='phone'
								/>

								<div className=' mt-4 flex gap-8   justify-between  '>
									<button
										type='button'
										onClick={() => setStep(1)}
										className='px-8  w-36 py-4  text-white bg-blue-500 rounded'
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

export default StepConfirmPhone

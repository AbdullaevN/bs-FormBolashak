import { Form, Formik } from 'formik'
import FieldPhoneNumber from '../../../formFields/FieldPhoneNumber'
import { stepConfirmPhoneValidation } from '../../formAttributes'
import { useLocalStorage } from 'react-use'
import {
	ACCESS_TOKEN_STORAGE_KEY,
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
	const [storageAccessToken, setStorageAccessToken] = useLocalStorage(
		ACCESS_TOKEN_STORAGE_KEY
	)

	const [storageCodeExpired, setStorageCodeExpired] = useLocalStorage(
		CODE_EXPIRED_STORAGE_KEY
	)

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
					onSubmit={async values => {
						console.log(values, 'submmit')
						await confirmPhoneRequest(
							values?.phone,
							setStorageConfirmPhone,
							setStorageCodeExpired,
							setStorageAccessToken,
							setStep
						)
					}}
				>
					{({ isValid, dirty, values }) => {
						return (
							<Form className='flex justify-between flex-col gap-10 items-center pt-10   w-full'>
								<FieldPhoneNumber
									label='Пожалуйста, введите ваш номер телефона. Вам придет СМС код для подтверждения'
									name='phone'
								/>

								<div className='  flex  justify-between items-start  w-full '>
									<button
										type='button'
										onClick={() => setStep(2)}
										className='px-6  w-36 py-2  text-white bg-blue-500 rounded'
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

export default StepConfirmPhone

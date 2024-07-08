import { useEffect, useState } from 'react'

import StepAddFiles from './components/StepAddFiles'
import StepAgreed from './components/StepAgreed'
import StepConfirmPhone from './components/StepConfirmPhone'
import StepConfirmCode from './components/StepConfirmCode'
import StepMainFields from './components/StepMainFields'
import {
	CODE_EXPIRED_STORAGE_KEY,
	CODE_SUCCESS_EXPIRED_STORAGE_KEY,
	CONFIRM_PHONE_STORAGE_KEY,
} from './consts'
import { useLocalStorage, useSessionStorage } from 'react-use'
import { getNextRetryTimeValue } from '../../helpers/timeHelpers'
import dayjs from 'dayjs'
import { SERVER_DATE_FORMAT } from '../../globalConsts/timeFormats'
import { Link } from 'react-router-dom'
import BreadCrumbs from '../BreadCrumbs'
import StepSuccessfully from './components/StepSuccessfully'

const SignUp = () => {
	const [
		storageConfirmPhone,
		setStorageConfirmPhone,
		resetStorageConfirmPhone,
	] = useLocalStorage(CONFIRM_PHONE_STORAGE_KEY)
	const [storageCodeExpired, setStorageCodeExpired, resetStorageCodeExpired] =
		useLocalStorage(CODE_EXPIRED_STORAGE_KEY)
	const [codeSuccessExpired, setCodeSuccessExpired, resetCodeSuccessExpired] =
		useLocalStorage(CODE_SUCCESS_EXPIRED_STORAGE_KEY)

	const [currentStep, setCurrentStep] = useState(undefined)

	const nextRetryTimeValue = getNextRetryTimeValue(storageCodeExpired)

	const setStep = number => {
		setCurrentStep(number)
		console.log(number, 'number')
	}

	useEffect(() => {
		console.log('nextRetryTimeValue', nextRetryTimeValue)
		console.log('storageConfirmPhone', storageConfirmPhone)
		if (codeSuccessExpired) {
			if (
				codeSuccessExpired &&
				dayjs(codeSuccessExpired, SERVER_DATE_FORMAT).isValid() &&
				dayjs(codeSuccessExpired, SERVER_DATE_FORMAT).isAfter(dayjs())
			) {
				setStep(4)
			} else {
				resetCodeSuccessExpired()
				if (nextRetryTimeValue && storageConfirmPhone) {
					setStep(3)
				} else {
					resetCodeSuccessExpired()
					resetStorageConfirmPhone()
					resetStorageCodeExpired()
					setStep(1)
				}
			}
			setStep(5)
		} else {
			setStep(1)
		}

		// }, [])
	}, [nextRetryTimeValue, storageConfirmPhone, codeSuccessExpired])

	return (
		<>
			<div className='flex items-center justify-center min-h-screen bg-gray-100'>
				<div className='bg-white p-8 rounded-lg shadow-lg w-full h-full max-w-screen-2xl'>
					<BreadCrumbs setStep={setStep} currentStep={currentStep} />
					{currentStep === 1 && <StepAgreed setStep={setStep} />}

					{currentStep === 2 && <StepConfirmPhone setStep={setStep} />}

					{currentStep === 3 && <StepConfirmCode setStep={setStep} />}

					{currentStep === 4 && <StepMainFields setStep={setStep} />}

					{currentStep === 5 && <StepAddFiles setStep={setStep} />}
					{currentStep === 6 && <StepSuccessfully setStep={setStep} />}
				</div>
			</div>
		</>
	)
}

export default SignUp

// const [requestData, setRequestData] = useState(null)

// const postFormRequest = values => {
// 	console.log('values', values)
// 	fetch('https://lac-company.herokuapp.com/news/')
// 		.then(response => response.json())
// 		.then(data => setRequestData(data))
// 		.catch(error => console.error(error))
// }

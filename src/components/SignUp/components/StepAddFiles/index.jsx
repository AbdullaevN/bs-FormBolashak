// import { Form, Formik } from 'formik'
// import FieldDocFilesUpload from '../../../formFields/FieldDocFilesUpload'
// import { stepAddFilesValidation } from '../../formAttributes'
// import { useDispatch, useSelector } from 'react-redux'
// import { submitForm } from '../../../../store/slices/formSlice'
// import axios from 'axios'
// import { useState } from 'react'
// import { merge } from 'lodash'
// import { ACCESS_TOKEN_STORAGE_KEY } from '../../consts'
// import { useLocalStorage } from 'react-use'

// const StepAddFiles = ({ setStep, mainFormData }) => {
// 	const [storageAccessToken, setStorageAccessToken] = useLocalStorage(
// 		ACCESS_TOKEN_STORAGE_KEY
// 	)
// 	const handleSubmit = async values => {
// 		try {
// 			if (!storageAccessToken) {
// 				console.error('Access token is missing.')
// 				return
// 			}
// 			const combined = merge({}, values, mainFormData)
// 			console.log('combined', combined)

// 			const formData = new FormData()
// 			Object.keys(combined).forEach(key => {
// 				if (combined[key] instanceof FileList) {
// 					for (let i = 0; i < combined[key].length; i++) {
// 						formData.append(key, combined[key][i])
// 					}
// 				} else {
// 					formData.append(key, combined[key])
// 				}
// 			})

// 			console.log(formData, 'formData')
// 			const response = await axios.post(
// 				'http://77.235.20.172:3605/api/users/form_submit',
// 				formData,
// 				{
// 					headers: {
// 						'Content-Type': 'multipart/form-data',
// 						Authorization: `Bearer ${storageAccessToken}`, // Добавьте токен авторизации, если требуется
// 					},
// 				}
// 			)

// 			if (response.status === 200) {
// 				console.log('Form submission success:', response.data)
// 				setStep(6)
// 			} else {
// 				console.error('Form submission failed:', response.data)
// 				// Handle error case
// 			}
// 		} catch (error) {
// 			console.error('Form submission error:', error)
// 			// Handle error case
// 		}
// 	}

// 	// const handleSubmit = async values => {
// 	// 	try {
// 	// 		const combined = merge({}, values, mainFormData)
// 	// 		console.log('combined', combined)

// 	// 		const response = await axios.post(
// 	// 			'http://77.235.20.172:3605/api/users/form_submit',
// 	// 			combined,
// 	// 			{
// 	// 				headers: {
// 	// 					'Content-Type': 'multipart/form-data',
// 	// 				},
// 	// 			}
// 	// 		)

// 	// 		if (response.status === 200) {
// 	// 			console.log('Form submission success:', response.data)
// 	// 			setStep(6)
// 	// 		} else {
// 	// 			console.error('Form submission failed:', response.data)
// 	// 			// Handle error case
// 	// 		}
// 	// 	} catch (error) {
// 	// 		console.error('Form submission error:', error)
// 	// 		// Handle error case
// 	// 	}
// 	// }
// 	return (
// 		<>
// 			<div>
// 				<h2 className='text-2xl font-semibold mb-4'>Информация о компании</h2>
// 				<Formik
// 					initialValues={{
// 						file1: null,
// 						file2: null,
// 						file3: null,
// 						file4: null,
// 						file5: null,
// 						file6: null,
// 						file7: null,
// 						file8: null,
// 					}}
// 					validationSchema={stepAddFilesValidation}
// 					onSubmit={values => {
// 						handleSubmit(values)
// 					}}
// 				>
// 					{({ setFieldValue, isValid, dirty, values }) => (
// 						<Form>
// 							<div className='w-full'>
// 								{[...Array(8).keys()].map(index => (
// 									<div key={index} className='mb-4 flex items-center'>
// 										<FieldDocFilesUpload
// 											label={`Выберите документ ${index + 1}`}
// 											name={`file${index + 1}`}
// 											setFieldValue={setFieldValue}
// 										/>
// 										{values[`file${index + 1}`] && (
// 											<button
// 												type='button'
// 												onClick={() => {
// 													setFieldValue(`file${index + 1}`, null)
// 												}}
// 												className='ml-2 px-4 py-2 w-4/12 text-white bg-red-500 rounded'
// 											>
// 												Удалить
// 											</button>
// 										)}
// 									</div>
// 								))}
// 							</div>

// 							<div className='flex justify-between gap-5 mt-4'>
// 								<button
// 									type='button'
// 									onClick={() => setStep(4)}
// 									className='px-4 py-2 text-white bg-blue-500 rounded'
// 								>
// 									Назад
// 								</button>
// 								<button
// 									onClick={handleSubmit}
// 									type='submit'
// 									className={`px-4 py-2 text-white rounded ${
// 										isValid && dirty
// 											? 'bg-blue-500'
// 											: 'bg-gray-400 cursor-not-allowed'
// 									}`}
// 								>
// 									Отправить
// 								</button>
// 							</div>
// 						</Form>
// 					)}
// 				</Formik>
// 			</div>
// 		</>
// 	)
// }

// export default StepAddFiles
import { Form, Formik } from 'formik'
import FieldDocFilesUpload from '../../../formFields/FieldDocFilesUpload'
import { stepAddFilesValidation } from '../../formAttributes'
import axios from 'axios'
import { merge } from 'lodash'
import { ACCESS_TOKEN_STORAGE_KEY } from '../../consts'
import { useLocalStorage } from 'react-use'

const StepAddFiles = ({ setStep, mainFormData }) => {
	const [storageAccessToken] = useLocalStorage(ACCESS_TOKEN_STORAGE_KEY)

	const handleSubmit = async values => {
		try {
			if (!storageAccessToken) {
				console.error('Access token is missing.')
				return
			}
			const combined = merge({}, values, mainFormData)
			console.log('combined', combined)

			const formData = new FormData()
			Object.keys(combined).forEach(key => {
				if (combined[key] instanceof FileList) {
					for (let i = 0; i < combined[key].length; i++) {
						formData.append(key, combined[key][i])
					}
				} else {
					formData.append(key, combined[key])
				}
			})

			console.log(formData, 'formData')
			const response = await axios.post(
				'http://77.235.20.172:3605/api/users/form_submit',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${storageAccessToken}`,
					},
				}
			)

			if (response.status === 200) {
				console.log('Form submission success:', response.data)
				setStep(6)
			} else {
				console.error('Form submission failed:', response.data)
				// Handle error case
			}
		} catch (error) {
			console.error('Form submission error:', error)
			// Handle error case
		}
	}

	return (
		<div className='p-4 md:p-8'>
			<h2 className='text-2xl font-semibold mb-4'>Информация о компании</h2>
			<Formik
				initialValues={{
					file1: null,
					file2: null,
					file3: null,
					file4: null,
					file5: null,
					file6: null,
					file7: null,
					file8: null,
				}}
				validationSchema={stepAddFilesValidation}
				onSubmit={values => {
					handleSubmit(values)
				}}
			>
				{({ setFieldValue, isValid, dirty, values }) => (
					<Form>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							{[...Array(8).keys()].map(index => (
								<div key={index} className='flex flex-col items-start mb-4'>
									<FieldDocFilesUpload
										label={`Выберите документ ${index + 1}`}
										name={`file${index + 1}`}
										setFieldValue={setFieldValue}
									/>
									{values[`file${index + 1}`] && (
										<button
											type='button'
											onClick={() => {
												setFieldValue(`file${index + 1}`, null)
											}}
											className='mt-2 px-4 py-2 text-white bg-red-500 rounded'
										>
											Удалить
										</button>
									)}
								</div>
							))}
						</div>
						<div className='flex justify-between gap-5 mt-4'>
							<button
								type='button'
								onClick={() => setStep(4)}
								className='px-4 py-2 text-white bg-blue-500 rounded'
							>
								Назад
							</button>
							<button
								type='submit'
								className={`px-4 py-2 text-white rounded ${
									isValid && dirty
										? 'bg-blue-500'
										: 'bg-gray-400 cursor-not-allowed'
								}`}
							>
								Отправить
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default StepAddFiles

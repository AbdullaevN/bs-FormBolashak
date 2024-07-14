// import { Form, Formik } from 'formik'
// import { stepAddFilesValidation } from '../../formAttributes'
// import FieldDocFilesUpload from '../../components/../../formFields/FieldDocFilesUpload'
// import axios from 'axios'
// import { merge } from 'lodash'
// import { ACCESS_TOKEN_STORAGE_KEY } from '../../consts'
// import { useLocalStorage } from 'react-use'
// import { useEffect } from 'react'

// const StepAddFiles = ({ setStep, mainFormData, codeID }) => {
// 	let [storageAccessToken] = useLocalStorage(ACCESS_TOKEN_STORAGE_KEY)

// 	const handleSubmit = async values => {
// 		try {
// 			// Функция для проверки срока действия токена
// 			const isTokenExpired = token => {
// 				const payload = JSON.parse(atob(token.split('.')[1]))
// 				const expiry = payload.exp
// 				const now = Math.floor(Date.now() / 1000)
// 				return now >= expiry
// 			}

// 			// Функция для обновления токена
// 			const refreshAccessToken = async () => {
// 				try {
// 					const response = await axios.post('URL_FOR_REFRESH_TOKEN', {
// 						refreshToken: localStorage.getItem('refreshToken'),
// 					})
// 					localStorage.setItem('accessToken', response.data.accessToken)
// 					return response.data.accessToken
// 				} catch (error) {
// 					console.error('Failed to refresh access token', error)
// 					return null
// 				}
// 			}

// 			let accessToken = storageAccessToken

// 			// Проверяем, истек ли токен, если да, обновляем его
// 			if (isTokenExpired(accessToken)) {
// 				console.warn('Access token has expired. Refreshing token...')
// 				accessToken = await refreshAccessToken()
// 				if (!accessToken) {
// 					console.error('Unable to refresh access token. Please log in again.')
// 					return
// 				}
// 			}

// 			const combined = merge({}, values, mainFormData)
// 			console.log('combined', combined)

// 			const formData = new FormData()
// 			Object.keys(combined).forEach(key => {
// 				if (combined[key] instanceof FileList) {
// 					if (combined[key].length === 0) {
// 						console.warn(`FileList for key "${key}" is empty.`)
// 					} else {
// 						for (let i = 0; i < combined[key].length; i++) {
// 							formData.append(key, combined[key][i])
// 							console.log(
// 								`Appending file ${combined[key][i].name} to key "${key}"`
// 							)
// 						}
// 					}
// 				} else {
// 					formData.append(key, combined[key])
// 				}
// 			})

// 			formData.append('codeID', codeID)

// 			const response = await axios.post(
// 				'http://77.235.20.172:3605/api/users/form_submit',
// 				formData,
// 				{
// 					headers: {
// 						'Content-Type': 'multipart/form-data',
// 						Authorization: `Bearer ${accessToken}`,
// 					},
// 				}
// 			)

// 			if (response.status === 200) {
// 				console.log('Form submission success:', response.data)
// 				setStep(6)
// 			} else {
// 				console.error('Form submission failed:', response.data)
// 			}
// 		} catch (error) {
// 			if (error.response) {
// 				console.log('Статус:', error.response.status)
// 				if (error.response.status === 404) {
// 					console.error('Ошибка 404: Ресурс не найден.')
// 				} else if (error.response.status === 401) {
// 					console.error(
// 						'Ошибка 401: Unauthorized. Возможно, токен доступа недействителен или истек.'
// 					)
// 				}
// 				console.log('Тело ответа:', error.response.data)
// 				console.log('Заголовки:', error.response.headers)
// 			} else if (error.request) {
// 				console.log('Запрос:', error.request)
// 			} else {
// 				console.log('Ошибка:', error.message)
// 			}
// 			console.log('Конфигурация:', error.config)
// 		}
// 	}

// 	return (
// 		<div className='p-4 md:p-8'>
// 			<h2 className='text-2xl font-semibold mb-4'>Прикрепите документы</h2>
// 			<Formik
// 				initialValues={{
// 					file1: null,
// 					file2: null,
// 					file3: null,
// 					file4: null,
// 					file5: null,
// 					file6: null,
// 					file7: null,
// 					file8: null,
// 				}}
// 				validationSchema={stepAddFilesValidation}
// 				onSubmit={values => {
// 					handleSubmit(values)
// 				}}
// 			>
// 				{({ setFieldValue, isValid, dirty, values, resetForm }) => {
// 					useEffect(() => {
// 						resetForm()
// 					}, [resetForm])

// 					return (
// 						<Form>
// 							<div className='grid grid-cols-1 sm:grid-rows gap-4'>
// 								{[...Array(8).keys()].map(index => (
// 									<div
// 										key={index}
// 										className='flex flex-col sm:flex-row md:flex-row items-start sm:items-center mb-4'
// 									>
// 										<div className='flex flex-col sm:flex-row text-center place-items-center justify-center items-center gap-2 w-full'>
// 											<FieldDocFilesUpload
// 												label={`Выберите документ ${index + 1}`}
// 												name={`file${index + 1}`}
// 												setFieldValue={setFieldValue}
// 											/>
// 											<div className='flex items-center justify-center w-24'>
// 												{values[`file${index + 1}`] && (
// 													<button
// 														type='button'
// 														onClick={() => {
// 															setFieldValue(`file${index + 1}`, null)
// 														}}
// 														className='mt-2 sm:mt-0 px-4 py-2 text-white bg-red-500 rounded'
// 													>
// 														Удалить
// 													</button>
// 												)}
// 											</div>
// 										</div>
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
// 					)
// 				}}
// 			</Formik>
// 		</div>
// 	)
// }

// export default StepAddFiles

import { useEffect } from 'react'
import { Form, Formik } from 'formik'
import FieldDocFilesUpload from '../../../formFields/FieldDocFilesUpload'
import { stepAddFilesValidation } from '../../formAttributes'
import axios from 'axios'
import { merge } from 'lodash'
import { ACCESS_TOKEN_STORAGE_KEY } from '../../consts'
import { useLocalStorage } from 'react-use'

const StepAddFiles = ({ setStep, mainFormData, codeID }) => {
	let [storageAccessToken] = useLocalStorage(ACCESS_TOKEN_STORAGE_KEY)

	const handleSubmit = async values => {
		try {
			// Функция для проверки срока действия токена
			const isTokenExpired = token => {
				const payload = JSON.parse(atob(token.split('.')[1]))
				const expiry = payload.exp
				const now = Math.floor(Date.now() / 1000)
				return now >= expiry
			}

			// Функция для обновления токена
			const refreshAccessToken = async () => {
				try {
					const response = await axios.post('URL_FOR_REFRESH_TOKEN', {
						refreshToken: localStorage.getItem('refreshToken'),
					})
					localStorage.setItem('accessToken', response.data.accessToken)
					return response.data.accessToken
				} catch (error) {
					console.error('Failed to refresh access token', error)
					return null
				}
			}

			let accessToken = storageAccessToken

			// Проверяем, истек ли токен, если да, обновляем его
			if (isTokenExpired(accessToken)) {
				console.warn('Access token has expired. Refreshing token...')
				accessToken = await refreshAccessToken()
				if (!accessToken) {
					console.error('Unable to refresh access token. Please log in again.')
					return
				}
			}

			const combined = merge({}, values, mainFormData)
			console.log('combined', combined)

			const formData = new FormData()
			Object.keys(combined).forEach(key => {
				if (combined[key] instanceof FileList) {
					if (combined[key].length === 0) {
						console.warn(`FileList for key "${key}" is empty.`)
					} else {
						for (let i = 0; i < combined[key].length; i++) {
							formData.append(key, combined[key][i])
							console.log(
								`Appending file ${combined[key][i].name} to key "${key}"`
							)
						}
					}
				} else {
					formData.append(key, combined[key])
				}
			})

			formData.append('codeID', codeID)

			const response = await axios.post(
				'http://77.235.20.172:3605/api/users/form_submit',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			if (response.status === 200) {
				console.log('Form submission success:', response.data)
				setStep(6)
			} else {
				console.error('Form submission failed:', response.data)
			}
		} catch (error) {
			if (error.response) {
				console.log('Статус:', error.response.status)
				if (error.response.status === 404) {
					console.error('Ошибка 404: Ресурс не найден.')
				} else if (error.response.status === 401) {
					console.error(
						'Ошибка 401: Unauthorized. Возможно, токен доступа недействителен или истек.'
					)
				}
				console.log('Тело ответа:', error.response.data)
				console.log('Заголовки:', error.response.headers)
			} else if (error.request) {
				console.log('Запрос:', error.request)
			} else {
				console.log('Ошибка:', error.message)
			}
			console.log('Конфигурация:', error.config)
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
				{({ setFieldValue, isValid, dirty, values, resetForm }) => {
					useEffect(() => {
						resetForm()
					}, [resetForm])

					return (
						<Form>
							<div className='grid grid-cols-1 sm:grid-rows gap-4'>
								{[...Array(8).keys()].map(index => (
									<div
										key={index}
										className='flex flex-col sm:flex-row md:flex-row items-start sm:items-center mb-4'
									>
										<div className='flex flex-col sm:flex-row text-center place-items-center justify-center items-center gap-2 w-full'>
											<FieldDocFilesUpload
												label={`Выберите документ ${index + 1}`}
												name={`file${index + 1}`}
												setFieldValue={setFieldValue}
											/>
											<div className='flex items-center justify-center w-24'>
												{values[`file${index + 1}`] && (
													<button
														type='button'
														onClick={() => {
															setFieldValue(`file${index + 1}`, null)
														}}
														className='mt-2 sm:mt-0 px-4 py-2 text-white bg-red-500 rounded'
													>
														Удалить
													</button>
												)}
											</div>
										</div>
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
					)
				}}
			</Formik>
		</div>
	)
}

export default StepAddFiles

import { Form, Formik } from 'formik'
import FieldPhoneNumber from '../../../formFields/FieldPhoneNumber'
import FieldInput from '../../../formFields/FieldInput'
import FieldOfBirthday from '../../../formFields/FieldOfBirthday'
import FieldSelect from '../../../formFields/FieldSelect'
import FieldOfIssue from '../../../formFields/FieldOfIssue'
import FieldFileUpload from '../../../formFields/FieldFileUpload'
import { stepMainFieldsValidation } from '../../formAttributes'
import { useDispatch, useSelector } from 'react-redux'
import { setFormData } from '../../../../store/slices/formSlice'
import { useSessionStorage } from 'react-use'
import { useEffect, useState } from 'react'
import { CODE_SUCCESS_EXPIRED_STORAGE_KEY } from '../../consts'
import axios from 'axios'

const StepMainFields = ({ setStep, setMainFormData }) => {
	useEffect(() => {
		if (CODE_SUCCESS_EXPIRED_STORAGE_KEY) {
			null // Handle expired session case
		} else {
			setStep(3) // Navigate to the previous step if session expired
		}
	}, [setStep])

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const formDataToSend = new FormData()
			Object.keys(values).forEach(key => {
				if (
					key === 'passportFront' ||
					key === 'passportBack' ||
					key === 'selfieWithPassport'
				) {
					formDataToSend.append(key, values[key][0]) // Assuming values[key] is an array of files
				} else {
					formDataToSend.append(key, values[key])
				}
			})

			const response = await axios.post(
				'http://77.235.20.172:3605/api/users/form_submit',
				formDataToSend,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)

			console.log('Form submit response:', response.data)
			setStep(5) // Navigate to the next step upon successful submission
		} catch (error) {
			console.error('Error submitting form:', error.message)
			// Handle error as needed
		}
	}

	return (
		<>
			<div>
				<h2 className='text-2xl font-semibold mb-4'>Паспортные данные</h2>
				<Formik
					initialValues={{
						name: '',
						lastName: '',
						inn: '',
						idNumber: '',
						nationality: '',
						dateOfBirthday: '',
						sex: '',
						authority: '',
						placeOfBirth: '',
						dateOfIssue: '',
						email: '',
						address: '',
						city: '',
						passportFront: null,
						passportBack: null,
						selfieWithPassport: null,
					}}
					validationSchema={stepMainFieldsValidation}
					// onSubmit={values => {
					// 	setStep(5)
					// }}
					// onSubmit={handleSubmit}
					onSubmit={values => {
						// handleSubmit(values, actions)
						setMainFormData(values)
						setStep(5)
					}}
				>
					{({ setFieldValue, isValid, dirty, values }) => {
						console.log('	isalid', isValid)
						console.log('values,', values)
						return (
							<Form className='flex justify-between flex-col sm:flex-row md:flex-row'>
								<div className='  w-full md:w-6/12 sm:w-6/12'>
									<FieldInput label='Имя' name='name' />
									<FieldInput label='Фамилия' name='lastName' />
									<FieldInput label='ИНН' name='inn' />
									<FieldInput label='№ Документа' name='idNumber' />
									<FieldInput label='Национальность' name='nationality' />
									<div
										className='flex justify-between items-center flex-col md:flex-row sm:flex-row gap-5 text-start w-12/12
										'
									>
										<FieldOfBirthday
											label='Дата рождения'
											name='dateOfBirthday'
											className='w-6/12'
										/>

										<Form className='w-full sm:w-6/12 md:full'>
											<FieldSelect
												label='Пол'
												name='sex'
												optionsList={[
													{ value: 'male', label: 'Мужчина' },
													{ value: 'female', label: 'Женщина' },
												]}
												placeholder='Выберите ваш пол'
											/>
										</Form>
									</div>

									<FieldInput label='Место рождения' name='placeOfBirth' />

									<div
										className='flex justify-between items-center text-start gap-5
										'
									>
										<FieldOfIssue
											label='Дата выдачи'
											name='dateOfIssue'
											className='w-6/12'
										/>
										<FieldInput
											label='Орган выдачи'
											name='authority'
											className='w-6/12'
											isSelectSubmitting='isSelectSubmitting'
										/>
									</div>
									<FieldInput label='Почта' name='email' />
									<FieldInput label='Адрес' name='address' />
									<FieldInput label='Город' name='city' />
								</div>
								<div className='flex flex-col w-full sm:w-6/12 md:w-6/12 '>
									<div className='w-full px-10'>
										<FieldFileUpload
											label='Передняя сторона паспорта'
											name='passportFront'
											setFieldValue={setFieldValue}
										/>
										<FieldFileUpload
											label='Задняя сторона паспорта'
											name='passportBack'
											setFieldValue={setFieldValue}
										/>
										<FieldFileUpload
											label='Фото с паспортом'
											name='selfieWithPassport'
											setFieldValue={setFieldValue}
										/>
									</div>
									<div className='  mt-4 flex gap-5 justify-between'>
										<button
											type='button'
											onClick={() => setStep(2)}
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
												// 'bg-blue-500'
											}`}
											disabled={!isValid && !dirty}
										>
											Вперёд
										</button>
									</div>
								</div>
							</Form>
						)
					}}
				</Formik>
			</div>
		</>
	)
}

export default StepMainFields

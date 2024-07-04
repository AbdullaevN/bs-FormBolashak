import { useState } from 'react'
import PdfViewer from '../PdfViewer/PdfViewer'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const SignUp = () => {
	const [step, setStep] = useState(1)

	const [agreed, setAgreed] = useState(false)
	const [agreed2, setAgreed2] = useState(false)

	const step2ValidationSchema = Yup.object({
		name: Yup.string().required('Поле не может быть пустым'),
		lastName: Yup.string().required('Поле не должно быть пустым'),
		email: Yup.string()
			.email('Некорректная почта')
			.required('Поле не должно быть пустым'),
		phone: Yup.string().required('Поле не должно быть пустым'),
		address: Yup.string().required('Поле не должно быть пустым'),
		city: Yup.string().required('Поле не должно быть пустым'),
		inn: Yup.string()
			.length(14, 'Поле ИНН должен иметь 14 символов')
			.required('Поле не должно быть пустым'),
		passportFront: Yup.mixed().required('Выберите файл'),
		passportBack: Yup.mixed().required('Выберите файл'),
		selfieWithPassport: Yup.mixed().required('Выберите файл'),
	})

	const step3ValidationSchema = Yup.object({
		company: Yup.string().required('Поле не может быть пустым'),
		position: Yup.string().required('Поле не может быть пустым'),
		website: Yup.string().url('Неправильный адрес сайта'),
		bio: Yup.string().required('Поле не может быть пустым'),
	})

	return (
		<>
			<div className='flex items-center justify-center min-h-screen bg-gray-100'>
				<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl'>
					{step === 1 && (
						<div>
							<h2 className='text-2xl font-semibold mb-4'>
								Пожалуйста, ознакомьтесь с условиями договора
							</h2>
							<PdfViewer pdfUrl='https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf' />
							<label className='block mt-4'>
								<input
									type='checkbox'
									checked={agreed}
									onChange={e => setAgreed(e.target.checked)}
									className='mr-2'
								/>
								«Я внимательно прочитал»
							</label>
							<label className='block mt-4'>
								<input
									type='checkbox'
									checked={agreed2}
									onChange={e => setAgreed2(e.target.checked)}
									className='mr-2'
								/>
								«Я принимаю условия Политики конфиденциальности и обработки
								файлов»
							</label>
							<div className='flex justify-end mt-4'>
								<button
									onClick={() => setStep(2)}
									disabled={!agreed || !agreed2}
									className={`px-4 py-2 text-white rounded ${
										agreed && agreed2
											? 'bg-blue-500'
											: 'bg-gray-400 cursor-not-allowed'
									}`}
								>
									Next
								</button>
							</div>
						</div>
					)}

					{step === 2 && (
						<div>
							<h2 className='text-2xl font-semibold mb-4'>
								Персональные данные
							</h2>
							<Formik
								initialValues={{
									name: '',
									lastName: '',
									email: '',
									phone: '',
									address: '',
									city: '',
									inn: '',
									passportFront: null,
									passportBack: null,
									selfieWithPassport: null,
								}}
								validationSchema={step2ValidationSchema}
								onSubmit={values => {
									setStep(3)
								}}
							>
								{({ setFieldValue, isValid, dirty }) => (
									<Form>
										<label htmlFor='name' className='block mb-2'>
											Имя:
										</label>
										<Field
											type='text'
											id='name'
											name='name'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='name'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='lastName' className='block mb-2'>
											Фамилия:
										</label>
										<Field
											type='text'
											id='lastName'
											name='lastName'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='lastName'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='email' className='block mb-2'>
											Почта:
										</label>
										<Field
											type='email'
											id='email'
											name='email'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='email'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='phone' className='block mb-2'>
											Номер телефона:
										</label>
										<Field
											type='tel'
											id='phone'
											name='phone'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='phone'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='address' className='block mb-2'>
											Адрес:
										</label>
										<Field
											type='text'
											id='address'
											name='address'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='address'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='city' className='block mb-2'>
											Город:
										</label>
										<Field
											type='text'
											id='city'
											name='city'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='city'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='inn' className='block mb-2'>
											ИНН:
										</label>
										<Field
											type='text'
											id='inn'
											name='inn'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='inn'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='passportFront' className='block mb-2'>
											Передняя сторона паспорта:
										</label>
										<input
											id='passportFront'
											name='passportFront'
											type='file'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
											onChange={event => {
												setFieldValue(
													'passportFront',
													event.currentTarget.files[0]
												)
											}}
										/>
										<ErrorMessage
											name='passportFront'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='passportBack' className='block mb-2'>
											Задняя сторона паспорта:
										</label>
										<input
											id='passportBack'
											name='passportBack'
											type='file'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
											onChange={event => {
												setFieldValue(
													'passportBack',
													event.currentTarget.files[0]
												)
											}}
										/>
										<ErrorMessage
											name='passportBack'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='selfieWithPassport' className='block mb-2'>
											Фото с паспортом:
										</label>
										<input
											id='selfieWithPassport'
											name='selfieWithPassport'
											type='file'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
											onChange={event => {
												setFieldValue(
													'selfieWithPassport',
													event.currentTarget.files[0]
												)
											}}
										/>
										<ErrorMessage
											name='selfieWithPassport'
											component='div'
											className='text-red-500 mb-2'
										/>

										<div className='flex justify-between mt-4'>
											<button
												type='button'
												onClick={() => setStep(1)}
												className='px-4 py-2 text-white bg-blue-500 rounded'
											>
												Back
											</button>
											<button
												type='submit'
												className={`px-4 py-2 text-white rounded ${
													isValid && dirty
														? 'bg-blue-500'
														: 'bg-gray-400 cursor-not-allowed'
												}`}
											>
												Next
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					)}

					{step === 3 && (
						<div>
							<h2 className='text-2xl font-semibold mb-4'>
								Информация о компании
							</h2>
							<Formik
								initialValues={{
									company: '',
									position: '',
									website: '',
									bio: '',
								}}
								validationSchema={step3ValidationSchema}
								onSubmit={values => {
									alert('Form submitted!')
									// Add your form submission logic here
								}}
							>
								{({ isValid, dirty }) => (
									<Form>
										<label htmlFor='company' className='block mb-2'>
											Название компании:
										</label>
										<Field
											type='text'
											id='company'
											name='company'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='company'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='position' className='block mb-2'>
											Должность:
										</label>
										<Field
											type='text'
											id='position'
											name='position'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='position'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='website' className='block mb-2'>
											Веб-сайт:
										</label>
										<Field
											type='url'
											id='website'
											name='website'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='website'
											component='div'
											className='text-red-500 mb-2'
										/>

										<label htmlFor='bio' className='block mb-2'>
											Краткое описание:
										</label>
										<Field
											as='textarea'
											id='bio'
											name='bio'
											className='w-full p-2 mb-2 border border-gray-300 rounded'
										/>
										<ErrorMessage
											name='bio'
											component='div'
											className='text-red-500 mb-2'
										/>

										<div className='flex justify-between mt-4'>
											<button
												type='button'
												onClick={() => setStep(2)}
												className='px-4 py-2 text-white bg-blue-500 rounded'
											>
												Back
											</button>
											<button
												type='submit'
												className={`px-4 py-2 text-white rounded ${
													isValid && dirty
														? 'bg-blue-500'
														: 'bg-gray-400 cursor-not-allowed'
												}`}
											>
												Submit
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default SignUp

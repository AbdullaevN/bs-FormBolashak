import { useState } from 'react'
import PdfViewer from '../PdfViewer/PdfViewer'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

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
const SignUp = () => {
	const [step, setStep] = useState(1)

	const [agreed, setAgreed] = useState(false)
	const [agreed2, setAgreed2] = useState(false)

	// const [step, setStep] = useState(1)
	const [passportFrontPreview, setPassportFrontPreview] = useState(null)
	const [passportBackPreview, setPassportBackPreview] = useState(null)
	const [selfieWithPassportPreview, setSelfieWithPassportPreview] =
		useState(null)

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
									Вперёд
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

										{/* <div className='flex w-full  items-center justify-center bg-grey-lighter'>
											<label className='w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white'>
												<svg
													className='w-8 h-8'
													fill='currentColor'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 20 20'
												>
													<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
												</svg>
												<span className='mt-2 text-base leading-normal'>
													Select a file
												</span>
												<input type='file' className='hidden' />
											</label>
										</div> */}

										{/*  */}
										<div className='col-span-full'>
											<label
												htmlFor='passportFront'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Передняя сторона паспорта:
											</label>
											<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5'>
												<div className='text-center'>
													<svg
														className='mx-auto h-12 w-12 text-gray-300'
														viewBox='0 0 24 24'
														fill='currentColor'
														aria-hidden='true'
													>
														<path
															fillRule='evenodd'
															d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
															clipRule='evenodd'
														/>
													</svg>
													<div className='mt-4 flex text-sm leading-6 text-gray-600'>
														<label
															htmlFor='passportFront'
															className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
														>
															<span>Выберите фотографию</span>
															<input
																id='passportFront'
																name='passportFront'
																type='file'
																className='sr-only w-full p-2 mb-2 border border-gray-300 rounded'
																// onChange={event => {
																// 	setFieldValue(
																// 		'passportFront',
																// 		event.currentTarget.files[0]
																// 	)
																// }}
																onChange={event => {
																	setFieldValue(
																		'passportFront',
																		event.currentTarget.files[0]
																	)
																	setPassportFrontPreview(
																		URL.createObjectURL(
																			event.currentTarget.files[0]
																		)
																	)
																}}
															/>

															<ErrorMessage
																name='passportFront'
																component='div'
																className='text-red-500 mb-2'
															/>
														</label>
														{/* <p className='pl-1'>или перетащите</p> */}
													</div>
													<p className='text-xs leading-5 text-gray-600'>
														PNG, JPG, GIF - 10MB
													</p>
												</div>
												{passportFrontPreview && (
													<img
														src={passportFrontPreview}
														alt='Preview'
														className='mb-2 h-32'
													/>
												)}
											</div>
										</div>
										{/* <hr className='h-1 bg-black my-4' /> */}

										{/*  */}

										<div className='col-span-full my-10'>
											<label
												htmlFor='passportBack'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Задняя сторона паспорта:
											</label>
											<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5'>
												<div className='text-center'>
													<svg
														className='mx-auto h-12 w-12 text-gray-300'
														viewBox='0 0 24 24'
														fill='currentColor'
														aria-hidden='true'
													>
														<path
															fillRule='evenodd'
															d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
															clipRule='evenodd'
														/>
													</svg>
													<div className='mt-4 flex text-sm leading-6 text-gray-600'>
														<label
															htmlFor='passportBack'
															className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
														>
															<span>Выберите фотографию</span>
															<input
																id='passportBack'
																name='passportBack'
																type='file'
																className=' sr-only w-full p-2 mb-2 border border-gray-300 rounded'
																// onChange={event => {
																// 	setFieldValue(
																// 		'passportBack',
																// 		event.currentTarget.files[0]
																// 	)
																// }}
																onChange={event => {
																	setFieldValue(
																		'passportBack',
																		event.currentTarget.files[0]
																	)
																	setPassportBackPreview(
																		URL.createObjectURL(
																			event.currentTarget.files[0]
																		)
																	)
																}}
															/>

															<ErrorMessage
																name='passportBack'
																component='div'
																className='text-red-500 mb-2'
															/>
														</label>
														{/* <p className='pl-1'>или перетащите</p> */}
													</div>
													<p className='text-xs leading-5 text-gray-600'>
														PNG, JPG, GIF - 10MB
													</p>
												</div>
												{passportBackPreview && (
													<img
														src={passportBackPreview}
														alt='Preview'
														className='mb-2 h-32'
													/>
												)}
											</div>
										</div>
										{/* <hr className='h-1 bg-black my-4' /> */}
										{/*  */}

										<div className='col-span-full'>
											<label
												htmlFor='selfieWithPassport'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Фото с паспортом:
											</label>
											<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5'>
												<div className='text-center'>
													<svg
														className='mx-auto h-12 w-12 text-gray-300'
														viewBox='0 0 24 24'
														fill='currentColor'
														aria-hidden='true'
													>
														<path
															fillRule='evenodd'
															d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
															clipRule='evenodd'
														/>
													</svg>
													<div className='mt-4 flex text-sm leading-6 text-gray-600'>
														<label
															htmlFor='selfieWithPassport'
															className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
														>
															<span>Выберите фотографию</span>
															<input
																id='selfieWithPassport'
																name='selfieWithPassport'
																type='file'
																className='sr-only w-full p-2 mb-2 border border-gray-300 rounded'
																// onChange={event => {
																// 	setFieldValue(
																// 		'selfieWithPassport',
																// 		event.currentTarget.files[0]
																// 	)
																// }}
																onChange={event => {
																	setFieldValue(
																		'selfieWithPassport',
																		event.currentTarget.files[0]
																	)
																	setSelfieWithPassportPreview(
																		URL.createObjectURL(
																			event.currentTarget.files[0]
																		)
																	)
																}}
															/>

															<ErrorMessage
																name='selfieWithPassport'
																component='div'
																className='text-red-500 mb-2'
															/>
														</label>
														{/* <p className='pl-1'>или перетащите</p> */}
													</div>
													<p className='text-xs leading-5 text-gray-600'>
														PNG, JPG, GIF - 10MB
													</p>
												</div>
												{selfieWithPassportPreview && (
													<img
														src={selfieWithPassportPreview}
														alt='Preview'
														className='mb-2 h-32'
													/>
												)}
											</div>
										</div>
										{/* <hr className='h-1 bg-black my-4' /> */}
										{/* <div className='col-span-full'>
											<label
												htmlFor='cover-photo'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Cover photo
											</label>
											<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
												<div className='text-center'>
													<div className='mt-4 flex text-sm leading-6 text-gray-600'>
														<label
															htmlFor='file-upload'
															className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
														>
															<span>Upload a file</span>
															<input
																id='file-upload'
																name='file-upload'
																type='file'
																className='sr-only'
															/>
														</label>
														<p className='pl-1'>or drag and drop</p>
													</div>
													<p className='text-xs leading-5 text-gray-600'>
														PNG, JPG, GIF up to 10MB
													</p>
												</div>
											</div>
										</div> */}
										{/*  */}
										{/* <label htmlFor='passportFront' className='block mb-2'>
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
										/> */}

										<div className='flex justify-between mt-4'>
											<button
												type='button'
												onClick={() => setStep(1)}
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
												Вперёд
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
					)}
				</div>
			</div>
		</>
	)
}

export default SignUp

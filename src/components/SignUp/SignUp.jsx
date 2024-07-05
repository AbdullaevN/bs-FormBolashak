import { useEffect, useState } from 'react'
import PdfViewer from '../PdfViewer/PdfViewer'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FieldInput from '../formFields/FieldInput'
import FieldFileUpload from '../formFields/FieldFileUpload'
import { useSearchParams } from 'react-router-dom'
import FieldThree from '../formFields/FieldThree'
import FieldDocFilesUpload from '../formFields/FieldDocFilesUpload'

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
	bio: Yup.string().required('Выберите файл'),
	// file1: Yup.mixed().required('Выберите файл'),
	// file2: Yup.mixed().required('Выберите файл'),
	// file3: Yup.mixed().required('Выберите файл'),
	// file4: Yup.mixed().required('Выберите файл'),
	// file5: Yup.mixed().required('Выберите файл'),
	// file6: Yup.mixed().required('Выберите файл'),
	// file7: Yup.mixed().required('Выберите файл'),
	// file8: Yup.mixed().required('Выберите файл'),
})
const STEP_QUERY = 'step'

const SignUp = () => {
	const [selectedFile, setSelectedFile] = useState('Файл не выбран')

	const [currentStep, setCurrentStep] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams()
	// const [setSearchParams] = useSearchParams()
	const searchParamsValue = Number(searchParams.get(STEP_QUERY))
	useEffect(() => {
		setCurrentStep(searchParamsValue)
	}, [searchParamsValue])

	console.log('searchParams', searchParams)
	const [agreed, setAgreed] = useState(false)
	const [agreed2, setAgreed2] = useState(false)

	const setStep = number => {
		setSearchParams({ step: number.toString() })
	}

	useEffect(() => {
		console.log('searchParams', searchParams)
	}, [searchParams])

	// const [requestData, setRequestData] = useState(null)

	// const postFormRequest = values => {
	// 	console.log('values', values)
	// 	fetch('https://lac-company.herokuapp.com/news/')
	// 		.then(response => response.json())
	// 		.then(data => setRequestData(data))
	// 		.catch(error => console.error(error))
	// }

	return (
		<>
			<div className='flex items-center justify-center min-h-screen bg-gray-100'>
				<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl'>
					{currentStep !== 2 && currentStep !== 3 && (
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

					{currentStep === 2 && (
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
								{({ setFieldValue, isValid, dirty, values }) => {
									console.log('	isalid', isValid)
									console.log('values,', values)
									return (
										<Form>
											<FieldInput label='Имя' name='name' />
											<FieldInput label='Фамилия' name='lastName' />
											<FieldInput label='Почта' name='email' />
											<FieldInput label='Номер телефона' name='phone' />
											<FieldInput label='Адрес' name='address' />
											<FieldInput label='Город' name='city' />
											<FieldInput label='ИНН' name='inn' />

											{/*  */}

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
									)
								}}
							</Formik>
						</div>
					)}

					{currentStep === 3 && (
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
									// file1: null,
									// file2: null,
									// file3: null,
									// file4: null,
									// file5: null,
									// file6: null,
									// file7: null,
									// file8: null,
								}}
								validationSchema={step3ValidationSchema}
								onSubmit={values => {
									// postFormRequest(values)
									alert('Form submitted!')
									console.log(values, '22')
								}}
							>
								{({ setUpload, isValid, dirty }) => (
									<Form>
										<FieldThree label='Название компании' name='company' />
										<FieldThree label='Должность' name='position' />
										<FieldThree label='Веб-сайт' name='website' />
										<FieldThree label='Краткое описание' name='bio' />
										{/* <FieldDocFilesUpload
											label='Выберите файл'
											name='file1'
											setUpload={setUpload}
										/>
										<FieldDocFilesUpload
											label='Выберите файл'
											name='file2'
											setUpload={setUpload}
										/>
										<FieldDocFilesUpload
											label='Выберите файл'
											name='file3'
											setUpload={setUpload}
										/>
										<FieldDocFilesUpload
											label='Выберите файл'
											name='file4'
											setUpload={setUpload}
										/>
										<FieldDocFilesUpload
											label='Выберите файл'
											name='file5'
											setUpload={setUpload}
										/>
										<FieldDocFilesUpload
											label='Выберите файл'
											name='file6'
											setUpload={setUpload}
										/>
										<FieldDocFilesUpload
											label='Выберите файл'
											name='file7'
											setUpload={setUpload}
										/>
										<FieldDocFilesUpload
											label='Выберите файл'
											name='file8'
											setUpload={setUpload}
										/> */}
										{/* <Field name='file1'>
											{({ field }) => (
												<div className='flex flex-row items-center'>
													<input
														type='file'
														id='file1'
														onChange={e => {
															setFieldValue('file1', e.target.files[0])
															setSelectedFile(e.target.files[0].name)
														}}
														hidden
													/>
													<label
														htmlFor='file1'
														className='block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 cursor-pointer'
													>
														Выберите файл
													</label>
													<span className='text-sm text-slate-500'>
														{selectedFile}
													</span>
												</div>
											)}
										</Field>
										<ErrorMessage
											name='file1'
											component='div'
											className='text-red-500 mb-2'
										/> */}

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
												// onSubmit={postFormRequest}
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

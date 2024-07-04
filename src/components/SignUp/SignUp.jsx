import { useState } from 'react'

// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import PdfViewer from '../PdfViewer/PdfViewer'
import { Document, Outline, Page } from 'react-pdf'
// import samplePDF from './cven.pdf'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const SignUp = () => {
	const [step, setStep] = useState(1)
	const [agreed, setAgreed] = useState(false)
	const [agreed2, setAgreed2] = useState(false)

	const step2ValidationSchema = Yup.object({
		name: Yup.string().required('Поле не может быть пустым'),
		lastName: Yup.string().required('Поле не должен быть пустым'),

		email: Yup.string()
			.email('Некорректная почта')
			.required('Поле не должен быть пустым'),
		phone: Yup.string().required('Поле не должен быть пустым'),
		address: Yup.string().required('Поле не должен быть пустым'),
		city: Yup.string().required('Поле не должен быть пустым'),
		inn: Yup.string()
			.length(14, 'Поле ИНН должен иметь 14 символов')
			.required('Поле не должен быть пустым'),
	})

	const step3ValidationSchema = Yup.object({
		company: Yup.string().required('Поле не может быть пустым'),
		position: Yup.string().required('Поле не может быть пустым'),
		website: Yup.string().url('Не правильноый адрес сайта'),
		bio: Yup.string().required('Поле не может быть пустым'),
	})

	const handleSubmit = values => {
		alert('Успех!')
	}

	return (
		<>
			<div className='flex items-center justify-center min-h-screen bg-gray-100'>
				<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
					{step === 1 && (
						<div>
							<h2 className='text-2xl font-semibold mb-4'>Step 1: Agreement</h2>
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
								файлов »
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
									email: '',
									phone: '',
									address: '',
									city: '',
									inn: '',
								}}
								validationSchema={step2ValidationSchema}
								onSubmit={values => {
									setStep(3)
								}}
							>
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

									<label htmlFor='name' className='block mb-2'>
										Фамилия:
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
									<div className='col-span-full'>
										<label
											htmlFor='cover-photo'
											className='block text-sm font-medium leading-6 text-gray-900'
										>
											Вставить фото
										</label>
										<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
											<div className='text-center'>
												<svg
													className='mx-auto h-10 w-12 text-gray-300'
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
														htmlFor='file-upload'
														className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
													>
														<span>Загрузите фотографию</span>
														<input
															id='file-upload'
															name='file-upload'
															type='file'
															className='sr-only'
														/>
													</label>
													<p className='pl-1'>или перетащите</p>
												</div>
												<p className='text-xs leading-5 text-gray-600'>
													PNG, JPG, GIF up to 10MB
												</p>
											</div>
										</div>
									</div>

									<div className='flex justify-between mt-4'>
										<button
											type='button'
											onClick={() => setStep(1)}
											className='px-4 py-2 text-white bg-gray-500 rounded'
										>
											Back
										</button>
										<button
											type='submit'
											className='px-4 py-2 text-white bg-blue-500 rounded'
										>
											Next
										</button>
									</div>
								</Form>
							</Formik>
						</div>
					)}

					{step === 3 && (
						<div>
							<h2 className='text-2xl font-semibold mb-4'>
								Дополнительная информация
							</h2>
							<Formik
								initialValues={{
									company: '',
									position: '',
									website: '',
									bio: '',
								}}
								validationSchema={step3ValidationSchema}
								onSubmit={handleSubmit}
							>
								<Form>
									<label htmlFor='company' className='block mb-2'>
										Компания:
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
										Позиция:
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
										Веб сайт:
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
										Предложения:
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
											className='px-4 py-2 text-white bg-gray-500 rounded'
										>
											Back
										</button>
										<button
											type='submit'
											className='px-4 py-2 text-white bg-blue-500 rounded'
										>
											Submit
										</button>
									</div>
								</Form>
							</Formik>
						</div>
					)}
				</div>
			</div>
			{/* <div className='flex items-center justify-center min-h-screen bg-gray-100'>
				<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
					{step === 1 && (
						<div>
							<h2 className='text-2xl font-semibold mb-4'>
								Условия пользования:
							</h2>
							  <PdfViewer pdfUrl='./cven.pdf' /> 
							<Document
								file={{
									url: './cven.pdf',
								}}
								onLoadSuccess={onDocumentLoadSuccess}
							></Document>
							<label className='block mt-4'>
								<input
									type='checkbox'
									checked={agreed}
									onChange={e => setAgreed(e.target.checked)}
									className='mr-2'
								/>
								I agree to the terms
							</label>
							<div className='flex justify-end mt-4'>
								<button
									onClick={() => setStep(2)}
									disabled={!agreed}
									className={`px-4 py-2 text-white rounded ${
										agreed ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
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
							<form>
								<label htmlFor='name' className='block mb-2'>
									Имя:
								</label>
								<input
									type='text'
									id='name'
									name='name'
									value={form1.name}
									onChange={handleForm1Change}
									required
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
								<label htmlFor='email' className='block mb-2'>
									Почта:
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={form1.email}
									onChange={handleForm1Change}
									required
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
								<label htmlFor='phone' className='block mb-2'>
									Номер телефона:
								</label>
								<input
									type='tel'
									id='phone'
									name='phone'
									value={form1.phone}
									onChange={handleForm1Change}
									required
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
								<label htmlFor='address' className='block mb-2'>
									Address:
								</label>
								<input
									type='text'
									id='address'
									name='address'
									value={form1.address}
									onChange={handleForm1Change}
									required
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
								<label htmlFor='city' className='block mb-2'>
									ИНН данные:
								</label>
								<input
									type='text'
									id='city'
									name='city'
									value={form1.city}
									onChange={handleForm1Change}
									required
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
								<label htmlFor='city' className='block mb-2'>
									ИНН данные:
								</label>
								{innDirty && innError && (
									<div className='text-red-900'>{innError}</div>
								)}
								<input
									type='text'
									id='inn'
									name='inn'
									value={form1.inn}
									onChange={handleForm1Change}
									required
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
							</form>
							<div className='flex justify-between mt-4'>
								<button
									onClick={() => setStep(1)}
									className='px-4 py-2 text-white bg-gray-500 rounded'
								>
									Back
								</button>
								<button
									onClick={() => setStep(3)}
									className='px-4 py-2 text-white bg-blue-500 rounded'
								>
									Next
								</button>
							</div>
						</div>
					)}

					{step === 3 && (
						<div>
							<h2 className='text-2xl font-semibold mb-4'>
								Step 3: Additional Information
							</h2>
							<form onSubmit={handleSubmit}>
								<label htmlFor='company' className='block mb-2'>
									Company:
								</label>
								<input
									type='text'
									id='company'
									name='company'
									value={form2.company}
									onChange={handleForm2Change}
									required
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
								<label htmlFor='position' className='block mb-2'>
									Position:
								</label>
								<input
									type='text'
									id='position'
									name='position'
									value={form2.position}
									onChange={handleForm2Change}
									required
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
								<label htmlFor='website' className='block mb-2'>
									Website:
								</label>
								<input
									type='url'
									id='website'
									name='website'
									value={form2.website}
									onChange={handleForm2Change}
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
								<label htmlFor='bio' className='block mb-2'>
									Bio:
								</label>
								<textarea
									id='bio'
									name='bio'
									value={form2.bio}
									onChange={handleForm2Change}
									required
									className='w-full p-2 mb-4 border border-gray-300 rounded'
								/>
								<div className='flex justify-between mt-4'>
									<button
										type='button'
										onClick={() => setStep(2)}
										className='px-4 py-2 text-white bg-gray-500 rounded'
									>
										Back
									</button>
									<button
										type='submit'
										className='px-4 py-2 text-white bg-blue-500 rounded'
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</div> */}
		</>
	)
}

export default SignUp

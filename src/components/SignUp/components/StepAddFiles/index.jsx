import { Form, Formik } from 'formik'
import FieldDocFilesUpload from '../../../formFields/FieldDocFilesUpload'
import { stepAddFilesValidation } from '../../formAttributes'
import { useDispatch, useSelector } from 'react-redux'
import { submitForm } from '../../../../store/slices/formSlice'

const StepAddFiles = ({ setStep }) => {
	const dispatch = useDispatch()
	const currentStep = useSelector(state => state.form.currentStep)
	const formData = useSelector(state => state.form.formData)
	const handleSubmit = async () => {
		try {
			await dispatch(submitForm(formData))
			// handle success, maybe redirect or show a success message
		} catch (error) {
			// handle error
			console.error('Failed to submit form:', error)
		}
	}
	return (
		<>
			<div>
				<h2 className='text-2xl font-semibold mb-4'>Информация о компании</h2>
				<Formik
					initialValues={{
						// company: '',
						// position: '',
						// website: '',
						// bio: '',
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
						// postFormRequest(values)
						// alert('Form submitted!')
						setStep(6)
						console.log(values, '22')
					}}
				>
					{({ setFieldValue, isValid, dirty, values }) => (
						<Form>
							{/* <FieldThree label='Поле 1' name='company' />
										<FieldThree label='Поле 2' name='position' />
										<FieldThree label='Поле 3' name='website' />
										<FieldThree label='Поле 4' name='bio' /> */}
							{/* <div className='w-full'>
								<FieldDocFilesUpload
									label='Выберите документ 1'
									name='file1'
									setFieldValue={setFieldValue}
								/>

								<FieldDocFilesUpload
									label='Выберите документ 2'
									name='file2'
									setFieldValue={setFieldValue}
								/>
								<FieldDocFilesUpload
									label='Выберите документ 3'
									name='file3'
									setFieldValue={setFieldValue}
								/>
								<FieldDocFilesUpload
									label='Выберите документ 4'
									name='file4'
									setFieldValue={setFieldValue}
								/>
								<FieldDocFilesUpload
									label='Выберите документ 5'
									name='file5'
									setFieldValue={setFieldValue}
								/>
								<FieldDocFilesUpload
									label='Выберите документ 6'
									name='file6'
									setFieldValue={setFieldValue}
								/>
								<FieldDocFilesUpload
									label='Выберите документ 7'
									name='file7'
									setFieldValue={setFieldValue}
								/>
								<FieldDocFilesUpload
									label='Выберите документ 8'
									name='file8'
									setFieldValue={setFieldValue}
								/>
								
							</div> */}
							<div className='w-full'>
								{[...Array(8).keys()].map(index => (
									<div key={index} className='mb-4 flex items-center'>
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
												className='ml-2 px-4 py-2 w-4/12 text-white bg-red-500 rounded'
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
									onClick={handleSubmit}
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
		</>
	)
}

export default StepAddFiles

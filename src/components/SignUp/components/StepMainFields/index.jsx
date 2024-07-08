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
import { useEffect } from 'react'
import { CODE_SUCCESS_EXPIRED_STORAGE_KEY } from '../../consts'

const StepMainFields = ({ setStep }) => {
	const dispatch = useDispatch()
	const formData = useSelector(state => state.form.formData)
	const handleSubmit = values => {
		dispatch(setFormData(values))
		setStep(5)
		console.log(values, 'handle')
	}
	useEffect(() => {
		if (CODE_SUCCESS_EXPIRED_STORAGE_KEY) {
			null
		} else {
			setStep(3)
		}
	}, [setStep])
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
					onSubmit={handleSubmit}
				>
					{({ setFieldValue, isValid, dirty, values }) => {
						console.log('	isalid', isValid)
						console.log('values,', values)
						return (
							<Form className='flex justify-between'>
								<div className='w-6/12'>
									<FieldInput label='Имя' name='name' />
									<FieldInput label='Фамилия' name='lastName' />
									<FieldInput label='ИНН' name='inn' />
									<FieldInput label='№ Документа' name='idNumber' />
									<FieldInput label='Национальность' name='nationality' />
									<div
										className='flex justify-between items-center gap-5 text-start w-12/12
										'
									>
										<FieldOfBirthday
											label='Дата рождения'
											name='dateOfBirthday'
											className='w-6/12'
										/>

										<Form className='w-6/12'>
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
								<div className='flex flex-col w-6/12 '>
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
									<div className=' mt-4 flex gap-5 justify-between'>
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

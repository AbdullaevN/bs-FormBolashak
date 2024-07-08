import { useState } from 'react'
import PdfViewer from '../../../PdfViewer/PdfViewer'

import FieldCheckbox from '../../../formFields/FieldCheckbox'
import { stepFieldCheckbox } from '../../formAttributes'
import { Form, Formik } from 'formik'

const StepAgreed = ({ setStep }) => {
	return (
		<>
			<div className='h-screen py-3 mb-36'>
				<h2 className='text-2xl font-semibold mb-4 '>
					Пожалуйста, ознакомьтесь с условиями договора
				</h2>
				<PdfViewer
					pdfUrl='https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf'
					className='h-full'
				/>

				<Formik
					initialValues={{
						agreed1: false,
						agreed2: false,
					}}
					validationSchema={stepFieldCheckbox}
					onSubmit={values => {
						setStep(2)
					}}
				>
					{({ isValid, dirty }) => {
						return (
							<Form className='flex justify-around items-center text-start '>
								<div className='block'>
									<FieldCheckbox
										label='	«Я принимаю условия Политики конфиденциальности и обработки
							файлов»'
										name='agreed1'
									/>
									<FieldCheckbox
										label='	«Я принимаю условия пользовательского соглашения»'
										name='agreed2'
									/>
								</div>

								<div className='flex justify-end mt-4'>
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
		</>
	)
}

export default StepAgreed

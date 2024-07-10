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
							<Form className='flex justify-between items-center text-start '>
								<div className='flex sm:w-9/12 md:9/12 w-7/12 flex-col items-start text-start justify-start'>
									<FieldCheckbox
										label='	«Я принимаю условия Политики конфиденциальности и обработки	файлов»'
										name='agreed1'
										// className='flex items-start'
									/>
									<FieldCheckbox
										label='	«Я принимаю условия пользовательского соглашения»'
										name='agreed2'
										className='flex items-start  '
									/>
								</div>

								<div className='flex sm:w-3/12 md:3/12 w-4/12 justify-end mt-4'>
									<button
										type='submit'
										className={`px-6 w-28 sm:w-36 text-center  py-2 text-white rounded ${
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

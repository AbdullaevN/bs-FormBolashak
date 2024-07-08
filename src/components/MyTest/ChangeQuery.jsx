import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const ChangeQuery = () => {
	const [currentStep, setCurrentStep] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams()
	// const [setSearchParams] = useSearchParams()
	const searchParamsValue = Number(searchParams.get('query123abc'))
	useEffect(() => {
		setCurrentStep(searchParamsValue)
	}, [searchParamsValue])

	console.log('searchParams', searchParams)

	const setStep = number => {
		setSearchParams({ step: number.toString() })
	}
	return (
		<div>
			123
			{currentStep}
		</div>
	)
}

export default ChangeQuery

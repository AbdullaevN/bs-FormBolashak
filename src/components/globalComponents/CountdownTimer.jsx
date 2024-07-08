import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
import { SERVER_DATE_FORMAT } from '../../globalConsts/timeFormats'
import { isFunction } from 'lodash'
import { addZeroBefore, getNounFromNumber } from '../../helpers/textHelpers'

const calculateTimeLeft = (time, format) => {
	const now = dayjs()
	const target = dayjs(time, format)
	const diff = target.diff(now)
	const duration = dayjs.duration(diff)
	return {
		years: duration.years(),
		month: duration.months(),
		days: duration.days(),
		hours: duration.hours(),
		minutes: duration.minutes(),
		seconds: duration.seconds(),
	}
}

const isAllValuesZeroOrLess = obj => {
	for (const key in obj) {
		const val = typeof obj[key] === 'string' ? parseInt(obj[key], 10) : obj[key]
		if (val > 0) {
			return false
		}
	}
	return true
}

const CountdownTimer = ({
	targetTime,
	format = SERVER_DATE_FORMAT,
	separator = ':',
	onFinish,
	abbreviatedPostfixes = true,
}) => {
	if (!targetTime) return null
	const [timeLeft, setTimeLeft] = useState(
		calculateTimeLeft(targetTime, format)
	)

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft(targetTime, format))
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		if (isFunction(onFinish) && isAllValuesZeroOrLess(timeLeft)) {
			onFinish()
		}
	}, [timeLeft])

	const separatorContent = <span>{separator}</span>

	return (
		<div>
			{!!timeLeft.years && (
				<span>
					{timeLeft.years}
					{abbreviatedPostfixes
						? 'г.'
						: getNounFromNumber(timeLeft.years, 'год', 'года', 'лет')}
				</span>
			)}
			{!!timeLeft.month && (
				<span>
					{timeLeft.month}
					{abbreviatedPostfixes
						? 'м.'
						: getNounFromNumber(timeLeft.years, 'месяц', 'месяца', 'месяцев')}
				</span>
			)}
			{!!timeLeft.days && (
				<span>
					{timeLeft.days}
					{abbreviatedPostfixes
						? 'д.'
						: getNounFromNumber(timeLeft.days, 'день', 'дня', 'дней')}
				</span>
			)}
			<div>
				<span>{addZeroBefore(timeLeft.hours)}</span>
				{separatorContent}
				<span>{addZeroBefore(timeLeft.minutes)}</span>
				{separatorContent}
				<span>{addZeroBefore(timeLeft.seconds)}</span>
			</div>
		</div>
	)
}

export default CountdownTimer
